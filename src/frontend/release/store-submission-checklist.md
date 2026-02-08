# X39 Matrix - Store Submission Checklist

Use this checklist to ensure all required steps are completed before submitting to Google Play Store and Apple App Store.

**Public Launch Date**: March 15, 2026

---

## 🌍 Global Availability Readiness

Before proceeding with store submissions, ensure the web application is properly configured for worldwide availability:

- [ ] **Review Global Availability Checklist**: See [global-availability-readiness-checklist.md](../docs/release/global-availability-readiness-checklist.md)
- [ ] **Review Go-Live Runbook**: See [go-live-runbook-2026-03-15.en.md](../docs/release/go-live-runbook-2026-03-15.en.md) for March 15, 2026 launch sequence
- [ ] Custom domain `x39matrix.org` (lowercase) correctly mapped to canister
- [ ] HTTPS/TLS certificate valid and trusted
- [ ] DNS records propagated globally
- [ ] No "default Nginx page" misconfiguration
- [ ] Connectivity diagnostics showing all checks passing
- [ ] Satellite domains (x39dark.com, x39matrix.com) redirect to x39matrix.org

---

## 🔧 Pre-Build Checklist

### Both Platforms

- [ ] Version numbers updated
  - [ ] Android: `versionCode` and `versionName` in `android/app/build.gradle`
  - [ ] iOS: Marketing version and build number in Xcode
  - [ ] Version tracking files updated: [android-release-version.md](./versions/android-release-version.md) and [ios-release-version.md](./versions/ios-release-version.md)
- [ ] Release notes prepared: [release-notes.en.md](./release-notes.en.md) (March 15, 2026 launch date featured)
- [ ] All assets verified in `frontend/public/assets/generated/` (see [store-listing-assets.md](../docs/store-submission/store-listing-assets.md))
- [ ] Store listing copy reviewed:
  - [ ] [Google Play copy](../docs/store-submission/store-listing-copy/google-play.en.md) (March 15, 2026 launch date featured)
  - [ ] [iOS App Store copy](../docs/store-submission/store-listing-copy/ios-app-store.en.md) (March 15, 2026 launch date featured)

### Android Specific

- [ ] Keystore configured (environment variables or `android/keystore.properties`)
- [ ] Keystore file backed up securely
- [ ] ProGuard/R8 enabled for code shrinking (if needed)
- [ ] App tested on multiple Android devices/emulators

### iOS Specific

- [ ] Apple Developer account active (paid membership)
- [ ] App ID created with bundle identifier `com.x39matrix.app`
- [ ] Distribution certificate installed in Xcode
- [ ] App Store provisioning profile installed
- [ ] App tested on multiple iOS devices/simulators

---

## 🔨 Build Checklist

### Android

- [ ] Run `npm run release:android`
- [ ] Verify signed AAB output: `android/app/build/outputs/bundle/release/app-release.aab`
- [ ] Check AAB file size (should be reasonable, typically < 50 MB)
- [ ] Test AAB installation on physical device (via internal testing track)

### iOS

- [ ] Run `npm run release:ios`
- [ ] Verify archive created successfully in Xcode Organizer
- [ ] Export IPA for App Store Connect
- [ ] Verify IPA file size (should be reasonable, typically < 100 MB)

---

## 📤 Upload Checklist

### Google Play Console

#### App Bundle Upload

- [ ] Navigate to **Production** → **Create new release**
- [ ] Upload `app-release.aab`
- [ ] Add release notes from [release-notes.en.md](./release-notes.en.md)
- [ ] Review and save

#### Store Listing

- [ ] **App icon**: Upload `app-icon.dim_1024x1024.png`
- [ ] **Adaptive icon background**: Upload `android-adaptive-background.dim_1024x1024.png`
- [ ] **Adaptive icon foreground**: Upload `android-adaptive-foreground.dim_1024x1024.png`
- [ ] **Feature graphic**: Upload `play-feature-graphic.dim_1024x500.png`
- [ ] **Screenshots**: Upload all three screenshots (`appstore-screenshot-1/2/3.dim_1290x2796.png`)
- [ ] **Short description**: Copy from [google-play.en.md](../docs/store-submission/store-listing-copy/google-play.en.md)
- [ ] **Full description**: Copy from [google-play.en.md](../docs/store-submission/store-listing-copy/google-play.en.md)
- [ ] **App category**: Finance
- [ ] **Tags**: Add relevant tags (e.g., cryptocurrency, blockchain, staking)

#### Content Rating

- [ ] Complete content rating questionnaire
- [ ] Submit for rating
- [ ] Verify rating received

#### Privacy & Policy

- [ ] Privacy policy URL provided
- [ ] Data safety section completed
- [ ] Permissions justified (if any)

#### Pricing & Distribution

