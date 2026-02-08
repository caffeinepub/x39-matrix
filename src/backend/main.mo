import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import OutCall "http-outcalls/outcall";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";



actor {
  include MixinStorage();

  // Publication state
  var isPublished : Bool = true;

  // Store configuration and constants in the persistent actor state
  let launchDate : Text = "March 15, 2026";

  public query func getLaunchDate() : async Text {
    launchDate;
  };

  public query ({ caller }) func getReceiverPrincipal() : async Principal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view receiver principal");
    };
    Principal.fromText("wb7q4-g65x3-sf2ck-s4pun-6hgpw-634gb-663rg-dymc2-4u2of-t7jir-mqe");
  };

  public query ({ caller }) func getPublicationState() : async Bool {
    isPublished;
  };

  public shared ({ caller }) func setPublicationState(state : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can change publication state");
    };
    isPublished := state;
  };

  // Portfolio/Staking/Holdings Types & Logic
  public type Holding = {
    id : Nat;
    owner : Principal;
    tokenAmount : Nat;
    lockDurationDays : Nat;
    startTime : Time.Time;
    endTime : Time.Time;
    positionStatus : PositionStatus;
  };

  public type PositionStatus = {
    #locked;
    #unlocked;
    #expired;
  };

  var holdings = Map.empty<Nat, Holding>();
  var nextHoldingId = 0;

  public shared ({ caller }) func createHolding(tokenAmount : Nat, lockDurationDays : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create holdings");
    };

    let id = nextHoldingId;
    nextHoldingId += 1;

    let startTime = Time.now();
    let endTime = startTime + (lockDurationDays * 86400000000000);

    let holding : Holding = {
      id;
      owner = caller;
      tokenAmount;
      lockDurationDays;
      startTime;
      endTime;
      positionStatus = #locked;
    };

    holdings.add(id, holding);
    id;
  };

  public query ({ caller }) func getHolding(id : Nat) : async ?Holding {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view holdings");
    };

    let holding = switch (holdings.get(id)) {
      case (null) { null };
      case (?h) {
        if (h.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own holdings");
        };
        ?h;
      };
    };
    holding;
  };

  public query ({ caller }) func getAllHoldings() : async [Holding] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all holdings");
    };
    holdings.values().toArray();
  };

  public query ({ caller }) func getUserHoldings(principal : Principal) : async [Holding] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view holdings");
    };

    if (caller != principal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own holdings");
    };

    let filteredHoldings = holdings.values().toArray().filter(
      func(h) { h.owner == principal }
    );
    filteredHoldings;
  };

  public shared ({ caller }) func unlockHolding(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unlock holdings");
    };

    let holding = switch (holdings.get(id)) {
      case (null) { Runtime.trap("Holding not found") };
      case (?h) { h };
    };

    if (holding.owner != caller) {
      Runtime.trap("Only the owner can unlock this holding");
    };

    if (holding.positionStatus != #locked) {
      Runtime.trap("Only locked positions can be unlocked");
    };

    let now = Time.now();

    let updatedHolding : Holding = {
      holding with
      positionStatus = if (now >= holding.endTime) { #expired } else {
        #unlocked;
      };
    };

    holdings.add(id, updatedHolding);
  };

  public shared ({ caller }) func deleteHolding(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete holdings");
    };

    let holding = switch (holdings.get(id)) {
      case (null) { Runtime.trap("Holding not found") };
      case (?h) { h };
    };

    if (holding.owner != caller) {
      Runtime.trap("Only the owner can delete this holding");
    };

    holdings.remove(id);
  };

  // Governance Types & Logic
  public type Proposal = {
    id : Nat;
    creator : Principal;
    title : Text;
    description : Text;
    status : ProposalStatus;
    votes : ProposalVotes;
  };

  public type ProposalStatus = {
    #open;
    #closed;
    #approved;
    #rejected;
  };

  public type VoteOption = {
    #yes;
    #no;
    #abstain;
  };

  public type ProposalVotes = {
    yes : Nat;
    no : Nat;
    abstain : Nat;
  };

  var proposals = Map.empty<Nat, Proposal>();
  var proposalVotes = Map.empty<Nat, Map.Map<Principal, VoteOption>>();
  var nextProposalId = 0;

  public shared ({ caller }) func createProposal(title : Text, description : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create proposals");
    };

    let id = nextProposalId;
    nextProposalId += 1;

    let proposal : Proposal = {
      id;
      creator = caller;
      title;
      description;
      status = #open;
      votes = {
        yes = 0;
        no = 0;
        abstain = 0;
      };
    };

    proposals.add(id, proposal);
    proposalVotes.add(id, Map.empty<Principal, VoteOption>());
    id;
  };

  public query ({ caller }) func getProposal(id : Nat) : async ?Proposal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view proposals");
    };
    proposals.get(id);
  };

  public query ({ caller }) func getAllProposals() : async [Proposal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view proposals");
    };
    proposals.values().toArray();
  };

  public shared ({ caller }) func voteOnProposal(proposalId : Nat, vote : VoteOption) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can vote on proposals");
    };

    let proposal = switch (proposals.get(proposalId)) {
      case (null) { Runtime.trap("Proposal not found") };
      case (?p) { p };
    };

    if (proposal.status != #open) {
      Runtime.trap("Voting is closed for this proposal");
    };

    let votesMap = switch (proposalVotes.get(proposalId)) {
      case (null) { Runtime.trap("Votes not found") };
      case (?map) { map };
    };

    if (votesMap.containsKey(caller)) {
      Runtime.trap("You have already voted");
    };

    let currentVotes = proposal.votes;

    let updatedVotes = switch (vote) {
      case (#yes) {
        { currentVotes with yes = currentVotes.yes + 1 };
      };
      case (#no) {
        { currentVotes with no = currentVotes.no + 1 };
      };
      case (#abstain) {
        { currentVotes with abstain = currentVotes.abstain + 1 };
      };
    };

    let updatedProposal : Proposal = {
      proposal with votes = updatedVotes
    };

    proposals.add(proposalId, updatedProposal);
    votesMap.add(caller, vote);
  };

  // User authentication system
  let accessControlState = AccessControl.initState();

  // Stripe integration state
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;
  var stripeSessionOwners = Map.empty<Text, Principal>();

  // Product management
  public type Product = {
    id : Text;
    // Add custom product fields as needed.
  };

  let products = Map.empty<Text, Product>();

  // Authentication and Authorization Functions
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    // Admin-only check happens inside access control
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = {
    name : Text;
    // Add other user metadata if needed.
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product management
  public query func getProducts() : async [Product] {
    products.values().toArray();
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    products.remove(productId);
  };

  // Stripe Integration Functions
  public query ({ caller }) func isStripeConfigured() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can check Stripe configuration");
    };
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check session status");
    };

    let sessionOwner = switch (stripeSessionOwners.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?owner) { owner };
    };

    if (sessionOwner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only check your own session status");
    };

    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
    stripeSessionOwners.add(sessionId, caller);
    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --------- ICP Market Proxy Endpoints ---------
  public func proxyIcpPrice() : async Text {
    await OutCall.httpGetRequest(
      "https://api.binance.com/api/v3/ticker/price?symbol=ICPUSDT",
      [],
      transform,
    );
  };

  public func proxyIcpKlines() : async Text {
    await OutCall.httpGetRequest(
      "https://api.binance.com/api/v3/klines?symbol=icpusdt&interval=4h&limit=100",
      [],
      transform,
    );
  };

  public type BackendHealth = {
    version : Text;
    timestamp : Int;
  };

  public query func checkBackendHealth() : async BackendHealth {
    {
      version = "0.2.0";
      timestamp = Time.now();
    };
  };
};
