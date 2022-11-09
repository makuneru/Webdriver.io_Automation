const allure = require("@wdio/allure-reporter").default;
const homePage = require("../pages/jt.home.page");
const cartPage = require("../pages/jt.cart.page");
const shopPage = require("../pages/jt.shop.page");

describe("TC 3 - Cart Page ", async () => {
  it("Verify cart page functions (subtotal, price and total)", async () => {
    allure.addStep("Go to shop page");
    await shopPage.open();

    allure.addStep("Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear");
    const itemsToBuy = [
      { item: "Stuffed Frog", qty: 2 },
      { item: "Fluffy Bunny", qty: 5 },
      { item: "Valentine Bear", qty: 3 },
    ];
    for (let itemIndex = 0; itemIndex < itemsToBuy.length; itemIndex++) {
      await shopPage.click(shopPage.productItem(itemsToBuy[itemIndex].item));
    }

    allure.addStep("Go to cart page");
    await shopPage.click(homePage.btnCartPage);
    for (let itemIndex = 0; itemIndex < itemsToBuy.length; itemIndex++) {
      await expect(cartPage.itemName(itemsToBuy[itemIndex].item)).toBeExisting();
      await cartPage.enterText(cartPage.itemQty(itemIndex + 1), itemsToBuy[itemIndex].qty);
    }

    allure.addStep("Verify the subtotal for each product is correct");
    allure.addStep("Verify the price for each product");
    const expectedPrice = ["$10.99", "$9.99", "$14.99"];
    const expectedSubtotal = ["$21.98", "$49.95", "$44.97"];
    for (let itemIndex = 0; itemIndex < itemsToBuy.length; itemIndex++) {
      const itemPrice = await cartPage.itemPrice(itemIndex + 1).getText();
      const subTotal = await cartPage.subTotal(itemIndex + 1).getText();
      expect(itemPrice).toEqual(expectedPrice[itemIndex]);
      expect(subTotal).toEqual(expectedSubtotal[itemIndex]);
    }

    allure.addStep("Verify that total = sum(sub totals)");
    //Verify total by getting the total text
    await expect(await cartPage.total.getText()).toContain("Total: 116.9");

    //Verify total by getting the sum of all subtotal
    let sumSubTotal = [],
      total = 0;
    for (let itemIndex = 0; itemIndex < itemsToBuy.length; itemIndex++) {
      const subTotal = await cartPage.subTotal(itemIndex + 1).getText();
      sumSubTotal.push(parseFloat(subTotal.replace("$", "")));
    }
    for (let index in sumSubTotal) total += sumSubTotal[index];
    expect(total).toEqual(116.9);
  });
});
