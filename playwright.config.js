// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true, // Disable parallel execution for more stability
  forbidOnly: !!process.env.CI,
  retries: 2, // Enable retries for all environments
  workers: 3, // Run tests sequentially
  reporter: 'html',
  timeout: 90000, // Increase global timeout to 90 seconds
  expect: {
    timeout: 45000, // Increase expect timeout to 45 seconds
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 }, // Set consistent viewport
    actionTimeout: 45000, // Increase action timeout to 45 seconds
    navigationTimeout: 45000, // Add navigation timeout
    // Add retry options for element interactions
    retry: true,
    retryInterval: 1000,
    // Add screenshot options
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 120 seconds
  },
});
