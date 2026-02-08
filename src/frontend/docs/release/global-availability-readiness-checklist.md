# X39 Matrix - Global Availability Readiness Checklist

This checklist ensures that https://x39matrix.org is properly configured for worldwide availability with correct custom domain mapping, HTTPS/TLS, and DNS configuration.

**Public Launch Date**: March 15, 2026

---

## 🌍 Overview

This guide helps you verify that x39matrix.org (lowercase) is correctly deployed and accessible globally, avoiding common misconfigurations like the "default Nginx page" error.

**For the complete launch sequence**, see [go-live-runbook-2026-03-15.en.md](./go-live-runbook-2026-03-15.en.md).

---

## ✅ Pre-Deployment Verification

### 1. Custom Domain to Canister Mapping

**Objective**: Ensure the custom domain `x39matrix.org` is correctly mapped to your Internet Computer canister.

**Where to Obtain DNS Targets**:

The authoritative DNS targets (IP addresses) for IC boundary nodes are provided by the Internet Computer Dashboard after you register your custom domain. **Do not use placeholder IPs or guess these values.**

**Steps**:

1. **Verify canister ID**:
   - Locate your canister ID in `.dfx/local/canister_ids.json` (local) or `canister_ids.json` (production)
   - Example: `"frontend": { "ic": "rrkah-fqaaa-aaaaa-aaaaq-cai" }`

