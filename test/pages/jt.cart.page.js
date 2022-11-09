const PageActions = require("./page.actions");

class CartPage extends PageActions {
  itemName(item) {
    return $(`//td[normalize-space()="${item}"]`);
  }

  itemQty(itemIndex) {
    return $(`(//input[@name="quantity"])[${itemIndex}]`);
  }

  itemPrice(itemIndex) {
    return $(`tbody tr:nth-child(${itemIndex}) td:nth-child(2)`);
  }

  subTotal(itemIndex) {
    return $(`tbody tr:nth-child(${itemIndex}) td:nth-child(4)`);
  }

  get total() {
    return $("//strong[@class='total ng-binding']");
  }

  open() {
    return super.open("#/cart");
  }
}

module.exports = new CartPage();
