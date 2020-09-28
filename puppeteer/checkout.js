module.exports = async (browser) => {
  const page = await browser.newPage();
  await page.goto("https://shopee.vn/cart/");

  await page.waitForSelector(
    ".cart-page-footer__product-count.clear-btn-style"
  );
  await page.click(".cart-page-footer__product-count.clear-btn-style");

  await page.waitForSelector(
    ".shopee-button-solid.shopee-button-solid--primary"
  );
  await Promise.all([
    page.click(".shopee-button-solid.shopee-button-solid--primary"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
};
