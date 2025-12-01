// ACR Membership Registration Test - Standalone Script
// Website: https://www.acr.org/
// Test Credentials:
// Email: test212121@mailinator.com
// Password: Ashishmann27!
// Run with: node acr-test.js

const { chromium } = require('playwright');

(async () => {
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
    console.log('🚀 Starting ACR Membership Registration Test...');
    
    // Navigate to ACR website
    console.log('\nStep 1: Navigating to ACR website...');
    await page.goto('https://www.acr.org/', { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });
    await page.waitForTimeout(2000);

    // Find membership link
    console.log('\nStep 2: Looking for membership link...');
    const patterns = ['Join', 'Become a Member', 'Membership', 'Register', 'Sign Up'];
    
    let found = false;
    for (const pattern of patterns) {
      try {
        const link = page.getByRole('link', { name: new RegExp(pattern, 'i') }).first();
        if (await link.isVisible({ timeout: 2000 })) {
          console.log(`✅ Found link: ${pattern}`);
          await link.click();
          found = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!found) {
      console.log('Trying href patterns...');
      const hrefPatterns = ['join', 'member', 'register', 'signup'];
      for (const pattern of hrefPatterns) {
        try {
          const link = page.locator(`a[href*="${pattern}"]`).first();
          if (await link.isVisible({ timeout: 2000 })) {
            console.log(`✅ Found link with href: ${pattern}`);
            await link.click();
            found = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }
    }

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    console.log('\nStep 3: Filling form fields...');
    console.log('Current URL:', page.url());

    // Fill email
    console.log('\n📧 Email field...');
    const emailSelectors = ['input[type="email"]', 'input[name*="email" i]', 'input[id*="email" i]'];
    for (const selector of emailSelectors) {
      try {
        const field = page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 })) {
          await field.fill('test212121@mailinator.com');
          console.log('✅ Email entered: test212121@mailinator.com');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill password
    console.log('\n🔒 Password field...');
    const passwordSelectors = [
      'input[type="password"]:not([name*="confirm" i]):not([id*="confirm" i])',
      'input[name*="password" i]:not([name*="confirm" i])'
    ];
    for (const selector of passwordSelectors) {
      try {
        const field = page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 })) {
          await field.fill('Ashishmann27!');
          console.log('✅ Password entered');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill confirm password
    console.log('\n🔒 Confirm password field...');
    const confirmSelectors = [
      'input[name*="confirm" i][type="password"]',
      'input[id*="confirm" i][type="password"]'
    ];
    for (const selector of confirmSelectors) {
      try {
        const field = page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 })) {
          await field.fill('Ashishmann27!');
          console.log('✅ Confirm password entered');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill first name
    console.log('\n👤 First name field...');
    const firstNameSelectors = [
      'input[name*="first" i]:not([type="password"])',
      'input[id*="first" i]:not([type="password"])'
    ];
    for (const selector of firstNameSelectors) {
      try {
        const field = page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 })) {
          await field.fill('Ashish');
          console.log('✅ First name entered: Ashish');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill last name
    console.log('\n👤 Last name field...');
    const lastNameSelectors = [
      'input[name*="last" i]:not([type="password"])',
      'input[id*="last" i]:not([type="password"])'
    ];
    for (const selector of lastNameSelectors) {
      try {
        const field = page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 })) {
          await field.fill('Mann');
          console.log('✅ Last name entered: Mann');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Fill phone
    console.log('\n📱 Phone field...');
    const phoneSelectors = ['input[type="tel"]', 'input[name*="phone" i]', 'input[id*="phone" i]'];
    for (const selector of phoneSelectors) {
      try {
        const field = page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 })) {
          await field.fill('5551234567');
          console.log('✅ Phone entered: 5551234567');
          break;
        }
      } catch (e) {
        continue;
      }
    }

    // Handle all dropdowns
    console.log('\n📋 Step 4: Handling dropdowns...');
    const selects = await page.locator('select').all();
    console.log(`Found ${selects.length} dropdown(s)`);
    
    for (let i = 0; i < selects.length; i++) {
      try {
        const select = selects[i];
        if (await select.isVisible({ timeout: 1000 })) {
          const name = await select.getAttribute('name') || await select.getAttribute('id') || `dropdown-${i}`;
          const options = await select.locator('option').all();
          
          console.log(`  Processing: ${name} (${options.length} options)`);
          
          const nameLower = name.toLowerCase();
          let selectedValue = null;
          
          // Smart selection
          if (nameLower.includes('country')) {
            try {
              const usOption = await select.locator('option').filter({ hasText: /united states/i }).first();
              selectedValue = await usOption.getAttribute('value');
              console.log('  → Selecting: United States');
            } catch (e) {
              selectedValue = await options[1]?.getAttribute('value');
            }
          } else if (nameLower.includes('state')) {
            try {
              const caOption = await select.locator('option').filter({ hasText: /california/i }).first();
              selectedValue = await caOption.getAttribute('value');
              console.log('  → Selecting: California');
            } catch (e) {
              selectedValue = await options[1]?.getAttribute('value');
            }
          } else if (nameLower.includes('title') || nameLower.includes('prefix')) {
            try {
              const drOption = await select.locator('option').filter({ hasText: /dr/i }).first();
              selectedValue = await drOption.getAttribute('value');
              console.log('  → Selecting: Dr.');
            } catch (e) {
              selectedValue = await options[1]?.getAttribute('value');
            }
          } else if (nameLower.includes('gender')) {
            try {
              const maleOption = await select.locator('option').filter({ hasText: /^male$/i }).first();
              selectedValue = await maleOption.getAttribute('value');
              console.log('  → Selecting: Male');
            } catch (e) {
              selectedValue = await options[1]?.getAttribute('value');
            }
          } else {
            // Default: first non-empty option
            for (const option of options) {
              const val = await option.getAttribute('value');
              if (val && val !== '') {
                selectedValue = val;
                break;
              }
            }
            console.log('  → Selecting first available option');
          }
          
          if (selectedValue) {
            await select.selectOption(selectedValue);
            console.log(`  ✅ Selected: ${selectedValue}`);
          }
        }
      } catch (e) {
        console.log(`  ⚠️ Error with dropdown ${i}: ${e.message}`);
      }
    }

    // Handle all radio buttons
    console.log('\n🔘 Step 5: Handling radio buttons...');
    const radioGroups = new Map();
    const radios = await page.locator('input[type="radio"]').all();
    console.log(`Found ${radios.length} radio button(s)`);
    
    for (const radio of radios) {
      try {
        if (await radio.isVisible({ timeout: 1000 })) {
          const name = await radio.getAttribute('name');
          const value = await radio.getAttribute('value');
          
          if (name) {
            if (!radioGroups.has(name)) {
              radioGroups.set(name, []);
            }
            radioGroups.get(name).push({ radio, value });
          }
        }
      } catch (e) {
        continue;
      }
    }
    
    console.log(`Found ${radioGroups.size} radio group(s)`);
    
    for (const [groupName, radios] of radioGroups) {
      try {
        console.log(`  Group: ${groupName} (${radios.length} options)`);
        
        const nameLower = groupName.toLowerCase();
        let selectedRadio = null;
        
        if (nameLower.includes('gender')) {
          selectedRadio = radios.find(r => 
            r.value?.toLowerCase() === 'male' || r.value?.toLowerCase() === 'm'
          ) || radios[0];
          console.log('  → Selecting: Male');
        } else if (nameLower.includes('agree') || nameLower.includes('terms')) {
          selectedRadio = radios.find(r => 
            r.value?.toLowerCase() === 'yes' || r.value === '1'
          ) || radios[0];
          console.log('  → Selecting: Yes/Agree');
        } else {
          selectedRadio = radios[0];
          console.log('  → Selecting first option');
        }
        
        if (selectedRadio) {
          await selectedRadio.radio.check();
          console.log(`  ✅ Selected: ${selectedRadio.value}`);
        }
      } catch (e) {
        console.log(`  ⚠️ Error with radio group ${groupName}: ${e.message}`);
      }
    }

    // Handle all checkboxes
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
          
          if (nameLower.includes('terms') || nameLower.includes('agree') || 
              nameLower.includes('policy') || nameLower.includes('accept')) {
            if (!isChecked) {
              await checkbox.check();
              console.log(`  ✅ Checked: ${name}`);
            }
          } else if (nameLower.includes('newsletter')) {
            if (!isChecked) {
              await checkbox.check();
              console.log(`  ✅ Checked (optional): ${name}`);
            }
          }
        }
      } catch (e) {
        console.log(`  ⚠️ Error with checkbox ${i}: ${e.message}`);
      }
    }

    // Handle date fields
    console.log('\n📅 Step 7: Handling date fields...');
    const dateInputs = await page.locator('input[type="date"]').all();
    console.log(`Found ${dateInputs.length} date field(s)`);
    
    for (let i = 0; i < dateInputs.length; i++) {
      try {
        const dateInput = dateInputs[i];
        if (await dateInput.isVisible({ timeout: 1000 })) {
          const name = await dateInput.getAttribute('name') || `date-${i}`;
          const nameLower = name.toLowerCase();
          
          let dateValue;
          if (nameLower.includes('birth') || nameLower.includes('dob')) {
            const birthDate = new Date();
            birthDate.setFullYear(birthDate.getFullYear() - 30);
            dateValue = birthDate.toISOString().split('T')[0];
            console.log(`  → Birth date: ${dateValue}`);
          } else {
            dateValue = new Date().toISOString().split('T')[0];
            console.log(`  → Date: ${dateValue}`);
          }
          
          await dateInput.fill(dateValue);
          console.log(`  ✅ Date set: ${name}`);
        }
      } catch (e) {
        console.log(`  ⚠️ Error with date field ${i}: ${e.message}`);
      }
    }

    // Screenshot before submit
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'form-filled.png', fullPage: true });
    console.log('\n📸 Screenshot saved: form-filled.png');

    // Submit form
    console.log('\n🚀 Step 8: Submitting form...');
    const submitTexts = ['Submit', 'Register', 'Join', 'Sign Up', 'Continue', 'Next'];
    
    let submitClicked = false;
    for (const text of submitTexts) {
      try {
        const button = page.getByRole('button', { name: new RegExp(text, 'i') }).first();
        if (await button.isVisible({ timeout: 2000 })) {
          await button.click();
          console.log(`✅ Clicked: ${text}`);
          submitClicked = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!submitClicked) {
      console.log('⚠️ Submit button not found');
    }

    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Screenshot after submit
    await page.screenshot({ path: 'result.png', fullPage: true });
    console.log('📸 Screenshot saved: result.png');

    // Check result
    console.log('\n🔍 Step 9: Checking result...');
    const pageText = await page.textContent('body');
    
    if (pageText.toLowerCase().includes('success') || 
        pageText.toLowerCase().includes('welcome') ||
        pageText.toLowerCase().includes('thank you')) {
      console.log('✅ Registration appears successful!');
    } else if (pageText.toLowerCase().includes('error') || 
               pageText.toLowerCase().includes('invalid')) {
      console.log('❌ Registration may have failed');
    } else {
      console.log('⚠️ Status unclear - check screenshots');
    }

    console.log('\nFinal URL:', page.url());
    console.log('\n🎉 Test completed!');
    
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.error(error.stack);
    await page.screenshot({ path: 'error.png', fullPage: true });
    console.log('📸 Error screenshot saved: error.png');
  } finally {
    console.log('\n⏳ Closing browser in 5 seconds...');
    await page.waitForTimeout(5000);
    await browser.close();
    console.log('✅ Browser closed. Test execution complete.');
  }
})();
