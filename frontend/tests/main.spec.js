const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:7777/');
  console.log(page.innerText);
  const name = await page.innerText('.Header__Logo-sc-2cpreo-0');
  expect(name).toBe('Cooking Comically DB');
});