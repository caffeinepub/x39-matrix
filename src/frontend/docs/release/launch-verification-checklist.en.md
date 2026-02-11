# X39 Matrix - Launch Verification Checklist

**Public Launch Date**: March 15, 2026  
**Canonical Domain**: https://x39matrix.org

This checklist provides post-cutover verification steps to confirm that the March 15, 2026 launch was successful and all systems are operational.

---

## 🎯 Overview

Use this checklist immediately after completing the go-live runbook to verify that:
1. Custom domain cutover is complete and functional
2. Publication state is activated and live UI sections render correctly
3. Satellite domains redirect properly
4. All application features work as expected

**Prerequisites**: [Go-Live Runbook](./go-live-runbook-2026-03-15.en.md) Phase 1-3 completed.

---

## ✅ Verification Checks

### Check 1: Domain & HTTPS Verification

**Objective**: Confirm https://x39matrix.org is accessible with valid HTTPS certificate.

**Steps**:

1. **Browser verification**:
   - Open https://x39matrix.org in multiple browsers (Chrome, Firefox, Safari, Edge)
   - Verify no certificate errors or warnings
   - Verify padlock icon shows "Connection is secure"
   - Verify URL bar shows "https://x39matrix.org" (not canister URL)

2. **Command-line verification**:
   ```bash
   # Test HTTPS connection
   curl -I https://x39matrix.org
   # Expected: HTTP 200 OK with Content-Type: text/html
   # Pass: HTTP 200 OK
   # Fail: Certificate error, connection refused, or timeout → Review DNS/TLS configuration
   
   # Verify correct content (not default Nginx page)
   curl -s https://x39matrix.org | grep -i "x39matrix"
   # Expected: Should find "x39matrix" in HTML content
   # Pass: "x39matrix" found in response
   # Fail: No match or "welcome to nginx" found → Review custom domain registration
   
   # Check for default Nginx page (should NOT appear)
   curl -s https://x39matrix.org | grep -i "welcome to nginx"
   # Expected: No output (empty result = pass)
   # Pass: No output (grep returns nothing)
   # Fail: "welcome to nginx" found → Review troubleshooting section in go-live runbook
   ```

3. **TLS certificate verification**:
   ```bash
   # Check certificate details
   openssl s_client -connect x39matrix.org:443 -servername x39matrix.org < /dev/null 2>/dev/null | openssl x509 -noout -dates -subject
   # Expected: Valid dates (not expired), subject matches x39matrix.org
   # Pass: Certificate valid and not expired, subject CN=x39matrix.org
   # Fail: Certificate expired, self-signed, or subject mismatch → Wait for IC to provision certificate (10-30 min)
   ```

**Pass Criteria**:
- ✅ https://x39matrix.org loads in all major browsers without errors
- ✅ Valid HTTPS certificate (not expired, issued by trusted CA)
- ✅ Application content displays correctly (not default Nginx page)
- ✅ No certificate warnings or mixed content errors

**Fail Criteria**:
- ❌ Certificate errors or warnings
- ❌ Default Nginx page visible
- ❌ Connection refused or timeout
- ❌ HTTP (not HTTPS) connection

**If Failed**: Review [go-live-runbook-2026-03-15.en.md](./go-live-runbook-2026-03-15.en.md) Phase 1 and troubleshooting section.

---

### Check 2: DNS Propagation Verification

**Objective**: Confirm DNS records are propagated globally and point to correct IC boundary nodes.

**Steps**:

1. **Local DNS verification**:
   ```bash
   # Check A record (IPv4)
   dig x39matrix.org A +short
   # Expected: Returns the IPv4 address from IC Dashboard (e.g., 147.75.83.255)
   # Pass: Correct IP returned
   # Fail: Wrong IP or no IP → Review DNS configuration at Namecheap
   
   # Check AAAA record (IPv6)
   dig x39matrix.org AAAA +short
   # Expected: Returns the IPv6 address from IC Dashboard (e.g., 2604:1380:4641:c500::1)
   # Pass: Correct IP returned
   # Fail: Wrong IP or no IP → Review DNS configuration at Namecheap
   
   # Check authoritative nameservers
   dig x39matrix.org NS +short
   # Expected: Returns Namecheap's nameservers (e.g., dns1.registrar-servers.com)
   # Pass: Namecheap nameservers returned
   # Fail: Wrong nameservers → Verify domain is using Namecheap DNS
   ```

