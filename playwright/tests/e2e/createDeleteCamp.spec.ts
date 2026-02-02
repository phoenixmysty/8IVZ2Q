import { test, expect } from '@playwright/test';

test('Successful Campaign creation and deletion', async ({ page }) => {
  // Access the environment variables
  const userEmail = process.env.USER_EMAIL;
  const userPass = process.env.USER_PASS;

    // Ensure variables are defined
  if (!userEmail || !userPass) {
    throw new Error('USER_EMAIL and USER_PASS environment variables must be set.');
  }
  
  await page.goto('https://app.delivra.net');
  // Log in page loads
  await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  //Successful login
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(userEmail);
  await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(userPass);
  await page.getByRole('button', { name: 'Sign In' }).click();
  // Verify that user sees their dashboard.
  await expect(page.getByRole('heading', { name: /Good/ })).toBeVisible();
  // Navigate to Campaigns page
  await page.goto('https://app.delivra.net/Campaigns');
  await page.getByRole('button', { name: 'Create Campaign' }).click();
  await expect(page.getByRole('heading', { name: 'Create New Campaign' })).toBeVisible();
  // Enter in Campaign Name
  await page.getByRole('treeitem', { name: 'Campaign Details ' }).getByRole('textbox').click();
  await page.getByRole('treeitem', { name: 'Campaign Details ' }).getByRole('textbox').fill('Liz Campaign');
  // Select a template
  await page.getByText('Stock Templates').click();
  await page.locator('input[name="25fc46b0-1a89-4dae-b84f-2ae3e13ff423"]').check();
  // Set Email Subject line
  await page.getByTitle('Subject Line').getByRole('textbox').click();
  await page.getByTitle('Subject Line').getByRole('textbox').fill('Testing');
  // Move to Design tab of wizard
  await page.getByRole('button', { name: 'Save and Next' }).click();
  //Verify that we move to the Design tab and the header changed to the correct name
  await expect(page.getByText('Create New CampaignLiz')).toBeVisible();

  //TODO:
  // Dragging and dropping the text field
  // Dragging and dropping the image field
  // Navigate to the Preview tab
  // Verify that the image is properly being displayed

  // Save and exit by pressing "Exit"
  await page.getByRole('button', { name: 'Exit' }).click();

  //TODO
  // Delete the campaign

  //Verify campaign was deleted
  //await expect(page.getByText('Liz Campaign')).toBeHidden();

  // Issues noticed and will need to clean up:
  // 1. Complete TODOs
  // 2. Two campaigns are being created when there should be only one.
});
