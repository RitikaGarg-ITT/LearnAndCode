const Wallet = require("./Wallet"); 

class Customer {
  constructor(firstName, lastName, myWallet) {
    if (!(myWallet instanceof Wallet)) {
      throw new Error("The wallet must be an instance of Wallet.");
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.myWallet = myWallet;
  }


  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getWallet() {
    return this.myWallet;
  }
}

module.exports = Customer; 
