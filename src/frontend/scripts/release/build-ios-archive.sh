#!/bin/bash

# X39 Matrix - iOS Release Archive Build Script
# This script builds a signed iOS archive suitable for App Store Connect distribution

set -e  # Exit on error

echo "=========================================="
echo "X39 Matrix - iOS Release Build"
echo "=========================================="
echo ""

# Check if we're on macOS
if [ "$(uname)" != "Darwin" ]; then
    echo "❌ Error: iOS builds require macOS"
    exit 1
fi

# Check if we're in the frontend directory
if [ ! -d "ios" ]; then
    echo "❌ Error: ios/ directory not found"
    echo "Please run this script from the frontend/ directory"
    exit 1
fi

# Check if Xcode is installed
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ Error: Xcode not found"
    echo "Please install Xcode from the Mac App Store"
    exit 1
fi

echo "✅ Environment verified"
echo ""

# Check for workspace
WORKSPACE="ios/X39Matrix.xcworkspace"
if [ ! -d "$WORKSPACE" ]; then
    echo "❌ Error: Xcode workspace not found: $WORKSPACE"
    exit 1
fi

echo "📱 Bundle Identifier: com.x39matrix.app"
echo ""

# Clean previous builds
echo "🧹 Cleaning previous builds..."
xcodebuild clean -workspace "$WORKSPACE" -scheme X39Matrix -configuration Release
echo ""

# Build archive
echo "🔨 Building signed release archive..."
echo "This may take several minutes..."
echo ""

ARCHIVE_PATH="$HOME/Library/Developer/Xcode/Archives/$(date +%Y-%m-%d)/X39Matrix.xcarchive"

xcodebuild archive \
    -workspace "$WORKSPACE" \
    -scheme X39Matrix \
    -configuration Release \
    -archivePath "$ARCHIVE_PATH" \
    -destination "generic/platform=iOS" \
    CODE_SIGN_STYLE=Manual \
    DEVELOPMENT_TEAM="YOUR_TEAM_ID" \
    PROVISIONING_PROFILE_SPECIFIER="X39 Matrix App Store"

echo ""

# Verify archive
if [ -d "$ARCHIVE_PATH" ]; then
    echo "=========================================="
    echo "✅ Archive successful!"
    echo "=========================================="
    echo ""
    echo "📦 Archive location:"
    echo "   $ARCHIVE_PATH"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Xcode Organizer will open automatically"
    echo "   2. Select your archive and click 'Distribute App'"
    echo "   3. Choose 'App Store Connect' → 'Upload'"
    echo "   4. Select your distribution certificate and provisioning profile"
    echo "   5. Review and upload"
    echo ""
    echo "   Alternative: Export IPA and upload via Transporter app"
    echo ""
    echo "   After upload:"
    echo "   - Add release notes from frontend/release/release-notes.en.md"
    echo "   - Upload assets from frontend/public/assets/generated/"
    echo "   - Submit for review"
    echo "   - Update frontend/release/release-status-tracker.md"
    echo ""
    
    # Open Xcode Organizer
    open -a Xcode "$ARCHIVE_PATH"
else
    echo "❌ Error: Archive not found at expected location"
    echo "   Expected: $ARCHIVE_PATH"
    exit 1
fi
