#!/bin/bash

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out build deploy

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ -d ".next" ] && [ -d "out" ]; then
    echo "✅ Build successful! Creating deployment directory..."
    
    # Create a clean deployment directory
    mkdir -p deploy
    
    # Copy all static files from out to deploy directory
    cp -r out/* deploy/
    
    # Also copy build artifacts that might be needed
    cp -r .next/static deploy/_next/ 2>/dev/null || mkdir -p deploy/_next && cp -r .next/static deploy/_next/ 2>/dev/null || true
    
    echo "✅ Deployment directory created: deploy/"
    ls -la deploy/ | head -10
    
    echo "✅ Deployment ready! Use 'deploy' directory for static hosting."
    echo "📁 Static files are in: deploy/"
    
    # Create a symlink for platforms that expect .next
    ln -sf deploy .next-deploy
    echo "🔗 Symlink created: .next-deploy -> deploy"
else
    echo "❌ Build failed! Output directories not found."
    exit 1
fi

echo "🚀 Ready for deployment!" 