2. **Global DNS propagation check**:
   - Visit https://dnschecker.org/
   - Enter `x39matrix.org`
   - Select "A" record type
   - Verify green checkmarks in multiple regions (US, EU, Asia, etc.)
   - Repeat for "AAAA" record type

**Pass Criteria**:
- ✅ A record returns correct IC boundary node IPv4 address
- ✅ AAAA record returns correct IC boundary node IPv6 address
- ✅ DNS propagation shows green checkmarks globally (>80% of regions)
- ✅ Authoritative nameservers match DNS provider (Namecheap)

**Fail Criteria**:
- ❌ DNS returns wrong IPs or no records
- ❌ DNS propagation incomplete (<50% of regions)
- ❌ Wrong nameservers returned

**If Failed**: Wait 1-2 hours for DNS propagation to complete, then re-check. If still failing after 24 hours, review DNS configuration at Namecheap.

---

### Check 3: Static Asset Verification

**Objective**: Confirm static assets (images, fonts, etc.) load correctly from the custom domain.

**Steps**:

1. **Test key assets**:
   ```bash
   # Test app icon
   curl -I https://x39matrix.org/assets/generated/app-icon.dim_1024x1024.png
   # Expected: HTTP 200 OK with Content-Type: image/png
   # Pass: HTTP 200 OK
   # Fail: 404 or other error → Review asset deployment
   
   # Test favicon
   curl -I https://x39matrix.org/assets/generated/x39matrix-favicon.dim_32x32.png
   # Expected: HTTP 200 OK with Content-Type: image/png
   # Pass: HTTP 200 OK
   # Fail: 404 or other error → Review asset deployment
   ```

2. **Browser verification**:
   - Open https://x39matrix.org
   - Open browser DevTools → Network tab
   - Reload page
   - Verify all assets load with HTTP 200 status
   - Verify no 404 errors for images, fonts, or other assets

**Pass Criteria**:
- ✅ All static assets load with HTTP 200 status
- ✅ No 404 errors in browser console
- ✅ Images display correctly (not broken image icons)
- ✅ Fonts load correctly (no fallback fonts)

**Fail Criteria**:
- ❌ 404 errors for assets
- ❌ Broken images or missing fonts
- ❌ Mixed content warnings (HTTP assets on HTTPS page)

**If Failed**: Review asset deployment and ensure all assets are included in the frontend canister build.

---

### Check 4: Publication State Verification

**Objective**: Confirm backend publication state is Published (true) and live UI sections render correctly without requiring a manual refresh.

**Steps**:

1. **Verify publication state (admin)**:
   - Log in to https://x39matrix.org as admin
   - Navigate to Admin Go-Live Toggle section
   - Verify publication state shows "Published" (true)
   - Verify last-updated timestamp is recent (within last hour)

2. **Verify live UI sections render immediately (no refresh required)**:
   - **Legal Disclaimer Section**:
     - Scroll to Legal Disclaimer section
     - Verify it shows full disclaimer content (not "Coming Soon")
     - Verify "Effective Date: March 15, 2026" is displayed
   
   - **March 15, 2026 Launch Information Section**:
     - Scroll to March 15 Launch Information section
     - Verify section is visible with launch details
     - Verify countdown timer or launch announcement is displayed
   
   - **Verify no manual refresh was required**:
     - Confirm sections appeared immediately after publication state was set to true
     - If manual refresh was required, note this as a minor issue (not critical)

3. **Verify publication state persistence (non-admin)**:
   - Open a new browser tab/window (incognito/private mode)
   - Navigate to https://x39matrix.org (without logging in)
   - Scroll to Legal Disclaimer section
   - Verify it shows full published disclaimer (not "Coming Soon")
   - Scroll to March 15 Launch Information section
   - Verify section is visible

