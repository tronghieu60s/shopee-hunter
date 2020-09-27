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

  await page.waitForSelector(".shopee-modal__content");
  await page.waitForSelector(".stardust-radio:not(._137jG8)");
  await page.evaluate(() => {
    const stardustSelect = ".stardust-radio:not(._137jG8)";
    const stardusts = document.querySelectorAll(stardustSelect);
    stardusts.forEach((stardust) => {
        const stardustPrice = stardust.childNodes[1].childNodes[0].childNodes[0].childNodes[1];
        console.log(stardustPrice);
    });
  });
};
