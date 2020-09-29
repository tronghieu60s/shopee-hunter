const handleAddCart = async (page, product) => {
  const { variations, url } = product;
  await page.goto(url, { waitUntil: "networkidle0" });

  if (variations && Array(variations).length !== 0) {
    await page.waitForSelector(".product-variation");
    await page.evaluate((variations) => {
      const products = document.querySelectorAll(".product-variation");
      products.forEach((product) => {
        variations.forEach((element) => {
          console.log(element);
          if (product.innerText === element) product.click();
        });
      });
    }, variations);
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
};
