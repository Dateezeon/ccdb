const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:7777');
  const name = await page.innerText('.bar h1');
  expect(name).toBe('Cooking Comically DB');
});