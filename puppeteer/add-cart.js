const puppeteer = require("puppeteer");
const { headless, userDataDir } = require("../common/puppeteer");

const handleAddCart = async (page, product) => {
  const { variation, url } = product;
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
};

module.exports = async (data) => {
  const browser = await puppeteer.launch({
    headless,
    userDataDir,
    defaultViewport: null,
  });

  for (let i = 0; i < data.length - 1; i++) await browser.newPage();

  let pages = await browser.pages();

  Promise.all([
    handleAddCart(pages[0], data[0]),
    handleAddCart(pages[1], data[1]),
    handleAddCart(pages[2], data[2])
  ]);
};
