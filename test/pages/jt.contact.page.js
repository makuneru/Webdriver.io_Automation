const PageActions = require("./page.actions");

class ContactPage extends PageActions {
  get btnSubmit() {
    return $("//a[text()='Submit']");
  }

  get errForenameRequired() {
    return $("//span[@id='forename-err']");
  }

  get errEmailRequired() {
    return $("//span[text()='Email is required']");
  }

  get errInvalidEmail() {
    return $("//span[text()='Please enter a valid email']");
  }

  get errMessageRequired() {
    return $("//span[@id='message-err']");
  }

  get txtFirstname() {
    return $("//input[@id='forename']");
  }

  get txtSurname() {
    return $("//input[@id='forename']");
  }

  get txtEmail() {
    return $("//input[@id='email']");
  }

  get txtTelephone() {
    return $("//input[@id='telephone']");
  }

  get txaMessage() {
    return $("//textarea[@id='message']");
  }

  get alertSuccess() {
    return $("//div[@class='alert alert-success']");
  }
  open() {
    return super.open("#/contact");
  }
}

module.exports = new ContactPage();
