# X39 Matrix - Go-Live Runbook: March 15, 2026

**Target Launch Date**: March 15, 2026  
**Canonical Domain**: https://x39matrix.org  
**Satellite Domains**: x39dark.com, x39matrix.com (if registered)  
**Production Target State**: Published (true)

This runbook provides step-by-step instructions for operators to execute the March 15, 2026 public launch of X39 Matrix, including DNS/custom-domain cutover, publication state activation, verification, and rollback procedures.

---

## 📋 Pre-Flight Checklist (T-24 Hours)

Execute these checks 24 hours before launch to ensure readiness.

### 1. Application Readiness

- [ ] **Backend deployed**: Verify backend canister is deployed to mainnet
  ```bash
  dfx canister --network ic status backend
  ```
  Expected: Status shows "Running"

- [ ] **Frontend deployed**: Verify frontend canister is deployed to mainnet
  ```bash
  dfx canister --network ic status frontend
  ```
  Expected: Status shows "Running"

- [ ] **Canister direct access test**: Test application via canister URL
  ```bash
  curl -I https://[FRONTEND_CANISTER_ID].ic0.app
  ```
  Expected: HTTP 200 OK with application content (not default Nginx page)

- [ ] **Legal disclaimer date-gating**: Verify disclaimer shows "not yet effective" before March 15
  - Visit application via canister URL
  - Scroll to legal disclaimer section
  - Confirm it shows "not yet effective until March 15, 2026"

- [ ] **Publication state pre-check**: Verify backend publication state is false (pre-launch)
  - Admin should check publication state via admin panel
  - Expected: Publication state shows "Not Published" or false

### 2. Domain & DNS Readiness

- [ ] **Domain ownership verified**: Confirm you control x39matrix.org DNS records
- [ ] **DNS records prepared**: Have DNS A/AAAA records ready to point to IC boundary nodes
- [ ] **Satellite domains ready**: Confirm x39dark.com and x39matrix.com (if registered) DNS is accessible
- [ ] **SSL/TLS certificate**: Verify IC can provision certificates for x39matrix.org (check IC Dashboard)

### 3. Documentation & Assets

- [ ] **Store submission checklist**: Review [store-submission-checklist.md](../../release/store-submission-checklist.md)
- [ ] **Global availability checklist**: Review [global-availability-readiness-checklist.md](./global-availability-readiness-checklist.md)
- [ ] **Launch verification checklist**: Review [launch-verification-checklist.en.md](./launch-verification-checklist.en.md)
- [ ] **Domain strategy guide**: Review [domain-strategy-and-hardening.en.md](./domain-strategy-and-hardening.en.md)
- [ ] **Store assets**: Verify all assets exist in `frontend/public/assets/generated/`
- [ ] **Store listing copy**: Review English copy for both stores

### 4. Communication Readiness

- [ ] **Announcement draft**: Prepare launch announcement for social media, blog, etc.
- [ ] **Support team briefed**: Ensure support team knows launch timing and common issues
- [ ] **Monitoring setup**: Set up uptime monitoring for https://x39matrix.org
- [ ] **Rollback plan reviewed**: Ensure team understands rollback procedures (see below)

---

## 🚀 Launch Sequence (March 15, 2026)

### Phase 1: Custom Domain Cutover (T-0)

**Objective**: Map x39matrix.org to the frontend canister and enable HTTPS.

**Steps**:

