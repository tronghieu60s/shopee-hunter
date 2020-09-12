const fs = require("fs");
const { userDataDir } = require('./common/puppeteer');
const loginExists = fs.existsSync(userDataDir);

const addCart = require('./puppeteer/add-cart');
const login = require('./puppeteer/login');
const data = require('./data.json');

if (loginExists) addCart(data)
else login();