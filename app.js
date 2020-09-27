const fs = require("fs");
const puppeteer = require("puppeteer");
const { headless, userDataDir } = require("./common/puppeteer");
const loginExists = fs.existsSync(userDataDir);

const addCart = require("./puppeteer/addCart");
const autoLogin = require("./puppeteer/autoLogin");
const products = require("./products.json");

(async () => {
  const browser = await puppeteer.launch({
    headless,
    userDataDir,
    defaultViewport: null,
  });

  if (loginExists) {
    if (products.length === 0)
      return console.log("Not Products. Please Add New Product");
    if (products.length > 20) return console.log("Maximum Products.");
    await addCart(browser, products);
  } else autoLogin(browser);
})();
