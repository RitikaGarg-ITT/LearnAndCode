class Wallet {
  constructor(value = 0) {
    this.value = value;
  }

  getTotalMoney() {
    return this.value;
  }

  setTotalMoney(newValue) {
    this.value = newValue;
  }

  addMoney(deposit) {
    this.value += deposit;
  }

  subtractMoney(debit) {
    this.value -= debit;
  }
}

module.exports = Wallet; 
