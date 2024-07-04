const { puppeteerPdf } = require("../utils/puppeteer");

const pdfConverterController = async (req, res) => {
  try {
    const { html, options } = req.body;
    if (!html) {
      return res.status(400).json({
        message:
          "Request body should contain html property with key name as html",
      });
    }
    const pdf = await puppeteerPdf(html);
    if (!pdf) {
      return res.status(400).json({ message: "Unable to generate PDF" });
    }
    res.contentType("application/pdf");
    res.status(200).send(pdf);
  } catch (error) {
    console.log("error in pdfConverterController", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  pdfConverterController,
};
