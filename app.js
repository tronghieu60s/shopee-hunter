const fs = require("fs");
const addCart = require('./puppeteer/add-cart');
const login = require('./puppeteer/login');
const { userDataDir } = require('./common/puppeteer');
const loginExists = fs.existsSync(userDataDir);

if (loginExists) {
  console.log('exist');
  // addCart();
} else login()