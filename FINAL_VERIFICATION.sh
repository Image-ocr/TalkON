#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "  TalkON Repository - Final Verification Script"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Function to check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗${NC} $1"
        FAILED=$((FAILED + 1))
    fi
}

echo "1. Checking root package.json..."
! grep -q "react-native" package.json
check "No React Native in root package.json"

! grep -q "electron" package.json
check "No Electron in root package.json"

echo ""
echo "2. Checking web-app package.json..."
! grep -q "react-native" packages/web-app/package.json
check "No React Native in web-app package.json"

! grep -q "electron" packages/web-app/package.json
check "No Electron in web-app package.json"

grep -q '"next":' packages/web-app/package.json
check "Next.js dependency exists"

grep -q '"react":' packages/web-app/package.json
check "React dependency exists"

echo ""
echo "3. Checking vercel.json..."
grep -q '"rootDirectory": "packages/web-app"' vercel.json
check "rootDirectory points to packages/web-app"

grep -q '"framework": "nextjs"' vercel.json
check "Framework is set to nextjs"

echo ""
echo "4. Checking next.config.js..."
! grep -q "^  output:" packages/web-app/next.config.js
check "No static export mode in next.config.js"

echo ""
echo "5. Checking JSON validity..."
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" 2>/dev/null
check "Root package.json is valid JSON"

node -e "JSON.parse(require('fs').readFileSync('packages/web-app/package.json', 'utf8'))" 2>/dev/null
check "Web-app package.json is valid JSON"

node -e "JSON.parse(require('fs').readFileSync('vercel.json', 'utf8'))" 2>/dev/null
check "vercel.json is valid JSON"

echo ""
echo "6. Checking required files..."
[ -f "DEPLOYMENT.md" ]
check "DEPLOYMENT.md exists"

[ -f "VERCEL_READY.md" ]
check "VERCEL_READY.md exists"

[ -f "packages/web-app/README.md" ]
check "Web-app README.md exists"

[ -f "packages/web-app/.env.example" ]
check ".env.example exists"

[ -f "packages/web-app/public/favicon.svg" ]
check "Favicon exists"

echo ""
echo "7. Checking web-app structure..."
[ -f "packages/web-app/src/app/layout.tsx" ]
check "App layout exists"

[ -f "packages/web-app/src/app/page.tsx" ]
check "App page exists"

[ -f "packages/web-app/src/app/globals.css" ]
check "Global CSS exists"

[ -f "packages/web-app/next.config.js" ]
check "Next.js config exists"

[ -f "packages/web-app/tsconfig.json" ]
check "TypeScript config exists"

[ -f "packages/web-app/tailwind.config.js" ]
check "Tailwind config exists"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  Verification Complete"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL CHECKS PASSED!${NC}"
    echo -e "${GREEN}✓ Repository is 100% ready for Vercel deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Push changes to Git"
    echo "2. Deploy to Vercel: https://vercel.com/new"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please review the errors above.${NC}"
    exit 1
fi
