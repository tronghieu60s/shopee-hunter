const puppeteer = require("puppeteer");
const { headless, userDataDir } = require("../common/puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless,
    userDataDir,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.goto("https://shopee.vn/cart/");

  await page.waitForSelector(
    ".cart-page-footer__product-count.clear-btn-style"
  );
  await page.click(".cart-page-footer__product-count.clear-btn-style");

  await page.waitFor(1000);
  await page.click(".shopee-button-solid.shopee-button-solid--primary");
};
