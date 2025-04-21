var ATM = /** @class */ (function () {
    function ATM() {
        this.totalCash = 5000;
        this.isServerOnline = true;
        this.accountBalance = 2000;
        this.correctPin = "1234";
        this.pinAttempts = 0;
        this.isCardBlocked = false;
        this.dailyLimit = 1000;
        this.withdrawnToday = 0;
    }
    ATM.prototype.setServerStatus = function (status) {
        this.isServerOnline = status;
    };
    ATM.prototype.resetDailyWithdrawal = function () {
        this.withdrawnToday = 0;
    };
    ATM.prototype.withdrawCash = function (enteredPin, amount) {
        try {
            if (!this.isServerOnline) {
                throw new Error("Error: Unable to connect to the server. Please try again later.");
            }
            if (this.isCardBlocked) {
                throw new Error("Error: Your card is blocked due to 3 invalid PIN attempts.");
            }
            if (enteredPin !== this.correctPin) {
                this.pinAttempts++;
                if (this.pinAttempts >= 3) {
                    this.isCardBlocked = true;
                    throw new Error("Error: Card blocked after 3 invalid PIN attempts.");
                }
                else {
                    throw new Error("Error: Invalid PIN. Attempts remaining: ".concat(3 - this.pinAttempts));
                }
            }
            // Reset pin attempts after successful PIN
            this.pinAttempts = 0;
            if (amount > this.accountBalance) {
                throw new Error("Error: Insufficient balance in your account.");
            }
            if (amount > this.totalCash) {
                throw new Error("Error: ATM has insufficient cash. Try a smaller amount.");
            }
            if (this.withdrawnToday + amount > this.dailyLimit) {
                throw new Error("Error: Daily withdrawal limit exceeded.");
            }
            this.accountBalance -= amount;
            this.totalCash -= amount;
            this.withdrawnToday += amount;
            console.log("Success: Withdrawn $".concat(amount, ". Remaining account balance: $").concat(this.accountBalance));
        }
        catch (error) {
            console.error(error.message);
        }
    };
    ATM.prototype.resetCard = function () {
        this.isCardBlocked = false;
        this.pinAttempts = 0;
        console.log("Card has been reset and unblocked.");
    };
    return ATM;
}());
