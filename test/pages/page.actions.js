const allure = require("@wdio/allure-reporter").default;

const EXCEPTION_MESSAGE = "Exception while accessing element.";
module.exports = class PageActions {
  async click(webElement) {
    try {
      await webElement.waitForClickable();
      await webElement.click();
    } catch (e) {
      throw new Error(`${EXCEPTION_MESSAGE} ${e.message}`);
    }
  }

  async enterText(webElement, text) {
    try {
      await webElement.waitForDisplayed();
      await webElement.clearValue().then(async () => {
        await webElement.setValue(text);
      });
    } catch (e) {
      throw new Error(`${EXCEPTION_MESSAGE} ${e.message}`);
    }
  }

  open(path) {
    return browser.url(`${path}`);
  }
};