**Pass Criteria**:
- ✅ Publication state shows "Published" (true) in admin panel
- ✅ Legal Disclaimer shows full content with "Effective Date: March 15, 2026"
- ✅ March 15, 2026 Launch Information section is visible
- ✅ Changes appeared immediately without manual refresh (or within 5-10 seconds)
- ✅ Changes persist across browser sessions and for non-admin users

**Fail Criteria**:
- ❌ Publication state shows "Not Published" (false)
- ❌ Legal Disclaimer still shows "Coming Soon"
- ❌ March 15 Launch Information section not visible
- ❌ Manual page refresh was required to see changes (minor issue, not critical)

**If Failed**: Review [go-live-runbook-2026-03-15.en.md](./go-live-runbook-2026-03-15.en.md) Phase 2 and verify admin authentication and backend deployment.

---

### Check 5: Backend Health Verification

**Objective**: Confirm backend canister is reachable and healthy.

**Steps**:

1. **Test backend health endpoint**:
   - Open https://x39matrix.org
   - Open browser DevTools → Console
   - Run the following (if available in UI):
     ```javascript
     // This assumes a health check UI or diagnostics modal is available
     // Alternatively, verify backend calls succeed in Network tab
     ```
   - Verify backend health check succeeds

2. **Test key backend operations**:
   - **User login**: Log in with Internet Identity
   - **User profile**: Verify user profile loads (if applicable)
   - **Holdings**: Create a test holding (if applicable)
   - **Proposals**: View proposals list (if applicable)
   - Verify all operations succeed without errors

**Pass Criteria**:
- ✅ Backend health check succeeds
- ✅ User login works correctly
- ✅ Backend API calls succeed (no 500 errors)
- ✅ No console errors related to backend communication

**Fail Criteria**:
- ❌ Backend health check fails
- ❌ User login fails
- ❌ Backend API calls return 500 errors
- ❌ Console errors related to backend communication

**If Failed**: Review backend canister deployment and verify canister is running on mainnet.

---

### Check 6: Satellite Domain Redirect Verification

**Objective**: Verify satellite domains (x39dark.com, x39matrix.com, x39.org) redirect to canonical domain (x39matrix.org).

**Steps**:

1. **Test satellite domain redirects**:
   ```bash
   # Test x39dark.com (if configured)
   curl -I https://x39dark.com
   # Expected (server-side 301): HTTP 301 Moved Permanently, Location: https://x39matrix.org
   # Expected (client-side): HTTP 200 OK (redirect happens in browser)
   # Pass: Either 301 redirect or 200 OK
   # Fail: 404, 502, or other error → Review satellite domain configuration
   
   # Test x39matrix.com (if configured)
   curl -I https://x39matrix.com
   # Expected (server-side 301): HTTP 301 Moved Permanently, Location: https://x39matrix.org
   # Expected (client-side): HTTP 200 OK (redirect happens in browser)
   # Pass: Either 301 redirect or 200 OK
   # Fail: 404, 502, or other error → Review satellite domain configuration
   
   # Test x39.org (if configured)
   curl -I https://x39.org
   # Expected (server-side 301): HTTP 301 Moved Permanently, Location: https://x39matrix.org
   # Expected (client-side): HTTP 200 OK (redirect happens in browser)
   # Pass: Either 301 redirect or 200 OK
   # Fail: 404, 502, or other error → Review satellite domain configuration
   ```

2. **Test redirect preserves path/query/hash** (browser test):
   - Open https://x39dark.com/test?foo=bar#section in browser
   - Verify it redirects to https://x39matrix.org/test?foo=bar#section
   - Repeat for other satellite domains (if configured)

**Pass Criteria**:
- ✅ Satellite domains redirect to https://x39matrix.org (301 or client-side)
- ✅ Path, query, and hash are preserved during redirect
- ✅ No redirect loops or errors

**Fail Criteria**:
- ❌ Satellite domains show different content or errors
- ❌ Redirect loops occur
- ❌ Path/query/hash not preserved

**If Failed**: Review [go-live-runbook-2026-03-15.en.md](./go-live-runbook-2026-03-15.en.md) Phase 3 and satellite domain configuration.

---

### Check 7: Functional Verification

**Objective**: Confirm all key application features work correctly on the custom domain.

**Steps**:

