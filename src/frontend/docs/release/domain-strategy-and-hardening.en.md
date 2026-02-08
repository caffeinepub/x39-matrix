# X39 Matrix - Domain Strategy & Hardening Guide

This document describes the canonical domain strategy for X39 Matrix and provides operational steps for implementing true 301 redirects and SSL/HSTS verification.

---

## 🌐 Domain Strategy

### Canonical Domain (Mother Domain)
**x39matrix.org** is the official, canonical domain for the X39 Matrix protocol.

- **Purpose**: Primary entry point for all users, SEO authority, brand identity
- **Configuration**: Custom domain mapped to frontend canister on Internet Computer
- **HTTPS**: Required with valid TLS certificate
- **HSTS**: Recommended for enhanced security
- **URL Format**: Always use lowercase: `https://x39matrix.org`

### Satellite Domain (Tactical Entry/Mirror)
**x39dark.com** serves as a satellite tactical domain.

- **Purpose**: Entry point, mirror, diffusion, marketing campaigns
- **Behavior**: Should redirect to x39matrix.org (see 301 redirect section below)
- **Use Case**: Temporary campaigns, regional marketing, fallback access

### Additional Satellite Domain
**x39matrix.com** (if registered) should also redirect to x39matrix.org.

---

## 🔀 Implementing 301 Redirects (.com → .org)

A **true 301 redirect** ensures that all traffic from satellite domains (x39dark.com, x39matrix.com) is permanently redirected to the canonical domain (x39matrix.org) at the server/boundary node level.

### Client-Side Redirect (Current Implementation)
The application currently implements a **best-effort client-side redirect** using the `useDomainRedirect` hook in `frontend/src/hooks/useDomainRedirect.ts`. This redirect:
- Runs in the browser after the page loads
- Preserves path, query, and hash parameters
- Works for users who load the application successfully

**Limitation**: Client-side redirects do not benefit SEO and do not work if the page fails to load.

### Server-Side 301 Redirect (Recommended)
For production, implement a **true HTTP 301 redirect** at the boundary node or DNS level.

#### Option 1: Internet Computer Boundary Node Configuration
1. Log in to the [Internet Computer Dashboard](https://dashboard.internetcomputer.org/)
2. Navigate to your frontend canister
3. Go to **Settings** → **Custom Domains**
4. Configure redirect rules (if supported by IC dashboard):
   - From: `x39dark.com` → To: `https://x39matrix.org` (301 Permanent)
   - From: `x39matrix.com` → To: `https://x39matrix.org` (301 Permanent)

**Note**: As of February 2026, IC boundary node redirect configuration may require manual setup or support ticket. Check the latest IC documentation.

#### Option 2: DNS-Level Redirect (Using DNS Provider)
Some DNS providers (e.g., Cloudflare) support HTTP redirects at the DNS level:

1. Log in to your DNS provider (e.g., Cloudflare)
2. Navigate to **Page Rules** or **Redirect Rules**
3. Create a new rule:
   - **If**: URL matches `x39dark.com/*`
   - **Then**: Redirect to `https://x39matrix.org/$1` (301 Permanent)
4. Repeat for `x39matrix.com`

**Verification**:

