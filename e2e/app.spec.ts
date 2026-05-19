import { test, expect } from '@playwright/test';

test('has title and can navigate to shop', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Avant-Garde/);

  // Click the browse shop link (which is usually present on the landing page)
  // Look for a link that has "Shop" or "Discover" depending on the homepage content.
  const shopLink = page.getByRole('link', { name: /shop|discover/i }).first();
  if (await shopLink.isVisible()) {
    await shopLink.click();
    await expect(page).toHaveURL(/.*shop/);
  }
});
