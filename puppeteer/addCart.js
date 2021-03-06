const handleAddCart = async (page, product) => {
  const { variations, url } = product;

  // Set Timeout
  await page.setDefaultNavigationTimeout(0); 
  // Block Font and Images Load
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (
      req.resourceType() == "font" ||
      req.resourceType() == "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url, { waitUntil: "networkidle0" });

  if (variations && variations.length !== 0) {
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