1. **Obtain IC Boundary Node DNS Targets**:
   - Log in to [Internet Computer Dashboard](https://dashboard.internetcomputer.org/)
   - Navigate to **Canisters** → Select your frontend canister
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `x39matrix.org`
   - Click **Register**
   - **IMPORTANT**: After registration, the dashboard will display the authoritative DNS targets (IPv4 and IPv6 addresses) for IC boundary nodes
   - **Copy these exact IP addresses** - you will need them for your DNS provider in the next step
   - Example display: "Point your DNS A record to: 147.75.83.255" and "Point your DNS AAAA record to: 2604:1380:4641:c500::1"

2. **Update DNS records at your DNS provider**:
   - Log in to your DNS provider (e.g., Cloudflare, GoDaddy, Namecheap, Route53)
   - Navigate to DNS management for `x39matrix.org`
   - **For apex domain (x39matrix.org)**:
     - Add/update **A record**: `@` → `[IPv4 from IC Dashboard]`
     - Add/update **AAAA record**: `@` → `[IPv6 from IC Dashboard]`
   - **For www subdomain (optional)**:
     - Add **CNAME record**: `www` → `x39matrix.org`
   - **TTL Recommendation**:
     - **Pre-cutover**: Lower TTL to **300 seconds** (5 minutes) 24-48 hours before launch for faster propagation
     - **Post-cutover**: Raise TTL to **3600 seconds** (1 hour) or higher after successful verification
   - Save changes
   - **Wait 5-15 minutes** for DNS propagation to begin

3. **Verify DNS propagation**:
   ```bash
   # Check A record (IPv4)
   dig x39matrix.org A +short
   # Expected: Should return the IPv4 address from IC Dashboard
   
   # Check AAAA record (IPv6)
   dig x39matrix.org AAAA +short
   # Expected: Should return the IPv6 address from IC Dashboard
   
   # Check authoritative nameservers
   dig x39matrix.org NS +short
   # Expected: Should return your DNS provider's nameservers
   ```
   - **Pass**: DNS returns the correct IC boundary node IPs
   - **Fail**: DNS returns old IPs or no records → Wait longer or check DNS provider configuration

4. **Verify custom domain status in IC Dashboard**:
   - Return to IC Dashboard → Custom Domains
   - Refresh page
   - Verify `x39matrix.org` status shows **"Active"** with green checkmark
   - If status shows "Pending" or "Error", wait 5 more minutes and refresh
   - **Note**: Certificate provisioning happens automatically but may take 10-30 minutes

5. **Test HTTPS access and content**:
   ```bash
   # Test HTTPS connection
   curl -I https://x39matrix.org
   # Expected: HTTP 200 OK with Content-Type: text/html
   
   # Verify correct content (not default Nginx page)
   curl -s https://x39matrix.org | grep -i "x39matrix"
   # Expected: Should find "x39matrix" in HTML content
   
   # Check for default Nginx page (should NOT appear)
   curl -s https://x39matrix.org | grep -i "welcome to nginx"
   # Expected: No output (empty result = pass)
   ```
   - **Pass**: HTTP 200, correct HTML content, no Nginx default page
   - **Fail (Certificate error)**: Wait 10-15 minutes for IC to provision certificate, then retry
   - **Fail (Default Nginx page)**: See troubleshooting section below

**Estimated Duration**: 15-30 minutes

---

### Phase 2: Publication State Activation (T+30 minutes)

**Objective**: Set backend publication state to Published (true) to enable live UI sections.

**Steps**:

1. **Admin login**:
   - Navigate to https://x39matrix.org
   - Click "Login" button in header
   - Authenticate with Internet Identity as admin principal

2. **Verify admin access**:
   - After login, verify admin controls are visible in the UI
   - Look for "Admin Go-Live Toggle" section (typically in header or admin panel)

3. **Set publication state to Published**:
   - Locate the "Publication State" toggle control
   - Current state should show "Not Published" (false)
   - Click the toggle switch to change state to "Published" (true)
   - Confirm the action if prompted

4. **Verify immediate UI update** (no refresh required):
   - **Legal Disclaimer Section**: Should immediately show full disclaimer content with "Effective Date: March 15, 2026"
   - **March 15, 2026 Launch Information Section**: Should immediately appear with launch details
   - If sections do not update immediately, wait 5-10 seconds for React Query cache invalidation
   - **Do NOT manually refresh the page** - updates should happen automatically

5. **Verify publication state persistence**:
   - Open a new browser tab/window
   - Navigate to https://x39matrix.org (without logging in)
   - Scroll to Legal Disclaimer section
   - Confirm it shows full published disclaimer (not "Coming Soon")
   - Confirm March 15, 2026 Launch Information section is visible

**Pass Criteria**:
- ✅ Publication state toggle shows "Published" (true)
- ✅ Legal Disclaimer shows full content with effective date
- ✅ March 15, 2026 Launch Information section is visible
- ✅ Changes appear immediately without manual refresh
- ✅ Changes persist across browser sessions and for non-admin users

**Fail Criteria**:
- ❌ Publication state does not change or reverts to false
- ❌ Legal Disclaimer still shows "Coming Soon" after toggle
- ❌ March 15 Launch Information section does not appear
- ❌ Manual page refresh is required to see changes

**If Failed**:
1. Check browser console for JavaScript errors
2. Verify admin authentication is still active
3. Try logging out and logging back in
4. Check backend canister logs for authorization errors
5. Verify backend deployment includes publication state functionality

**Estimated Duration**: 5-10 minutes

---

### Phase 3: Satellite Domain Redirect Configuration (T+40 minutes)

**Objective**: Configure x39dark.com and x39matrix.com to redirect to x39matrix.org.

**Current Implementation**: Client-side redirect (best-effort)
- The application includes a `useDomainRedirect` hook that redirects in the browser
- This works after the page loads and preserves path/query/hash
- **Limitation**: Does not benefit SEO; does not work if page fails to load

**Recommended for Production**: True HTTP 301 redirects

**Option A: IC Boundary Node Configuration** (if supported):

1. Log in to IC Dashboard
2. Navigate to frontend canister → Custom Domains
3. Add `x39dark.com` and `x39matrix.com` as custom domains
4. Configure redirect rules (if available):
   - From: `x39dark.com` → To: `https://x39matrix.org` (301 Permanent)
   - From: `x39matrix.com` → To: `https://x39matrix.org` (301 Permanent)

**Option B: DNS-Level Redirect** (using Cloudflare or similar):

1. Log in to DNS provider (e.g., Cloudflare)
2. Navigate to **Page Rules** or **Redirect Rules**
3. Create redirect for x39dark.com:
   - **If**: URL matches `x39dark.com/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
4. Create redirect for x39matrix.com:
   - **If**: URL matches `x39matrix.com/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
5. Save and enable rules

**Option C: Client-Side Only** (current implementation):

- No additional configuration needed
- Redirects happen in browser after page loads
- Less SEO benefit but functional

**Verification**:

