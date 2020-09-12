require("dotenv").config();
const puppeteer = require("puppeteer");
const readlineSync = require("readline-sync");
const { headless, userDataDir } = require("../common/puppeteer");

const username = process.env.SHOPEE_USERNAME;
const password = process.env.SHOPEE_PASSWORD;

module.exports = async () => {
  console.log("Wait a little. Loading...");
  const browser = await puppeteer.launch({ headless, userDataDir });
  const page = await browser.newPage();
  await page.goto("https://shopee.vn/buyer/login");

  await page.waitForSelector("._56AraZ[name='loginKey']");

  await page.focus("._56AraZ[name='loginKey']");
  await page.keyboard.type(username);

  await page.focus("._56AraZ[name='password']");
  await page.keyboard.type(password);

  await page.waitFor(1000);
  await page.click("._35rr5y._32qX4k._1ShBrl._3z3XZ9._2iOIqx._2h_2_Y");

  // Input Private Key
  const privateCode = readlineSync.question("Type Your Code: ");
  console.log("Loading...");
  for (let i = 0; i < privateCode.length; i++) {
    await page.waitFor(500);
    await page.keyboard.type(privateCode[i]);
  }
  await page.waitFor(1000);
  await page.click("._35rr5y._32qX4k._1ShBrl._3z3XZ9.pukiJQ._2iOIqx._2h_2_Y");

  await page.waitForSelector(".navbar__username");

  await browser.close();
}