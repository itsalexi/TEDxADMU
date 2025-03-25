const { test, expect } = require('@playwright/test');

// Helper functions to generate random user data
function generateRandomFirstName() {
  const firstNames = [
    'Isabella',
    'Alexander',
    'Sophia',
    'Miguel',
    'Gabriela',
    'Rafael',
    'Victoria',
    'Daniel',
    'Camila',
    'Adrian',
    'Valentina',
    'Lucas',
    'Maria',
    'Diego',
    'Andrea',
    'Sebastian',
    'Ana',
    'Jose',
    'Carolina',
    'Luis',
    'Patricia',
    'Antonio',
    'Elena',
    'Carlos',
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function generateRandomLastName() {
  const lastNames = [
    'Santos',
    'Reyes',
    'Cruz',
    'Garcia',
    'Torres',
    'Rodriguez',
    'Ramos',
    'Aquino',
    'Mendoza',
    'Rivera',
    'Gonzalez',
    'Fernandez',
    'Lopez',
    'Martinez',
    'Perez',
    'De Guzman',
    'Tan',
    'Lim',
    'Castillo',
    'Del Rosario',
    'Ramirez',
    'Morales',
    'Navarro',
    'Villanueva',
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generateRandomEmail(firstName, lastName) {
  const domains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'proton.me',
    'icloud.com',
  ];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
}

function generateRandomAteneoEmail(firstName, lastName) {
  const randomNum = Math.floor(Math.random() * 999) + 1;
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@student.ateneo.edu`;
}

function generateRandomPhone() {
  const prefixes = [
    '0917',
    '0918',
    '0919',
    '0920',
    '0921',
    '0927',
    '0928',
    '0929',
    '0939',
    '0947',
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 9000000) + 1000000;
  return `+63${prefix.substring(1)}${suffix}`;
}

function generateRandomAge() {
  return Math.floor(Math.random() * (35 - 18) + 18).toString();
}

function generateRandomOccupation() {
  const occupations = [
    'Software Engineer',
    'Marketing Manager',
    'Financial Analyst',
    'Graphic Designer',
    'Data Scientist',
    'Product Manager',
    'Business Analyst',
    'Content Writer',
    'UX Designer',
    'HR Specialist',
    'Digital Marketing Specialist',
    'Research Assistant',
  ];
  return occupations[Math.floor(Math.random() * occupations.length)];
}

function generateRandomUser(isAtenean = false) {
  const firstName = generateRandomFirstName();
  const lastName = generateRandomLastName();
  return {
    firstName,
    lastName,
    email: isAtenean
      ? generateRandomAteneoEmail(firstName, lastName)
      : generateRandomEmail(firstName, lastName),
    phone: generateRandomPhone(),
    age: generateRandomAge(),
    occupation: isAtenean ? 'Student' : generateRandomOccupation(),
  };
}

test.describe('Registration Process', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the registration page before each test
    await page.goto('http://localhost:3000/register');
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('should complete registration process for a regular user', async ({
    page,
  }) => {
    // Step 1: Discount Eligibility
    await expect(page).toHaveTitle(/TEDxAteneoDeManilaU/);
    await expect(
      page.getByRole('heading', { name: 'Discount Eligibility' })
    ).toBeVisible();

    // Select outsider (no discount)
    await page.getByRole('radio', { name: 'Outsider' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Basic Information
    await expect(page.getByText('Tell us about yourself')).toBeVisible();

    // Fill in basic information with random data
    const user = generateRandomUser();
    await page.getByLabel('First Name').fill(user.firstName);
    await page.getByLabel('Last Name').fill(user.lastName);
    await page.getByLabel('Email Address').fill(user.email);
    await page.getByLabel('Phone Number').fill(user.phone);
    await page.getByLabel('Age').fill(user.age);
    await page.getByLabel('Occupation').fill(user.occupation);

    // Answer previous attendance
    await page.getByRole('radio', { name: 'No' }).click();

    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Personality & Engagement
    await expect(
      page.getByText('Share your thoughts and perspectives')
    ).toBeVisible();

    // Fill in personality information with a topic related to their occupation
    await page
      .getByLabel(
        'If you could give a TED Talk on any topic, what would it be and why?'
      )
      .fill(`The Future of ${user.occupation}: Innovations and Challenges`);

    // Commit to participation
    await page
      .getByRole('radio', { name: "Yes, I'm excited to engage!" })
      .click();

    await page.getByRole('button', { name: 'Next' }).click();

    // Step 4: Checkout
    await expect(page.getByText('Complete your registration')).toBeVisible();

    // Select individual registration
    await page.getByRole('radio', { name: 'Individual Registration' }).click();

    // Accept terms
    await page
      .getByLabel(
        'I understand that TEDx AteneodeManilaU requires a registration fee and agree to proceed with my application.'
      )
      .click();

    // Submit the form
    await page.getByRole('button', { name: 'Submit Application' }).click();

    // Wait for success message with a longer timeout
    await expect(
      page.getByRole('heading', { name: 'Registration submitted', exact: true })
    ).toBeVisible({
      timeout: 20000,
    });
  });

  test('should complete registration process for an Atenean student', async ({
    page,
  }) => {
    // Step 1: Discount Eligibility
    await page.getByRole('radio', { name: 'Atenean' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Basic Information
    await expect(page.getByText('Tell us about yourself')).toBeVisible();

    const user = generateRandomUser(true);
    await page.getByLabel('First Name').fill(user.firstName);
    await page.getByLabel('Last Name').fill(user.lastName);
    await page.getByLabel('Email Address').fill(user.email);
    await page.getByLabel('Phone Number').fill(user.phone);
    await page.getByLabel('Age').fill(user.age);
    await page.getByLabel('Occupation').fill(user.occupation);

    // Select school and course with improved handling
    await page.waitForTimeout(1000); // Wait for any animations to complete

    const schoolTrigger = page.getByRole('combobox');
    await schoolTrigger.waitFor({ state: 'visible', timeout: 10000 });
    await schoolTrigger.click();

    await page.waitForTimeout(500); // Wait for dropdown animation

    // Try keyboard navigation first
    await page.keyboard.type('School of Science and Engineering');
    await page.keyboard.press('Enter');

    // Fallback: If keyboard navigation doesn't work, try direct click with JS evaluation
    try {
      await page.waitForTimeout(500);
      const yearInput = page.getByLabel('Year and Course');
      if (!(await yearInput.isVisible())) {
        const soseOption = page.getByRole('option', {
          name: 'School of Science and Engineering (SOSE)',
          exact: true,
        });
        await soseOption.waitFor({ state: 'visible', timeout: 10000 });
        // Force click using JavaScript
        await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          if (element) element.click();
        }, '[role="option"][data-value="SOSE"]');
      }
    } catch (error) {
      console.log('Fallback click was needed:', error.message);
    }

    await page.getByLabel('Year and Course').fill('3 BS Computer Science');

    // Answer previous attendance
    await page.getByRole('radio', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Personality & Engagement with improved waiting
    await page.waitForTimeout(1000); // Wait for page transition
    await expect(
      page.getByText('Share your thoughts and perspectives')
    ).toBeVisible();

    // Wait for and fill TED Talk question
    const tedTalkLabel = page.getByText(
      'If you could give a TED Talk on any topic, what would it be and why?'
    );
    await tedTalkLabel.waitFor({ state: 'visible', timeout: 10000 });
    const tedTalkInput = page.getByLabel(
      'If you could give a TED Talk on any topic, what would it be and why?'
    );
    await tedTalkInput.waitFor({ state: 'visible', timeout: 10000 });
    await tedTalkInput.fill('The Impact of Technology on Modern Education');

    // Commit to participation
    await page
      .getByRole('radio', { name: "Yes, I'm excited to engage!" })
      .click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 4: Checkout with improved waiting
    await page.waitForTimeout(1000); // Wait for page transition
    await expect(page.getByText('Complete your registration')).toBeVisible();

    const individualRadio = page.getByRole('radio', {
      name: 'Individual Registration',
    });
    await individualRadio.waitFor({ state: 'visible', timeout: 10000 });
    await individualRadio.click();

    const termsCheckbox = page.getByLabel(
      'I understand that TEDx AteneodeManilaU requires a registration fee and agree to proceed with my application.'
    );
    await termsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await termsCheckbox.click();

    const submitButton = page.getByRole('button', {
      name: 'Submit Application',
    });
    await submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await submitButton.click();

    // Wait for success message with increased timeout
    await expect(
      page.getByRole('heading', { name: 'Registration submitted', exact: true })
    ).toBeVisible({
      timeout: 45000,
    });
  });

  test('should handle group registration', async ({ page }) => {
    // Step 1: Discount Eligibility
    await page.getByRole('radio', { name: 'Outsider' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 2: Basic Information with improved waiting
    await page.waitForTimeout(1000); // Wait for page transition
    await expect(page.getByText('Tell us about yourself')).toBeVisible();

    const mainUser = generateRandomUser();
    await page.getByLabel('First Name').fill(mainUser.firstName);
    await page.getByLabel('Last Name').fill(mainUser.lastName);
    await page.getByLabel('Email Address').fill(mainUser.email);
    await page.getByLabel('Phone Number').fill(mainUser.phone);
    await page.getByLabel('Age').fill(mainUser.age);
    await page.getByLabel('Occupation').fill(mainUser.occupation);

    // Answer previous attendance
    await page.getByRole('radio', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 3: Personality & Engagement with improved waiting
    await page.waitForTimeout(1000); // Wait for page transition
    await expect(
      page.getByText('Share your thoughts and perspectives')
    ).toBeVisible();

    const tedTalkLabel = page.getByText(
      'If you could give a TED Talk on any topic, what would it be and why?'
    );
    await tedTalkLabel.waitFor({ state: 'visible', timeout: 10000 });
    const tedTalkInput = page.getByLabel(
      'If you could give a TED Talk on any topic, what would it be and why?'
    );
    await tedTalkInput.waitFor({ state: 'visible', timeout: 10000 });
    await tedTalkInput.fill(
      `Building Effective Teams in ${mainUser.occupation}`
    );

    // Commit to participation
    await page
      .getByRole('radio', { name: "Yes, I'm excited to engage!" })
      .click();
    await page.getByRole('button', { name: 'Next' }).click();

    // Step 4: Checkout with improved waiting
    await page.waitForTimeout(1000); // Wait for page transition
    await expect(page.getByText('Complete your registration')).toBeVisible();

    const groupRadio = page.getByRole('radio', { name: 'Group Registration' });
    await groupRadio.waitFor({ state: 'visible', timeout: 10000 });
    await groupRadio.click();

    // Add additional attendee with improved waiting
    const addButton = page.getByRole('button', { name: 'Add Attendee' });
    await addButton.waitFor({ state: 'visible', timeout: 10000 });
    await addButton.click();

    await page.waitForTimeout(1000); // Wait for form to appear

    // Generate random data for additional attendee and wait for form to be visible
    const additionalUser = generateRandomUser();
    const firstNameInput = page.locator('#attendee-1-first_name');
    await firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await firstNameInput.fill(additionalUser.firstName);

    await page.locator('#attendee-1-last_name').fill(additionalUser.lastName);
    await page.locator('#attendee-1-email').fill(additionalUser.email);
    await page.locator('#attendee-1-phone').fill(additionalUser.phone);
    await page.locator('#attendee-1-age').fill(additionalUser.age);
    await page
      .locator('#attendee-1-occupation')
      .fill(additionalUser.occupation);

    // Accept terms and submit with improved waiting
    const termsCheckbox = page.getByLabel(
      'I understand that TEDx AteneodeManilaU requires a registration fee and agree to proceed with my application.'
    );
    await termsCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await termsCheckbox.click();

    const submitButton = page.getByRole('button', {
      name: 'Submit Application',
    });
    await submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await submitButton.click();

    // Wait for success message with increased timeout
    await expect(
      page.getByRole('heading', { name: 'Registration submitted', exact: true })
    ).toBeVisible({
      timeout: 45000,
    });
  });
});