1. **User authentication**:
   - [ ] Login with Internet Identity works
   - [ ] Logout works
   - [ ] User profile displays correctly (if applicable)

2. **Portfolio/Staking features** (if applicable):
   - [ ] Create holding works
   - [ ] View holdings list works
   - [ ] Unlock holding works
   - [ ] Delete holding works

3. **Governance features** (if applicable):
   - [ ] View proposals list works
   - [ ] View proposal details works
   - [ ] Vote on proposal works

4. **UI/UX verification**:
   - [ ] Navigation works correctly
   - [ ] All links work (no broken links)
   - [ ] Mobile responsiveness verified (test on mobile device or browser DevTools)
   - [ ] No console errors in browser

**Pass Criteria**:
- ✅ All key features work correctly
- ✅ No broken links or 404 errors
- ✅ Mobile responsiveness verified
- ✅ No console errors

**Fail Criteria**:
- ❌ Key features fail or return errors
- ❌ Broken links or 404 errors
- ❌ Mobile layout broken
- ❌ Console errors present

**If Failed**: Review application deployment and verify all features are included in the frontend canister build.

---

### Check 8: Performance Verification

**Objective**: Confirm application performance meets acceptable standards.

**Steps**:

1. **Page load time**:
   - Open https://x39matrix.org in browser
   - Open browser DevTools → Network tab
   - Reload page (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
   - Verify page load time (DOMContentLoaded) < 3 seconds
   - Verify total load time (Load event) < 5 seconds

2. **Lighthouse audit** (optional but recommended):
   - Open https://x39matrix.org in Chrome
   - Open DevTools → Lighthouse tab
   - Run audit (Performance, Accessibility, Best Practices, SEO)
   - Verify scores:
     - Performance: >70
     - Accessibility: >80
     - Best Practices: >80
     - SEO: >80

**Pass Criteria**:
- ✅ Page load time < 3 seconds
- ✅ Total load time < 5 seconds
- ✅ Lighthouse scores meet minimum thresholds

**Fail Criteria**:
- ❌ Page load time > 5 seconds
- ❌ Total load time > 10 seconds
- ❌ Lighthouse scores below minimum thresholds

**If Failed**: Review application performance optimization and consider implementing caching, lazy loading, or other performance improvements.

---

## 📊 Verification Summary

**Critical Checks** (must pass):
- [ ] Check 1: Domain & HTTPS Verification
- [ ] Check 2: DNS Propagation Verification
- [ ] Check 3: Static Asset Verification
- [ ] Check 4: Publication State Verification
- [ ] Check 5: Backend Health Verification

**Recommended Checks** (should pass):
- [ ] Check 6: Satellite Domain Redirect Verification
- [ ] Check 7: Functional Verification
- [ ] Check 8: Performance Verification

**Overall Status**:
- [ ] ✅ All critical checks passed - Launch successful
- [ ] ⚠️ Some recommended checks failed - Launch successful with minor issues
- [ ] ❌ Critical checks failed - Launch failed, rollback required

---

## 🆘 If Verification Fails

**Minor Issues** (recommended checks failed):
- Document issues in launch notes
- Create tickets for post-launch fixes
- Monitor for user reports
- Plan fixes for next deployment

**Critical Issues** (critical checks failed):
- **Do NOT proceed with public announcement**
- Review [go-live-runbook-2026-03-15.en.md](./go-live-runbook-2026-03-15.en.md) rollback procedures
- Execute appropriate rollback option
- Fix issues in development environment
- Re-run go-live runbook when ready

---

## 📢 Post-Verification Actions

**If all critical checks passed**:

1. **Document launch**:
   - Record verification results
   - Note any minor issues for follow-up
   - Update launch status tracker

2. **Enable monitoring**:
   - Activate uptime monitoring for https://x39matrix.org
   - Set up alert notifications for downtime
   - Configure analytics tracking

3. **Proceed with public announcement**:
   - Follow [go-live-runbook-2026-03-15.en.md](./go-live-runbook-2026-03-15.en.md) Phase 4 (Public Announcement)
   - Post launch announcement on social media
   - Update community channels
   - Monitor initial traffic and user feedback

---

## 📝 Verification Report Template

