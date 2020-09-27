const readlineSync = require("readline-sync");

module.exports = async (browser) => {
  console.log("Wait a little. Loading...");
  const page = await browser.newPage();
  await page.goto("https://shopee.vn/buyer/login", {
    waitUntil: "networkidle0",
  });

  const username = readlineSync.question("Username: ");
  const password = readlineSync.question("Password: ");

  await page.focus("._56AraZ[name='loginKey']");
  await page.keyboard.type(username);
  await page.focus("._56AraZ[name='password']");
  await page.keyboard.type(password);

  await page.waitFor(1000);
  await page.click("._35rr5y._32qX4k._1ShBrl._3z3XZ9._2iOIqx._2h_2_Y");

  // Input Private Key
  const privateCode = readlineSync.question("Type Your Code: ");
  for (let i = 0; i < privateCode.length; i++) {
    await page.waitFor(500);
    await page.keyboard.type(privateCode[i]);
  }

  await page.waitFor(1000);
  await page.click("._35rr5y._32qX4k._1ShBrl._3z3XZ9.pukiJQ._2iOIqx._2h_2_Y");

  await page.waitForSelector(".navbar__username");

  await browser.close();
};
