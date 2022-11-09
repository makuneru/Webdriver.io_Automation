const allure = require("@wdio/allure-reporter").default;
const homePage = require("../pages/jt.home.page");
const contactPage = require("../pages/jt.contact.page");
const chance = require("chance").Chance();

describe("TC 1 - Contact Page Fields Test", async () => {
  const FIRSTNAME = chance.first();
  const EMAIL = chance.email();
  const MESSAGE = chance.sentence();
  it("Verify error message and validate errors are gone in contact page", async () => {
    allure.addStep("Open home page");
    await homePage.open();

    allure.addStep("Go to contact page");
    await homePage.click(homePage.btnContactPage);

    allure.addStep("Click on submit button");
    await contactPage.click(contactPage.btnSubmit);

    allure.addStep("Verify error messages");
    await expect(contactPage.errForenameRequired).toBeExisting();
    await expect(contactPage.errEmailRequired).toBeExisting();
    await expect(contactPage.errMessageRequired).toBeExisting();

    allure.addStep("Verify error messages for invalid email");
    await contactPage.enterText(contactPage.txtEmail, "a");
    await expect(contactPage.errInvalidEmail).toBeExisting();

    allure.addStep("Populate Mandatory Fields");
    await contactPage.enterText(contactPage.txtFirstname, FIRSTNAME);
    await contactPage.enterText(contactPage.txtEmail, EMAIL);
    await contactPage.enterText(contactPage.txaMessage, MESSAGE);

    allure.addStep("Validate errors are gone");
    await expect(contactPage.errForenameRequired).not.toBeExisting();
    await expect(contactPage.errEmailRequired).not.toBeExisting();
    await expect(contactPage.errMessageRequired).not.toBeExisting();
  });
});
