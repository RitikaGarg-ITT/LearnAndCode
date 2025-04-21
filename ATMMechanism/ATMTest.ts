import { TransactionServices } from "./ATMService";
const atm = new TransactionServices();

atm.withdrawCash("1234", 300);

// Incorrect PIN
atm.withdrawCash("0000", 100);
atm.withdrawCash("0000", 100);
atm.withdrawCash("0000", 100);

// Try again after card is blocked
atm.withdrawCash("1234", 100);

// Simulate bank reset or test reset
atm.resetCard();

// Try again after reset (will work if PIN is correct)
atm.withdrawCash("1234", 100);

atm.setServerStatus(false);
atm.withdrawCash("1234", 100);

atm.setServerStatus(true);
atm.resetDailyWithdrawal();
atm.withdrawCash("1234", 700);
atm.withdrawCash("1234", 400);
