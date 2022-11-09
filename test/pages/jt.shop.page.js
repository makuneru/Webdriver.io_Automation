const PageActions = require("./page.actions");

class ShopPage extends PageActions {
  productItem(item) {
    return $(`//h4[contains(text(),"${item}")]/following::a[1]`);
  }

  open() {
    return super.open("#/shop");
  }
}

module.exports = new ShopPage();
