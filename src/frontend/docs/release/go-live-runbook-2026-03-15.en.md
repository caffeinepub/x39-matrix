# X39 Matrix - Go-Live Runbook: March 15, 2026

**Target Launch Date**: March 15, 2026  
**Canonical Domain**: https://x39matrix.org  
**Satellite Domains**: x39dark.com, x39matrix.com, x39.org (if registered)  
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

- [ ] **Domain ownership verified**: Confirm you control x39matrix.org DNS records at Namecheap (or your DNS provider)
- [ ] **IC Dashboard access**: Verify you can log in to [Internet Computer Dashboard](https://dashboard.internetcomputer.org/)
- [ ] **Namecheap access**: Log in to Namecheap → Domain List → Manage → Advanced DNS (verify you can edit DNS records)
- [ ] **Satellite domains ready**: Confirm x39dark.com, x39matrix.com, and x39.org (if registered) DNS is accessible
- [ ] **TTL lowered**: Lower TTL to 300 seconds (5 minutes) at least 24 hours before cutover for faster propagation

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

1. **Register custom domain in IC Dashboard and obtain DNS targets**:
   - Log in to [Internet Computer Dashboard](https://dashboard.internetcomputer.org/)
   - Navigate to **Canisters** → Select your frontend canister
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `x39matrix.org` (lowercase, no www)
   - Click **Register**
   - **CRITICAL**: After registration, the dashboard will display the **authoritative DNS targets** (IPv4 and IPv6 addresses) for IC boundary nodes
   - **Copy these exact IP addresses** - you will need them for Namecheap in the next step
   - Example display:
     ```
     Point your DNS A record to: 147.75.83.255
     Point your DNS AAAA record to: 2604:1380:4641:c500::1
     ```
   - **Do NOT use placeholder IPs** - always copy the actual IPs shown in the IC Dashboard

2. **Update DNS records at Namecheap**:
   - Log in to [Namecheap](https://www.namecheap.com/)
   - Navigate to **Domain List**
   - Click **Manage** next to `x39matrix.org`
   - Go to the **Advanced DNS** tab
   - Under "Host Records", configure the following:
   
   **For apex domain (x39matrix.org)**:
   - Click **Add New Record**
   - **Type**: A Record
   - **Host**: @ (represents the apex domain)
   - **Value**: [IPv4 address from IC Dashboard, e.g., 147.75.83.255]
   - **TTL**: 300 (5 minutes for cutover; raise to 3600 after verification)
   - Click the green checkmark to save
   
   - Click **Add New Record** again
   - **Type**: AAAA Record
   - **Host**: @ (represents the apex domain)
   - **Value**: [IPv6 address from IC Dashboard, e.g., 2604:1380:4641:c500::1]
   - **TTL**: 300 (5 minutes for cutover; raise to 3600 after verification)
   - Click the green checkmark to save
   
   **For www subdomain (optional but recommended)**:
   - Click **Add New Record**
   - **Type**: CNAME Record
   - **Host**: www
   - **Value**: x39matrix.org (points to apex domain)
   - **TTL**: 300 (5 minutes for cutover; raise to 3600 after verification)
   - Click the green checkmark to save
   
   - **IMPORTANT**: Do NOT use a CNAME record for the apex domain (@) - this is not supported by DNS standards. Always use A + AAAA records for the apex.
   
   - Click **Save All Changes** at the bottom of the page
   - **Wait 5-15 minutes** for DNS propagation to begin

3. **Verify DNS propagation**:
   ```bash
   # Check A record (IPv4)
   dig x39matrix.org A +short
   # Expected: Should return the IPv4 address from IC Dashboard (e.g., 147.75.83.255)
   # Pass: Correct IP returned
   # Fail: Wrong IP, no IP, or NXDOMAIN → Wait longer or check Namecheap configuration
   
   # Check AAAA record (IPv6)
   dig x39matrix.org AAAA +short
   # Expected: Should return the IPv6 address from IC Dashboard (e.g., 2604:1380:4641:c500::1)
   # Pass: Correct IP returned
   # Fail: Wrong IP, no IP, or NXDOMAIN → Wait longer or check Namecheap configuration
   
   # Check authoritative nameservers
   dig x39matrix.org NS +short
   # Expected: Should return Namecheap's nameservers (e.g., dns1.registrar-servers.com)
   # Pass: Namecheap nameservers returned
   # Fail: Wrong nameservers → Verify domain is using Namecheap DNS
   ```
   - **Pass**: DNS returns the correct IC boundary node IPs
   - **Fail**: DNS returns old IPs or no records → Wait longer (up to 48 hours for global propagation) or check Namecheap DNS configuration

4. **Verify custom domain status in IC Dashboard**:
   - Return to IC Dashboard → Custom Domains
   - Refresh page
   - Verify `x39matrix.org` status shows **"Active"** with green checkmark
   - If status shows "Pending" or "Error", wait 5 more minutes and refresh
   - **Note**: TLS certificate provisioning happens automatically but may take 10-30 minutes after DNS propagation

5. **Test HTTPS access and verify correct content**:
   ```bash
   # Test HTTPS connection
   curl -I https://x39matrix.org
   # Expected: HTTP 200 OK with Content-Type: text/html
   # Pass: HTTP 200 OK
   # Fail (Certificate error): Wait 10-15 minutes for IC to provision certificate, then retry
   # Fail (Connection refused): DNS not propagated yet, wait longer
   
   # Verify correct content (not default Nginx page)
   curl -s https://x39matrix.org | grep -i "x39matrix"
   # Expected: Should find "x39matrix" in HTML content
   # Pass: "x39matrix" found in response
   # Fail: No match → See troubleshooting section below
   
   # Check for default Nginx page (should NOT appear)
   curl -s https://x39matrix.org | grep -i "welcome to nginx"
   # Expected: No output (empty result = pass)
   # Pass: No output (grep returns nothing)
   # Fail: "welcome to nginx" found → See troubleshooting section below
   ```
   - **Pass**: HTTP 200, correct HTML content, no Nginx default page
   - **Fail (Certificate error)**: Wait 10-15 minutes for IC to provision certificate, then retry
   - **Fail (Default Nginx page)**: See troubleshooting section below

**TLS Provisioning Expectation Window**:
- After DNS propagation is complete, IC boundary nodes will automatically provision a Let's Encrypt TLS certificate
- **Expected time**: 10-30 minutes after DNS A/AAAA records are verified
- During this window, you may see certificate errors or "connection not secure" warnings
- **Do NOT proceed to Phase 2** until HTTPS works without certificate errors

**Estimated Duration**: 15-30 minutes (plus up to 30 minutes for TLS provisioning)

---

### Troubleshooting: Default Nginx Page

**Symptom**: Visiting https://x39matrix.org shows a generic "Welcome to nginx!" page instead of the X39 Matrix application.

**Root Causes**:
1. Custom domain not registered in IC Dashboard (Step 1 skipped or failed)
2. DNS A/AAAA records pointing to wrong IPs (not the IC boundary node IPs from dashboard)
3. DNS propagation incomplete (records not yet visible globally)
4. IC boundary node routing misconfiguration (rare, usually resolves automatically)

**Diagnosis Steps**:

1. **Verify custom domain registration in IC Dashboard**:
   - Log in to IC Dashboard → Canisters → Your frontend canister → Settings → Custom Domains
   - Confirm `x39matrix.org` is listed with status "Active" (green checkmark)
   - If not listed or status is "Pending"/"Error", re-register the domain and wait 5-10 minutes

2. **Verify DNS targets match IC Dashboard**:
   ```bash
   # Check what IPs your DNS is returning
   dig x39matrix.org A +short
   dig x39matrix.org AAAA +short
   
   # Compare with IPs shown in IC Dashboard → Custom Domains
   # They MUST match exactly
   ```
   - **If IPs don't match**: Update Namecheap DNS records with correct IPs from IC Dashboard
   - **If no IPs returned**: DNS not propagated yet, wait 15-30 minutes and retry

3. **Check DNS propagation globally**:
   - Visit https://dnschecker.org/
   - Enter `x39matrix.org`
   - Select "A" record type
   - Verify records are propagated globally (green checkmarks in multiple regions)
   - If propagation is incomplete (red X marks), wait 1-2 hours and check again

4. **Test canister direct access**:
   ```bash
   # Replace with your actual canister ID
   curl -I https://[CANISTER_ID].ic0.app
   # Expected: HTTP 200 OK with X39 Matrix content
   ```
   - **If canister direct access works**: DNS target mismatch or registration issue
   - **If canister direct access fails**: Canister deployment issue (not a DNS problem)

**Resolution**:
- **Most common fix**: Re-register domain in IC Dashboard and verify DNS targets match exactly
- **If DNS targets are correct**: Wait 30-60 minutes for IC boundary node routing to update
- **If issue persists after 2 hours**: Contact IC support with canister ID and domain name

---

### Phase 2: Publication State Activation (T+30 minutes)

**Objective**: Set backend publication state to Published (true) to enable live UI sections.

**Prerequisites**:
- Phase 1 complete: https://x39matrix.org loads correctly with HTTPS and no certificate errors
- Admin Internet Identity principal is configured

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

**Objective**: Configure x39dark.com, x39matrix.com, and x39.org to redirect to x39matrix.org.

**Current Implementation**: Client-side redirect (best-effort)
- The application includes a `useDomainRedirect` hook that redirects in the browser
- This works after the page loads and preserves path/query/hash
- **Limitation**: Does not benefit SEO; does not work if page fails to load

**Recommended for Production**: True HTTP 301 redirects

**Option A: IC Boundary Node Configuration** (if supported):

1. Log in to IC Dashboard
2. Navigate to frontend canister → Custom Domains
3. Add `x39dark.com`, `x39matrix.com`, and `x39.org` as custom domains
4. Configure redirect rules (if available):
   - From: `x39dark.com` → To: `https://x39matrix.org` (301 Permanent)
   - From: `x39matrix.com` → To: `https://x39matrix.org` (301 Permanent)
   - From: `x39.org` → To: `https://x39matrix.org` (301 Permanent)

**Option B: DNS-Level Redirect** (using Cloudflare or similar):

1. Log in to DNS provider (e.g., Cloudflare)
2. Navigate to **Page Rules** or **Redirect Rules**
3. Create redirect for x39dark.com:
   - **If**: URL matches `x39dark.com/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
4. Create redirect for x39matrix.com:
   - **If**: URL matches `x39matrix.com/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
5. Create redirect for x39.org:
   - **If**: URL matches `x39.org/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
6. Save and enable rules

**Option C: Client-Side Only** (current implementation):

- No additional configuration needed
- Redirects happen in browser after page loads
- Less SEO benefit but functional

**Verification**:

