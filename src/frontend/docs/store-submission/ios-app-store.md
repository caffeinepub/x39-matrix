# iOS App Store Submission Guide

This guide provides step-by-step instructions for building and submitting the X39 Matrix app to Apple App Store Connect.

## Prerequisites

Before building the iOS release archive, ensure you have:

1. **macOS** with latest stable version
2. **Xcode** (latest stable version from Mac App Store)
3. **Apple Developer Account** (paid membership required)
4. **Node.js** and **pnpm** installed
5. **Provisioning Profile** and **Distribution Certificate** configured

## Apple Developer Setup

### Step 1: Create App ID

1. Go to [Apple Developer Portal](https://developer.apple.com/account)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Create a new **App ID** with bundle identifier: `com.x39matrix.app`
4. Enable required capabilities (e.g., Push Notifications, In-App Purchase if needed)

### Step 2: Create Distribution Certificate

1. In Xcode, go to **Preferences** → **Accounts**
2. Add your Apple Developer account
3. Select your team and click **Manage Certificates**
4. Create a new **Apple Distribution** certificate
5. Download and install the certificate

### Step 3: Create Provisioning Profile

1. In Apple Developer Portal, go to **Profiles**
2. Create a new **App Store** provisioning profile
3. Select your App ID and Distribution Certificate
4. Download the provisioning profile
5. Double-click to install in Xcode

## iOS Build Configuration

### Bundle Identifier

The iOS bundle identifier must match your App ID:

