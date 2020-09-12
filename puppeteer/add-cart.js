const puppeteer = require("puppeteer");
const { headless, userDataDir } = require("../common/puppeteer");

module.exports = async (data) => {
  if (data.length === 0) return console.log("Empty Item.");
  if (data.length > 20) return console.log("Maximum Item.");

  const browser = await puppeteer.launch({
    headless,
    userDataDir,
    defaultViewport: null
  });

  for (let i = 0; i < data.length; i++) {
    const page = await browser.newPage();
    const { variation, url } = data[i];
    await page.goto(url);

    if (variation) {
      await page.waitForSelector(".product-variation");
      await page.evaluate((variation) => {
        let products = document.querySelectorAll(".product-variation");
        products.forEach((product) => {
          if (product.innerText === variation) product.click();
        });
      }, variation);
    }

    await page.waitForSelector(".btn.btn-tinted.btn--l.YtgjXY._3a6p6c");
    await page.click(".btn.btn-tinted.btn--l.YtgjXY._3a6p6c");

    await page.close();
  }

  const page = await browser.newPage();
  await page.goto("https://shopee.vn/cart/");

  await page.waitForSelector(".cart-page-footer__product-count.clear-btn-style");
  await page.click(".cart-page-footer__product-count.clear-btn-style");

  await page.waitFor(1000);
  await page.click(".shopee-button-solid.shopee-button-solid--primary");

  // await browser.close();
};
