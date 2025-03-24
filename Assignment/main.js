const Wallet = require("./Wallet"); 
const Customer = require("./Customer"); 

// Usage:
let myWallet = new Wallet(50); 
let myCustomer = new Customer("John", "Doe", myWallet);

let payment = 2.0;
let theWallet = myCustomer.getWallet();

if (theWallet.getTotalMoney() >= payment) {
  theWallet.subtractMoney(payment);
  console.log("Payment successful.");
} else {
  console.log("Insufficient funds, come back later.");
}
