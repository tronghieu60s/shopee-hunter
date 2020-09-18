const shippingUnit = require("./shipping-unit");

const handleAddCart = async (page, product) => {
  const { variation, url } = product;
  await page.goto(url, { waitUntil: "networkidle0" });

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

module.exports = async (browser, products) => {
  const arrNewPage = [];
  for (let i = 0; i < products.length - 1; i++)
    arrNewPage.push(browser.newPage());
  await Promise.all(arrNewPage);

  const pages = await browser.pages();
  const arrAddProducts = [];
  for (let i = 0; i < pages.length; i++)
    arrAddProducts.push(handleAddCart(pages[i], products[i]));
  await Promise.all(arrAddProducts);

  const page = await browser.newPage();
  await page.goto("https://shopee.vn/cart/", { waitUntil: "networkidle0" });
  await page.click(".cart-page-footer__product-count.clear-btn-style");

  await page.waitFor(1000);
  await Promise.all([
    page.click(".shopee-button-solid.shopee-button-solid--primary"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
};
