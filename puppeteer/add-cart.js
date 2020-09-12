const puppeteer = require("puppeteer");
const { headless, userDataDir } = require("../common/puppeteer");

module.exports = async () => {
  const browser = await puppeteer.launch({
    headless,
    userDataDir,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://shopee.vn/B%C3%BAp-b%C3%AA-model-m%E1%BA%AFt-g%E1%BA%AFn-3d-i.21102682.7010837033"
  );

  const productVariations = await page.evaluate(() => {
    let products = document.querySelectorAll(
      ".product-variation:not(.product-variation--disabled)"
    );
    products = [...products];
    const productsArrText = products.map((product) => product.innerText);
    return productsArrText;
  });

  const selectProductVariation = productVariations[0];
  await page.evaluate((selectProductVariation) => {
    let products = document.querySelectorAll(".product-variation");
    products.forEach((product) => {
      if (product.innerHTML === selectProductVariation) product.click();
    });
  }, selectProductVariation);

  await page.waitForSelector(".btn.btn-tinted.btn--l.YtgjXY._3a6p6c");
  await page.click(".btn.btn-tinted.btn--l.YtgjXY._3a6p6c");

  //   await browser.close();
};
