// ACR Membership Registration Test Script - Enhanced Playwright Version
// Website: https://www.acr.org/
// Test Credentials:
// Email: test212121@mailinator.com
// Password: Ashishmann27!

const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  try {
    console.log('🚀 Starting ACR Membership Registration Test with Playwright...');

    // Navigate to ACR website
    console.log('Step 1: Navigating to ACR website...');
    await page.goto('https://www.acr.org/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    await page.waitForTimeout(2000);

    // Look for "Join" or "Become a Member" link
    console.log('Step 2: Looking for membership/join link...');
    
    let membershipLinkFound = false;
    const textPatterns = ['Join', 'Become a Member', 'Membership', 'Register', 'Sign Up'];
    
    for (const pattern of textPatterns) {
      try {
        const link = page.getByRole('link', { name: new RegExp(pattern, 'i') }).first();
        if (await link.isVisible({ timeout: 2000 })) {
          console.log(`✅ Found membership link with text: ${pattern}`);
          await link.click();
          membershipLinkFound = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!membershipLinkFound) {
      const hrefPatterns = ['join', 'member', 'register', 'signup'];
      for (const pattern of hrefPatterns) {
        try {
          const link = page.locator(`a[href*="${pattern}"]`).first();
          if (await link.isVisible({ timeout: 2000 })) {
            console.log(`✅ Found membership link with href pattern: ${pattern}`);
            await link.click();
            membershipLinkFound = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }
    }

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('\n📝 Step 3: Filling registration form...');
    console.log('Current URL:', page.url());

    // ==================== TEXT INPUTS ====================
    
    // Fill email field
    console.log('\n📧 Looking for email field...');
    const emailSelectors = [
      'input[type="email"]',
      'input[name*="email" i]',
      'input[id*="email" i]',
      '#email',
      '#Email',
      '[placeholder*="email" i]'
    ];

    for (const selector of emailSelectors) {
      try {
        const emailField = page.locator(selector).first();
        if (await emailField.isVisible({ timeout: 2000 })) {
          await emailField.fill('test212121@mailinator.com');
          console.log('✅ Email entered: test212121@mailinator.com');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill password field
    console.log('\n🔒 Looking for password field...');
    const passwordSelectors = [
      'input[type="password"]',
      'input[name*="password" i]:not([name*="confirm" i])',
      'input[id*="password" i]:not([id*="confirm" i])',
      '#password',
      '#Password'
    ];

    for (const selector of passwordSelectors) {
      try {
        const passwordField = page.locator(selector).first();
        if (await passwordField.isVisible({ timeout: 2000 })) {
          await passwordField.fill('Ashishmann27!');
          console.log('✅ Password entered');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill confirm password
    console.log('\n🔒 Looking for confirm password field...');
    const confirmPasswordSelectors = [
      'input[name*="confirm" i][type="password"]',
      'input[id*="confirm" i][type="password"]',
      'input[name*="password2" i]',
      'input[placeholder*="confirm" i][type="password"]'
    ];

    for (const selector of confirmPasswordSelectors) {
      try {
        const confirmField = page.locator(selector).first();
        if (await confirmField.isVisible({ timeout: 2000 })) {
          await confirmField.fill('Ashishmann27!');
          console.log('✅ Confirm password entered');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill first name
    console.log('\n👤 Looking for first name field...');
    const firstNameSelectors = [
      'input[name*="first" i]:not([type="password"])',
      'input[id*="first" i]:not([type="password"])',
      '#firstName',
      '[placeholder*="first name" i]'
    ];

    for (const selector of firstNameSelectors) {
      try {
        const firstNameField = page.locator(selector).first();
        if (await firstNameField.isVisible({ timeout: 2000 })) {
          await firstNameField.fill('Ashish');
          console.log('✅ First name entered: Ashish');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill last name
    console.log('\n👤 Looking for last name field...');
    const lastNameSelectors = [
      'input[name*="last" i]:not([type="password"])',
      'input[id*="last" i]:not([type="password"])',
      '#lastName',
      '[placeholder*="last name" i]'
    ];

    for (const selector of lastNameSelectors) {
      try {
        const lastNameField = page.locator(selector).first();
        if (await lastNameField.isVisible({ timeout: 2000 })) {
          await lastNameField.fill('Mann');
          console.log('✅ Last name entered: Mann');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill phone number
    console.log('\n📱 Looking for phone number field...');
    const phoneSelectors = [
      'input[type="tel"]',
      'input[name*="phone" i]',
      'input[id*="phone" i]',
      'input[name*="mobile" i]',
      '[placeholder*="phone" i]'
    ];

    for (const selector of phoneSelectors) {
      try {
        const phoneField = page.locator(selector).first();
        if (await phoneField.isVisible({ timeout: 2000 })) {
          await phoneField.fill('5551234567');
          console.log('✅ Phone number entered: 5551234567');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // ==================== DROPDOWNS / SELECT ELEMENTS ====================
    
    console.log('\n📋 Step 4: Handling dropdown fields...');
    
    // Find all select dropdowns
    const selectElements = await page.locator('select').all();
    console.log(`Found ${selectElements.length} dropdown(s)`);

    for (let i = 0; i < selectElements.length; i++) {
      try {
        const select = selectElements[i];
        if (await select.isVisible({ timeout: 1000 })) {
          const name = await select.getAttribute('name') || await select.getAttribute('id') || `dropdown-${i}`;
          const options = await select.locator('option').all();
          
          console.log(`\n  Dropdown: ${name} (${options.length} options)`);
          
          // Get all option values and texts
          const optionData = [];
          for (const option of options) {
            const value = await option.getAttribute('value');
            const text = await option.textContent();
            optionData.push({ value, text: text.trim() });
          }
          
          // Smart selection logic based on dropdown name/id
          let selectedValue = null;
          const nameLower = name.toLowerCase();
          
          // Country selection
          if (nameLower.includes('country')) {
            const usOption = optionData.find(opt => 
              opt.text.toLowerCase().includes('united states') || 
              opt.value === 'US' || 
              opt.value === 'USA'
            );
            selectedValue = usOption ? usOption.value : optionData[1]?.value;
            console.log(`  → Selecting country: ${usOption?.text || 'First available option'}`);
          }
          // State selection
          else if (nameLower.includes('state') || nameLower.includes('province')) {
            const caOption = optionData.find(opt => 
              opt.text.toLowerCase().includes('california') || 
              opt.value === 'CA'
            );
            selectedValue = caOption ? caOption.value : optionData[1]?.value;
            console.log(`  → Selecting state: ${caOption?.text || 'First available option'}`);
          }
          // Title/Prefix selection (Dr., Mr., Ms., etc.)
          else if (nameLower.includes('title') || nameLower.includes('prefix')) {
            const drOption = optionData.find(opt => 
              opt.text.toLowerCase().includes('dr') || 
              opt.text.toLowerCase().includes('doctor')
            );
            selectedValue = drOption ? drOption.value : optionData[1]?.value;
            console.log(`  → Selecting title: ${drOption?.text || 'First available option'}`);
          }
          // Specialty/Profession selection
          else if (nameLower.includes('specialty') || nameLower.includes('profession')) {
            const radiologyOption = optionData.find(opt => 
              opt.text.toLowerCase().includes('radiology') ||
              opt.text.toLowerCase().includes('radiologist')
            );
            selectedValue = radiologyOption ? radiologyOption.value : optionData[1]?.value;
            console.log(`  → Selecting specialty: ${radiologyOption?.text || 'First available option'}`);
          }
          // Membership type
          else if (nameLower.includes('membership') || nameLower.includes('type')) {
            const individualOption = optionData.find(opt => 
              opt.text.toLowerCase().includes('individual') ||
              opt.text.toLowerCase().includes('regular')
            );
            selectedValue = individualOption ? individualOption.value : optionData[1]?.value;
            console.log(`  → Selecting membership: ${individualOption?.text || 'First available option'}`);
          }
          // Gender selection
          else if (nameLower.includes('gender') || nameLower.includes('sex')) {
            const maleOption = optionData.find(opt => 
              opt.text.toLowerCase().includes('male') && !opt.text.toLowerCase().includes('female')
            );
            selectedValue = maleOption ? maleOption.value : optionData[1]?.value;
            console.log(`  → Selecting gender: ${maleOption?.text || 'First available option'}`);
          }
          // Year selection
          else if (nameLower.includes('year')) {
            const currentYear = new Date().getFullYear();
            const yearOption = optionData.find(opt => opt.value == currentYear);
            selectedValue = yearOption ? yearOption.value : optionData[1]?.value;
            console.log(`  → Selecting year: ${yearOption?.text || 'First available option'}`);
          }
          // Month selection
          else if (nameLower.includes('month')) {
            const currentMonth = new Date().getMonth() + 1;
            const monthOption = optionData.find(opt => opt.value == currentMonth);
            selectedValue = monthOption ? monthOption.value : optionData[1]?.value;
            console.log(`  → Selecting month: ${monthOption?.text || 'First available option'}`);
          }
          // Day selection
          else if (nameLower.includes('day')) {
            const dayOption = optionData.find(opt => opt.value == '15');
            selectedValue = dayOption ? dayOption.value : optionData[1]?.value;
            console.log(`  → Selecting day: ${dayOption?.text || 'First available option'}`);
          }
          // Default: select first non-empty option
          else {
            selectedValue = optionData.find(opt => opt.value && opt.value !== '')?.value || optionData[1]?.value;
            console.log(`  → Selecting first available option`);
          }
          
          if (selectedValue) {
            await select.selectOption(selectedValue);
            console.log(`  ✅ Selected value: ${selectedValue}`);
          }
        }
      } catch (e) {
        console.log(`  ⚠️ Error handling dropdown ${i}: ${e.message}`);
      }
    }

    // ==================== RADIO BUTTONS ====================
    
    console.log('\n🔘 Step 5: Handling radio buttons...');
    
    // Find all radio button groups
    const radioButtons = await page.locator('input[type="radio"]').all();
    console.log(`Found ${radioButtons.length} radio button(s)`);
    
    // Group radio buttons by name
    const radioGroups = new Map();
    
    for (const radio of radioButtons) {
      try {
        if (await radio.isVisible({ timeout: 1000 })) {
          const name = await radio.getAttribute('name');
          const value = await radio.getAttribute('value');
          const id = await radio.getAttribute('id');
          
          if (name) {
            if (!radioGroups.has(name)) {
              radioGroups.set(name, []);
            }
            radioGroups.get(name).push({ radio, value, id });
          }
        }
      } catch (e) {
        continue;
      }
    }
    
    console.log(`Found ${radioGroups.size} radio button group(s)`);
    
    // Select appropriate radio button for each group
    for (const [groupName, radios] of radioGroups) {
      try {
        console.log(`\n  Radio Group: ${groupName} (${radios.length} options)`);
        
        const nameLower = groupName.toLowerCase();
        let selectedRadio = null;
        
        // Smart selection based on group name
        if (nameLower.includes('gender') || nameLower.includes('sex')) {
          selectedRadio = radios.find(r => 
            r.value?.toLowerCase().includes('male') && !r.value?.toLowerCase().includes('female')
          ) || radios.find(r => r.value?.toLowerCase().includes('m'));
          console.log(`  → Selecting gender: Male`);
        }
        else if (nameLower.includes('agree') || nameLower.includes('terms') || nameLower.includes('accept')) {
          selectedRadio = radios.find(r => 
            r.value?.toLowerCase().includes('yes') || 
            r.value?.toLowerCase().includes('agree') ||
            r.value === '1' ||
            r.value === 'true'
          );
          console.log(`  → Selecting: Yes/Agree`);
        }
        else if (nameLower.includes('member') || nameLower.includes('type')) {
          selectedRadio = radios.find(r => 
            r.value?.toLowerCase().includes('individual') ||
            r.value?.toLowerCase().includes('regular') ||
            r.value?.toLowerCase().includes('new')
          );
          console.log(`  → Selecting membership type: Individual/Regular`);
        }
        else if (nameLower.includes('contact') || nameLower.includes('prefer')) {
          selectedRadio = radios.find(r => 
            r.value?.toLowerCase().includes('email')
          );
          console.log(`  → Selecting contact preference: Email`);
        }
        // Default: select first radio button
        else {
          selectedRadio = radios[0];
          console.log(`  → Selecting first option`);
        }
        
        if (selectedRadio) {
          await selectedRadio.radio.check();
          console.log(`  ✅ Selected radio button: ${selectedRadio.value || selectedRadio.id}`);
        }
      } catch (e) {
        console.log(`  ⚠️ Error handling radio group ${groupName}: ${e.message}`);
      }
    }

    // ==================== CHECKBOXES ====================
    
    console.log('\n☑️  Step 6: Handling checkboxes...');
    const checkboxes = await page.locator('input[type="checkbox"]').all();
    console.log(`Found ${checkboxes.length} checkbox(es)`);
    
    for (let i = 0; i < checkboxes.length; i++) {
      try {
        const checkbox = checkboxes[i];
        if (await checkbox.isVisible({ timeout: 1000 })) {
          const name = await checkbox.getAttribute('name') || await checkbox.getAttribute('id') || `checkbox-${i}`;
          const isChecked = await checkbox.isChecked();
          
          const nameLower = name.toLowerCase();
          
          // Check boxes that are typically required
          if (nameLower.includes('terms') || 
              nameLower.includes('agree') || 
              nameLower.includes('accept') ||
              nameLower.includes('policy') ||
              nameLower.includes('consent') ||
              nameLower.includes('confirm')) {
            if (!isChecked) {
              await checkbox.check();
              console.log(`  ✅ Checked: ${name}`);
            }
          }
          // Optional checkboxes - check them too for complete registration
          else if (nameLower.includes('newsletter') || 
                   nameLower.includes('update') ||
                   nameLower.includes('notification')) {
            if (!isChecked) {
              await checkbox.check();
              console.log(`  ✅ Checked (optional): ${name}`);
            }
          }
        }
      } catch (e) {
        console.log(`  ⚠️ Error handling checkbox ${i}: ${e.message}`);
      }
    }

    // ==================== DATE PICKERS / CALENDARS ====================
    
    console.log('\n📅 Step 7: Handling date/calendar fields...');
    
    // Strategy 1: Regular date input fields
    const dateInputs = await page.locator('input[type="date"]').all();
    console.log(`Found ${dateInputs.length} date input field(s)`);
    
    for (let i = 0; i < dateInputs.length; i++) {
      try {
        const dateInput = dateInputs[i];
        if (await dateInput.isVisible({ timeout: 1000 })) {
          const name = await dateInput.getAttribute('name') || await dateInput.getAttribute('id') || `date-${i}`;
          const nameLower = name.toLowerCase();
          
          let dateValue;
          
          // Birth date - set to 30 years ago
          if (nameLower.includes('birth') || nameLower.includes('dob')) {
            const birthDate = new Date();
            birthDate.setFullYear(birthDate.getFullYear() - 30);
            dateValue = birthDate.toISOString().split('T')[0];
            console.log(`  → Setting birth date: ${dateValue}`);
          }
          // Start date - set to today
          else if (nameLower.includes('start')) {
            dateValue = new Date().toISOString().split('T')[0];
            console.log(`  → Setting start date: ${dateValue}`);
          }
          // Default - set to today
          else {
            dateValue = new Date().toISOString().split('T')[0];
            console.log(`  → Setting date: ${dateValue}`);
          }
          
          await dateInput.fill(dateValue);
          console.log(`  ✅ Date set for ${name}: ${dateValue}`);
        }
      } catch (e) {
        console.log(`  ⚠️ Error handling date input ${i}: ${e.message}`);
      }
    }
    
    // Strategy 2: Text inputs that might be date fields
    const textInputsForDates = await page.locator('input[type="text"][placeholder*="date" i], input[type="text"][placeholder*="mm/dd/yyyy" i], input[type="text"][placeholder*="dd/mm/yyyy" i]').all();
    
    for (const dateField of textInputsForDates) {
      try {
        if (await dateField.isVisible({ timeout: 1000 })) {
          const placeholder = await dateField.getAttribute('placeholder') || '';
          
          // Determine date format from placeholder
          let dateValue;
          if (placeholder.toLowerCase().includes('mm/dd/yyyy')) {
            dateValue = '01/15/1994'; // MM/DD/YYYY format
          } else if (placeholder.toLowerCase().includes('dd/mm/yyyy')) {
            dateValue = '15/01/1994'; // DD/MM/YYYY format
          } else {
            dateValue = '01/15/1994'; // Default to MM/DD/YYYY
          }
          
          await dateField.fill(dateValue);
          console.log(`  ✅ Date filled: ${dateValue}`);
        }
      } catch (e) {
        continue;
      }
    }
    
    // Strategy 3: Custom date picker widgets (click and select)
    const datePickerButtons = await page.locator('button[class*="date" i], div[class*="datepicker" i], input[class*="datepicker" i]').all();
    
    for (const picker of datePickerButtons) {
      try {
        if (await picker.isVisible({ timeout: 1000 })) {
          await picker.click();
          await page.waitForTimeout(500);
          
          // Try to select a date from the calendar popup
          const todayButton = page.locator('button:has-text("Today"), button:has-text("15"), td[class*="today" i]').first();
          if (await todayButton.isVisible({ timeout: 2000 })) {
            await todayButton.click();
            console.log(`  ✅ Date selected from calendar picker`);
          }
        }
      } catch (e) {
        continue;
      }
    }

    // ==================== SCREENSHOTS ====================
    
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'acr-registration-form-complete.png', fullPage: true });
    console.log('\n📸 Screenshot saved: acr-registration-form-complete.png');

    // ==================== FORM SUBMISSION ====================
    
    console.log('\n🚀 Step 8: Submitting registration form...');
    
    let submitClicked = false;
    const buttonTexts = ['Submit', 'Register', 'Join', 'Sign Up', 'Create Account', 'Continue', 'Next'];
    
    for (const text of buttonTexts) {
      try {
        const button = page.getByRole('button', { name: new RegExp(text, 'i') }).first();
        if (await button.isVisible({ timeout: 2000 })) {
          console.log(`✅ Found submit button: ${text}`);
          await button.click();
          submitClicked = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!submitClicked) {
      const submitSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button[name*="submit" i]'
      ];

      for (const selector of submitSelectors) {
        try {
          const button = page.locator(selector).first();
          if (await button.isVisible({ timeout: 2000 })) {
            await button.click();
            submitClicked = true;
            console.log(`✅ Submit button clicked`);
            break;
          }
        } catch (e) {
          continue;
        }
      }
    }

    if (!submitClicked) {
      console.log('⚠️ Submit button not found. Form may need manual submission.');
    }

    // Wait for response
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Take screenshot after submission
    await page.screenshot({ path: 'acr-registration-result.png', fullPage: true });
    console.log('📸 Screenshot saved: acr-registration-result.png');

    // Check for success/error messages
    console.log('\n🔍 Step 9: Checking registration result...');
    const pageText = await page.textContent('body');
    
    if (pageText.toLowerCase().includes('success') || 
        pageText.toLowerCase().includes('welcome') ||
        pageText.toLowerCase().includes('thank you') ||
        pageText.toLowerCase().includes('confirmation')) {
      console.log('✅ Registration appears successful!');
    } else if (pageText.toLowerCase().includes('error') || 
               pageText.toLowerCase().includes('invalid') ||
               pageText.toLowerCase().includes('failed')) {
      console.log('❌ Registration may have failed. Check screenshots for details.');
    } else {
      console.log('⚠️ Registration status unclear. Check screenshots for details.');
    }

    console.log('\nFinal URL:', page.url());
    console.log('\n🎉 Test completed successfully!');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.error(error.stack);
    await page.screenshot({ path: 'acr-error.png', fullPage: true });
    console.log('📸 Error screenshot saved: acr-error.png');
  } finally {
    console.log('\n⏳ Keeping browser open for 10 seconds for review...');
    await page.waitForTimeout(10000);
    await browser.close();
    console.log('✅ Browser closed. Test execution complete.');
  }
})();
