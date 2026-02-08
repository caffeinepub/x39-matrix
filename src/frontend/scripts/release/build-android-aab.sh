#!/bin/bash

# X39 Matrix - Android Release AAB Build Script
# This script builds a signed production Android App Bundle (.aab) for Google Play Store submission

set -e  # Exit on error

echo "=========================================="
echo "X39 Matrix - Android Release Build"
echo "=========================================="
echo ""

# Check if we're in the frontend directory
if [ ! -d "android" ]; then
    echo "❌ Error: android/ directory not found"
    echo "Please run this script from the frontend/ directory"
    exit 1
fi

# Check for keystore configuration
if [ -z "$KEYSTORE_FILE" ] && [ ! -f "android/keystore.properties" ]; then
    echo "❌ Error: Keystore not configured"
    echo ""
    echo "Please set keystore environment variables:"
    echo "  export KEYSTORE_FILE=\"/path/to/x39matrix-release.keystore\""
    echo "  export KEYSTORE_PASSWORD=\"your_keystore_password\""
    echo "  export KEY_ALIAS=\"x39matrix\""
    echo "  export KEY_PASSWORD=\"your_key_password\""
    echo ""
    echo "Or create android/keystore.properties with:"
    echo "  storeFile=/path/to/x39matrix-release.keystore"
    echo "  storePassword=your_keystore_password"
    echo "  keyAlias=x39matrix"
    echo "  keyPassword=your_key_password"
    echo ""
    exit 1
fi

# Verify keystore file exists
if [ -n "$KEYSTORE_FILE" ] && [ ! -f "$KEYSTORE_FILE" ]; then
    echo "❌ Error: Keystore file not found: $KEYSTORE_FILE"
    exit 1
fi

echo "✅ Keystore configuration verified"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean
cd ..
echo ""

# Build release AAB
echo "🔨 Building signed release AAB..."
cd android
./gradlew bundleRelease
cd ..
echo ""

# Verify output
AAB_PATH="android/app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_PATH" ]; then
    echo "=========================================="
    echo "✅ Build successful!"
    echo "=========================================="
    echo ""
    echo "📦 Signed AAB location:"
    echo "   $AAB_PATH"
    echo ""
    echo "📊 File size:"
    ls -lh "$AAB_PATH" | awk '{print "   " $5}'
    echo ""
    echo "📋 Next steps:"
    echo "   1. Upload AAB to Google Play Console"
    echo "   2. Add release notes from frontend/release/release-notes.en.md"
    echo "   3. Upload assets from frontend/public/assets/generated/"
    echo "   4. Submit for review"
    echo "   5. Update frontend/release/release-status-tracker.md"
    echo ""
else
    echo "❌ Error: AAB file not found at expected location"
    echo "   Expected: $AAB_PATH"
    exit 1
fi
