const puppeteer = require("puppeteer");
const { headless, userDataDir } = require("../common/puppeteer");

module.exports = async (data) => {
  const browser = await puppeteer.launch({
    headless,
    userDataDir,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  const { variation, url } = data;
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

  await browser.close();
};
