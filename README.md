# ACR Membership Registration Test

Automated test script for ACR (American College of Radiology) membership registration using Playwright.

## Features

✅ Automated form filling with test credentials  
✅ Smart dropdown selection (country, state, specialty, etc.)  
✅ Radio button handling with intelligent selection  
✅ Checkbox auto-detection and selection  
✅ Date field handling (birth dates, etc.)  
✅ Screenshot capture before and after submission  
✅ Detailed console logging for debugging  

## Test Credentials

- **Email**: test212121@mailinator.com
- **Password**: Ashishmann27!

## Installation

```bash
# Clone the repository
git clone https://github.com/AMannACR/acr-playwright-test.git
cd acr-playwright-test

# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

## Usage

### Option 1: Run Standalone Script (Recommended)

```bash
node acr-test.js
```

### Option 2: Run with Playwright Test Runner

```bash
# Run in headed mode (browser visible)
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# Run in headless mode
npm run test
```

## What the Script Does

1. **Navigates** to https://www.acr.org/
2. **Finds** the membership/join link automatically
3. **Fills** all form fields:
   - Email: test212121@mailinator.com
   - Password: Ashishmann27!
   - First Name: Ashish
   - Last Name: Mann
   - Phone: 5551234567
4. **Handles** all dropdowns with smart selection:
   - Country → United States
   - State → California
   - Title → Dr.
   - Gender → Male
   - Other dropdowns → First available option
5. **Selects** radio buttons (first option per group)
6. **Checks** all required checkboxes (terms, policies, etc.)
7. **Fills** date fields (birth date set to 30 years ago)
8. **Takes** screenshot before submission
9. **Submits** the form
10. **Takes** screenshot after submission
11. **Verifies** success/error messages

## Screenshots

The script generates the following screenshots:

- `form-filled.png` - Form state before submission
- `result.png` - Page state after submission
- `error.png` - Error state (if test fails)

## Troubleshooting

### Browser doesn't open
```bash
npx playwright install chromium
```

### Test fails to find elements
- Check if the ACR website structure has changed
- Review screenshots to see what's on the page
- Adjust selectors in the script if needed

### Permission errors
```bash
chmod +x acr-test.js
```

## Project Structure

```
acr-playwright-test/
├── acr-test.js           # Main standalone test script
├── package.json          # Dependencies and scripts
├── playwright.config.js  # Playwright configuration
├── README.md            # This file
└── tests/               # Test files directory (optional)
```

## Requirements

- Node.js 16 or higher
- Playwright 1.40.0 or higher

## License

MIT

## Author

Ashish Mann (mannashish45@gmail.com)
