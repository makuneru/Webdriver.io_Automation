const allure = require("@wdio/allure-reporter").default;
const homePage = require("../pages/jt.home.page");
const contactPage = require("../pages/jt.contact.page");
const chance = require("chance").Chance();

describe("TC 2 - Contact Page Feedback Submission Test", async () => {
  const FIRSTNAME = chance.first();
  const EMAIL = chance.email();
  const MESSAGE = chance.sentence();
  const MAXFRUNS = 5;
  for (let runCount = 1; runCount <= MAXFRUNS; runCount++) {
    it(`Validate successful feedback submission - runCount = ${runCount}`, async () => {
      allure.addStep("Open home page");
      await homePage.open();

      allure.addStep("Go to contact page");
      await homePage.click(homePage.btnContactPage);

      allure.addStep("Populate Mandatory Fields");
      await contactPage.enterText(contactPage.txtFirstname, FIRSTNAME);
      await contactPage.enterText(contactPage.txtEmail, EMAIL);
      await contactPage.enterText(contactPage.txaMessage, MESSAGE);

      allure.addStep("Click on submit button");
      await contactPage.click(contactPage.btnSubmit);

      allure.addStep("Validate successful submission message");
      await contactPage.alertSuccess.waitForExist({
        timeout: 60000,
        timeoutMsg: "Successful feedback is expected to show",
      });
      await expect(contactPage.alertSuccess).toBeExisting();
    });
  }
});
