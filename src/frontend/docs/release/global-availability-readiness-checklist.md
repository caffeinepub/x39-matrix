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
   - Enter: `x39matrix.org` (lowercase, no www)
   - Click **Register**
   - **IMPORTANT**: After registration, the dashboard will display the exact IPv4 and IPv6 addresses you must use
   - Example display:
     ```
     Point your DNS A record to: 147.75.83.255
     Point your DNS AAAA record to: 2604:1380:4641:c500::1
     ```
   - **Copy these addresses exactly** - you will configure them at your DNS provider (Namecheap)
   - **Do NOT use placeholder IPs** - always copy the actual IPs shown in the IC Dashboard

3. **Understand supported record types**:
   - **Apex domain (x39matrix.org)**: Use **A** (IPv4) and **AAAA** (IPv6) records pointing to IC boundary node IPs
     - **CRITICAL**: Do NOT use CNAME records for apex domains - this is not supported by DNS standards
     - Always use A + AAAA records for the apex domain
   - **Subdomain (www.x39matrix.org)**: Use **CNAME** record pointing to apex domain (`x39matrix.org`)
   - **Why no apex CNAME?**: DNS RFC standards prohibit CNAME records at the apex (zone root) because they conflict with required SOA and NS records

4. **Configure DNS at Namecheap**:
   - Log in to [Namecheap](https://www.namecheap.com/)
   - Navigate to **Domain List**
   - Click **Manage** next to `x39matrix.org`
   - Go to the **Advanced DNS** tab
   - Under "Host Records", click **Add New Record** for each record:
   
   **A Record (IPv4)**:
   - **Type**: A Record
   - **Host**: @ (represents apex domain)
   - **Value**: [IPv4 from IC Dashboard, e.g., 147.75.83.255]
   - **TTL**: 300 (5 minutes for cutover; raise to 3600 after verification)
   
   **AAAA Record (IPv6)**:
   - **Type**: AAAA Record
   - **Host**: @ (represents apex domain)
   - **Value**: [IPv6 from IC Dashboard, e.g., 2604:1380:4641:c500::1]
   - **TTL**: 300 (5 minutes for cutover; raise to 3600 after verification)
   
   **CNAME Record (www subdomain, optional)**:
   - **Type**: CNAME Record
   - **Host**: www
   - **Value**: x39matrix.org (points to apex)
   - **TTL**: 300 (5 minutes for cutover; raise to 3600 after verification)
   
   - Click the green checkmark to save each record
   - Click **Save All Changes** at the bottom of the page

5. **TTL recommendations**:
   - **Pre-cutover** (24-48 hours before launch): Lower TTL to **300 seconds** (5 minutes) for faster propagation during cutover
   - **Post-cutover** (after successful verification): Raise TTL to **3600 seconds** (1 hour) or **86400 seconds** (24 hours) for better caching and reduced DNS queries

6. **Test canister direct access**:
   ```bash
   # Replace with your actual canister ID
   curl -I https://[CANISTER_ID].ic0.app
   ```
   - Expected: HTTP 200 OK with your application content
   - If you see "default Nginx page" or 404, the canister may not be deployed correctly

**Verification Commands**:

