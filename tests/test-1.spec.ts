import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  // login with valid password
  await page.goto('http://localhost:27010/');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('echoshihab@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('Password1!');
  await page.getByPlaceholder('Password').press('Enter');
  
  // assertion - ensure we get a valid session cookie
  let pageResponse = page.waitForResponse(response => response.headerValues('set-cookie') != null)
  expect((await (await pageResponse).headerValues('set-cookie')).filter(value => value.startsWith('COSM_PatientApp_Session'))).toHaveLength(1);

  await page.locator('a.open').click();  // generated code was using the preferred name text 'Allena'
  await page.getByText('Log out').click();
  
  // assertion - logout responded with 200
  pageResponse = page.waitForResponse(response => response.request().url() == 'http://localhost:27010/account/logout');
  expect ((await pageResponse).status() == 200)

  // login without password
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('echoshihab@gmail.com');
  await page.getByRole('button', { name: 'Login' }).click();

  // assertions - password validation message is displayed correctly.
  await expect(page.getByText('Password cannot be blank')).toBeVisible();
  await expect(page.getByText('Password cannot be blank')).toHaveClass("help is-danger");
});