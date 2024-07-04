const puppeteer = require("puppeteer");

const defaultOptions = {
  format: "A4",
  printBackground: true,
};

const puppeteerPdf = async (html, options = defaultOptions) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.waitForNetworkIdle("networkidle");
    // await page.waitForSelector('img');
    const pdfBuffer = await page.pdf(options);
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.log("error in puppeteerPdf module", error);
  }
};

module.exports = {
  puppeteerPdf,
};
