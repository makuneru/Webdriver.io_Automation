const PageActions = require("./page.actions");

class HomePage extends PageActions {
  get btnShopPage() {
    return $("//a[@href='#/shop']");
  }

  get btnContactPage() {
    return $("//a[@href='#/contact']");
  }

  get btnCartPage() {
    return $("//a[@href='#/cart']");
  }

  open() {
    return super.open("#/home");
  }
}

module.exports = new HomePage();
