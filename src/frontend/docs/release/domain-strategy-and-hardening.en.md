# X39 Matrix - Domain Strategy and Hardening

**Canonical Domain**: https://x39matrix.org  
**Satellite Domains**: x39dark.com, x39matrix.com, x39.org (if registered)

This document describes the domain architecture, redirect strategy, SSL/HSTS configuration, and operational procedures for maintaining worldwide availability of the X39 Matrix application.

---

## 🌐 Domain Architecture

### Canonical Domain

**https://x39matrix.org** is the official, canonical domain for the X39 Matrix application.

**Characteristics**:
- Primary domain for all official communications
- Target for all SEO efforts
- Destination for all redirects from satellite domains
- Configured with custom domain mapping in IC Dashboard
- DNS A + AAAA records point to IC boundary node IPs (obtained from IC Dashboard)

**Why x39matrix.org?**:
- Professional .org TLD conveys trust and authority
- Clear branding alignment with "X39 Matrix" project name
- Lowercase for consistency and ease of typing

### Satellite Domains

**x39dark.com**, **x39matrix.com**, and **x39.org** are satellite domains that redirect to the canonical domain.

**Purpose**:
- Brand protection (prevent squatting)
- Legacy support (if users bookmarked old domains)
- Marketing flexibility (different domains for different campaigns)

**Redirect Strategy**:
- **Recommended**: True HTTP 301 redirects (server-side)
- **Current**: Client-side redirects (best-effort, implemented in `useDomainRedirect` hook)
- **Goal**: Preserve path, query parameters, and hash fragments during redirect

---

## 🔀 Redirect Implementation

### Current Implementation: Client-Side Redirect

The application includes a `useDomainRedirect` React hook that performs best-effort client-side redirects from satellite domains to the canonical domain.

**How it works**:
1. Hook runs on page load in the browser
2. Detects if current hostname is a satellite domain or www variant
3. Builds redirect URL preserving path, query, and hash
4. Performs `window.location.replace()` to canonical domain

**Advantages**:
- No additional infrastructure required
- Works automatically for all satellite domains
- Preserves deep links (path/query/hash)

**Limitations**:
- Does not benefit SEO (search engines see 200 OK, not 301)
- Does not work if page fails to load
- Slight delay before redirect (page must load first)

**Code Location**: `frontend/src/hooks/useDomainRedirect.ts`

### Recommended Implementation: Server-Side 301 Redirects

For production, implement true HTTP 301 redirects at the IC boundary node or DNS level.

**Option A: IC Boundary Node Configuration** (if supported):

1. Log in to IC Dashboard
2. Navigate to frontend canister → Custom Domains
3. Add satellite domains as custom domains
4. Configure redirect rules:
   - From: `x39dark.com` → To: `https://x39matrix.org` (301 Permanent)
   - From: `x39matrix.com` → To: `https://x39matrix.org` (301 Permanent)
   - From: `x39.org` → To: `https://x39matrix.org` (301 Permanent)

**Option B: DNS-Level Redirect** (using Cloudflare or similar):

1. Log in to DNS provider (e.g., Cloudflare)
2. Navigate to **Page Rules** or **Redirect Rules**
3. Create redirect for each satellite domain:
   - **If**: URL matches `x39dark.com/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
4. Save and enable rules

**Advantages**:
- SEO benefit (search engines see 301 redirect)
- Works even if page fails to load
- No delay (redirect happens before page loads)

**Verification**:

