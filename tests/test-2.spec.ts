import { test, expect } from '@playwright/test';

test('passing test', async ({ page }) => {
  await page.goto('https://www.google.ca/');
  await expect(page).toHaveTitle('Google');
});

// test('failing test', async ({ page }) => {
//   await page.goto('https://www.google.ca/');
//   await expect(page).toHaveTitle('Googlde');
// });