2. **Register domain and obtain DNS targets**:
   - Log in to the [Internet Computer Dashboard](https://dashboard.internetcomputer.org/)
   - Navigate to **Canisters** → Select your frontend canister
   - Go to **Settings** → **Custom Domains**
   - Click **Add Custom Domain**
   - Enter: `x39matrix.org`
   - Click **Register**
   - **IMPORTANT**: After registration, the dashboard will display the exact IPv4 and IPv6 addresses you must use
   - Example: "Point your DNS A record to: 147.75.83.255" and "Point your DNS AAAA record to: 2604:1380:4641:c500::1"
   - **Copy these addresses exactly** - you will configure them at your DNS provider

3. **Understand supported record types**:
   - **Apex domain (x39matrix.org)**: Use **A** (IPv4) and **AAAA** (IPv6) records pointing to IC boundary node IPs
   - **Subdomain (www.x39matrix.org)**: Use **CNAME** record pointing to apex domain or IC boundary node hostname (if provided)
   - **Do NOT use**: CNAME records for apex domains (not supported by most DNS providers)

4. **TTL recommendations**:
   - **Pre-cutover** (24-48 hours before launch): Lower TTL to **300 seconds** (5 minutes) for faster propagation during cutover
   - **Post-cutover** (after successful verification): Raise TTL to **3600 seconds** (1 hour) or **86400 seconds** (24 hours) for better caching and reduced DNS queries

5. **Test canister direct access**:
   ```bash
   # Replace with your actual canister ID
   curl -I https://[CANISTER_ID].ic0.app
   ```
   - Expected: HTTP 200 OK with your application content
   - If you see "default Nginx page" or 404, the canister may not be deployed correctly

**Common Issues**:
- ❌ Domain not registered in canister settings → Register via IC Dashboard
- ❌ Wrong canister ID mapped → Verify and update mapping
- ❌ Canister not deployed → Run `dfx deploy --network ic frontend` first
- ❌ Using placeholder IPs instead of actual IC boundary node IPs → Obtain correct IPs from IC Dashboard

---

### 2. HTTPS/TLS Certificate Verification

**Objective**: Confirm that https://x39matrix.org serves content over HTTPS with a valid certificate.

**Steps**:

1. **Browser verification**:
   - Open https://x39matrix.org in a browser
   - Click the padlock icon in the address bar
   - Verify certificate is valid and issued by a trusted CA
   - Check certificate subject matches `x39matrix.org`

2. **Command-line verification**:
   ```bash
   # Test HTTPS connection
   curl -I https://x39matrix.org
   # Expected: HTTP 200 OK with Content-Type: text/html
   
   # Check certificate details
   openssl s_client -connect x39matrix.org:443 -servername x39matrix.org < /dev/null 2>/dev/null | openssl x509 -noout -dates -subject
   # Expected: Valid dates (not expired), subject matches x39matrix.org
   
   # Check for HSTS header (optional but recommended)
   curl -I https://x39matrix.org | grep -i "strict-transport-security"
   # Expected: Strict-Transport-Security header present (if HSTS is enabled)
   ```

3. **SSL Labs test** (optional but recommended):
   - Visit https://www.ssllabs.com/ssltest/
   - Enter `x39matrix.org`
   - Wait for analysis (2-3 minutes)
   - Expected: Grade A or A+ with no critical warnings

**Pass Criteria**:
- ✅ Certificate is valid (not expired)
- ✅ Certificate is issued by a trusted CA (e.g., Let's Encrypt)
- ✅ Certificate subject matches `x39matrix.org`
- ✅ No browser security warnings
- ✅ HTTPS connection succeeds (HTTP 200)

**Fail Criteria**:
- ❌ Certificate error or warning
- ❌ Certificate expired or self-signed
- ❌ Certificate subject mismatch
- ❌ Connection refused or timeout

**Common Issues**:
- ❌ Certificate error → Wait for IC to provision certificate (can take 10-30 minutes after domain registration)
- ❌ Mixed content warnings → Ensure all assets use HTTPS URLs
- ❌ HTTP redirects to HTTPS not working → IC handles this automatically; check DNS

---

### 3. DNS Record Verification

**Objective**: Ensure DNS records correctly point to Internet Computer infrastructure.

**Steps**:

1. **Check DNS A/AAAA records**:
   ```bash
   # Check A record (IPv4)
   dig x39matrix.org A +short
   # Expected: Returns the IPv4 address from IC Dashboard (e.g., 147.75.83.255)
   
   # Check AAAA record (IPv6)
   dig x39matrix.org AAAA +short
   # Expected: Returns the IPv6 address from IC Dashboard (e.g., 2604:1380:4641:c500::1)
   
   # Check authoritative nameservers
   dig x39matrix.org NS +short
   # Expected: Returns your DNS provider's nameservers
   ```

2. **Check DNS propagation globally**:
   - Visit https://dnschecker.org/
   - Enter `x39matrix.org`
   - Select "A" record type
   - Verify records are propagated globally (green checkmarks)
   - Repeat for "AAAA" record type
   - **Note**: Propagation can take 5 minutes to 48 hours depending on TTL

3. **Verify CNAME (if using subdomain)**:
   ```bash
   dig www.x39matrix.org CNAME +short
   # Expected: CNAME points to apex domain (x39matrix.org) or IC boundary node hostname
   ```

**Pass Criteria**:
- ✅ A record returns correct IC boundary node IPv4 address
- ✅ AAAA record returns correct IC boundary node IPv6 address
- ✅ DNS propagation shows green checkmarks globally
- ✅ CNAME (if used) points to correct target

**Fail Criteria**:
- ❌ DNS returns wrong IPs or no records
- ❌ DNS propagation incomplete (red X marks)
- ❌ CNAME points to wrong target

**Common Issues**:
- ❌ DNS not propagated → Wait 24-48 hours; check with your DNS provider
- ❌ Wrong IP addresses → Update DNS records to IC boundary node IPs from IC Dashboard
- ❌ TTL too high → Lower TTL before making changes (e.g., 300 seconds)

---

### 4. Default Nginx Page Detection & Remediation

**Objective**: Detect and fix the "Welcome to nginx!" or "default Nginx page" misconfiguration.

**Symptoms**:
- Visiting https://x39matrix.org shows a generic Nginx welcome page
- Page title is "Welcome to nginx!" or similar
- No X39 Matrix branding or content visible

**Root Causes**:
1. Custom domain not registered in canister settings
2. Canister not deployed or empty
3. DNS pointing to wrong server/IP
4. Boundary node routing misconfiguration

**Detection Steps**:

1. **Visual check**:
   - Open https://x39matrix.org
   - Look for "Welcome to nginx!" text
   - Check page source for `<title>Welcome to nginx!</title>`

2. **HTTP header check**:
   ```bash
   curl -I https://x39matrix.org
   # If you see Server: nginx without IC-specific headers, it may be misconfigured
   ```

3. **Content check**:
   ```bash
   curl -s https://x39matrix.org | grep -i "nginx"
   # Expected: No output (empty result = pass)
   # If output contains "nginx" or "default page", misconfiguration confirmed
   
   # Verify correct content
   curl -s https://x39matrix.org | grep -i "x39matrix"
   # Expected: Should find "x39matrix" in HTML content
   ```

**Pass Criteria**:
- ✅ No "Welcome to nginx!" text visible
- ✅ X39 Matrix branding and content loads correctly
- ✅ HTML contains "x39matrix" references

**Fail Criteria**:
- ❌ "Welcome to nginx!" page appears
- ❌ Generic Nginx default page visible
- ❌ No X39 Matrix content

**Remediation Steps**:

1. **Re-register custom domain**:
   - Go to [IC Dashboard](https://dashboard.internetcomputer.org/)
   - Navigate to your frontend canister
   - Remove and re-add `x39matrix.org` in Custom Domains
   - Wait 5-10 minutes for propagation

2. **Verify canister deployment**:
   ```bash
   dfx canister --network ic status frontend
   # Ensure canister is running and not empty
   
   # Redeploy if necessary
   dfx deploy --network ic frontend
   ```

3. **Check DNS records again**:
   - Ensure DNS points to correct IC boundary nodes (from IC Dashboard)
   - Use `dig x39matrix.org A +short` to verify
   - Update DNS if incorrect

4. **Clear browser cache**:
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open in incognito/private mode

5. **Wait for propagation**:
   - DNS changes: 5 minutes to 48 hours (depending on TTL)
   - Canister domain registration: 10-30 minutes
   - Certificate provisioning: 10-30 minutes

**Verification**:
- Visit https://x39matrix.org
- Expected: X39 Matrix application loads with correct branding
- No Nginx default page visible

---

## 🌐 Satellite Domain Redirect Configuration

**Objective**: Ensure satellite domains (x39dark.com, x39matrix.com) redirect to the canonical domain (x39matrix.org).

**Current Implementation**:
- Client-side redirect via `useDomainRedirect` hook (best-effort)
- Works after page loads in browser
- Preserves path, query, and hash parameters

**Recommended for Production**:
- Implement true HTTP 301 redirects at DNS/boundary node level
- See [domain-strategy-and-hardening.en.md](./domain-strategy-and-hardening.en.md) for detailed instructions
- Benefits: SEO authority, works even if page fails to load

**Verification Steps**:

1. **Test satellite domain redirect (server-side 301)**:
   ```bash
   curl -I https://x39dark.com
   # Expected (with 301 redirect): 
   # HTTP/1.1 301 Moved Permanently
   # Location: https://x39matrix.org/
   
   curl -I https://x39matrix.com
   # Expected (with 301 redirect):
   # HTTP/1.1 301 Moved Permanently
   # Location: https://x39matrix.org/
   ```

2. **Test satellite domain redirect (client-side)**:
   ```bash
   curl -s https://x39dark.com | grep -i "x39matrix.org"
   # Expected (client-side): HTML contains redirect logic
   ```

3. **Browser test**:
   - Open https://x39dark.com in browser
   - Verify it redirects to https://x39matrix.org
   - Check that path/query/hash are preserved
   - Example: https://x39dark.com/test?foo=bar#section should redirect to https://x39matrix.org/test?foo=bar#section

**Pass Criteria**:
- ✅ Server-side 301 redirect: curl shows `301 Moved Permanently` with `Location: https://x39matrix.org/`
- ✅ Client-side redirect: Browser redirects after page load
- ✅ Path, query, and hash are preserved

**Fail Criteria**:
- ❌ No redirect occurs
- ❌ Redirect to wrong domain
- ❌ Path/query/hash not preserved

**Common Issues**:
- ❌ Redirect not working → Verify DNS points to correct canister/boundary node
- ❌ Redirect loop → Check that x39matrix.org does not redirect to itself
- ❌ Path not preserved → Update redirect logic to include `$1` or equivalent

---

## 🧪 Connectivity Diagnostics Tool

**Objective**: Use the built-in diagnostics tool to verify all connectivity checks.

**Steps**:

1. **Access diagnostics**:
   - Open https://x39matrix.org
   - Scroll to footer
   - Click "Diagnostics" button
   - Or navigate to `https://x39matrix.org/?diagnostics=1`

2. **Run diagnostics**:
   - Diagnostics run automatically on page load
   - Review results in the modal

3. **Review results**:
   - ✅ **Canonical Domain**: Should show "pass" with current origin matching official domain
   - ✅ **HTTPS Connection**: Should show "pass" with secure connection confirmed
   - ✅ **HSTS**: May show "pass", "unknown", or "fail" depending on boundary node configuration
   - ✅ **Static Asset Access**: Should show "pass" with assets loading from official domain
   - ✅ **Backend Connection**: Should show "pass" with backend version displayed

4. **Copy report**:
   - Click "Copy Report" button
   - Save report for troubleshooting or support requests

**Expected Output** (all checks passing):