- [ ] Price set to **Free**
- [ ] Countries/regions selected
- [ ] Content guidelines reviewed and accepted

### Apple App Store Connect

#### Build Upload

- [ ] Upload IPA via Xcode Organizer or Transporter app
- [ ] Wait for build processing (10-30 minutes)
- [ ] Verify build appears in App Store Connect

#### App Information

- [ ] **App name**: X39 Matrix
- [ ] **Subtitle**: Copy from [ios-app-store.en.md](../docs/store-submission/store-listing-copy/ios-app-store.en.md)
- [ ] **Primary language**: English (U.S.)
- [ ] **Category**: Finance
- [ ] **App icon**: Upload `app-icon.dim_1024x1024.png`

#### Version Information

- [ ] Select uploaded build
- [ ] **What's New**: Copy from [release-notes.en.md](./release-notes.en.md)
- [ ] **Promotional text**: Copy from [ios-app-store.en.md](../docs/store-submission/store-listing-copy/ios-app-store.en.md)
- [ ] **Description**: Copy from [ios-app-store.en.md](../docs/store-submission/store-listing-copy/ios-app-store.en.md)
- [ ] **Keywords**: Copy from [ios-app-store.en.md](../docs/store-submission/store-listing-copy/ios-app-store.en.md)
- [ ] **Screenshots (6.7" Display)**: Upload all three screenshots (`appstore-screenshot-1/2/3.dim_1290x2796.png`)

#### App Privacy

- [ ] Complete privacy questionnaire
- [ ] Privacy policy URL provided
- [ ] Data collection practices disclosed

#### Pricing & Availability

- [ ] Price set to **Free**
- [ ] Availability territories selected

#### App Review Information

- [ ] Contact information provided
- [ ] Demo account credentials (if needed)
- [ ] Notes for reviewer (if needed)

---

## ✅ Pre-Submission Review

### Both Platforms

- [ ] All required fields completed
- [ ] All assets uploaded and displaying correctly
- [ ] Store listing copy proofread for typos
- [ ] Privacy policy accessible and up-to-date
- [ ] App tested thoroughly on target devices
- [ ] No placeholder or test content in production build

### Android Specific

- [ ] Content rating received
- [ ] Data safety section accurate
- [ ] All Google Play policies reviewed and complied with

### iOS Specific

- [ ] Export compliance answered (if applicable)
- [ ] App Review Information complete
- [ ] All App Store Review Guidelines reviewed and complied with

---

## 🚀 Submission

### Google Play

- [ ] Click **Review release**
- [ ] Verify all information is correct
- [ ] Click **Start rollout to Production**
- [ ] Record submission date in [release-status-tracker.md](./release-status-tracker.md)

### Apple App Store

- [ ] Click **Submit for Review**
- [ ] Verify all information is correct
- [ ] Confirm submission
- [ ] Record submission date in [release-status-tracker.md](./release-status-tracker.md)

---

## 📊 Post-Submission

### Both Platforms

- [ ] Monitor review status daily
- [ ] Update [release-status-tracker.md](./release-status-tracker.md) when status changes
- [ ] Respond promptly to any reviewer questions or rejection reasons
- [ ] Once approved, update distribution URLs in `frontend/src/config/distribution.ts`:
  - [ ] `androidPlayStoreUrl`
  - [ ] `iosAppStoreUrl`
  - [ ] Set `apkFallbackEnabled: false`
- [ ] Test store links work correctly
- [ ] Announce release to users

---

## 📚 Reference Documents

- **[Go-Live Runbook: March 15, 2026](../docs/release/go-live-runbook-2026-03-15.en.md)** - Complete launch sequence with cutover, verification, and rollback procedures
- **[Launch Verification Checklist](../docs/release/launch-verification-checklist.en.md)** - Post-cutover verification steps
- **[Release Handoff Document](../docs/store-submission/release-handoff.en.md)** - One-page overview with asset inventory
- **[Global Availability Readiness Checklist](../docs/release/global-availability-readiness-checklist.md)** - Worldwide deployment verification
- **[Domain Strategy & Hardening Guide](../docs/release/domain-strategy-and-hardening.en.md)** - Canonical domain (x39matrix.org) strategy and redirect implementation
- [Android Google Play Submission Guide](../docs/store-submission/android-google-play.md)
- [iOS App Store Submission Guide](../docs/store-submission/ios-app-store.md)
- [Store Listing Assets Mapping](../docs/store-submission/store-listing-assets.md)
- [Google Play Listing Copy](../docs/store-submission/store-listing-copy/google-play.en.md)
- [iOS App Store Listing Copy](../docs/store-submission/store-listing-copy/ios-app-store.en.md)
- [Release Notes](./release-notes.en.md)

---

**Document Version**: 1.1  
**Last Updated**: February 3, 2026  
**Public Launch Date**: March 15, 2026
