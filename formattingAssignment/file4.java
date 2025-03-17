public class PaymentProcessing {
    public void makePayment(String ctype, double amount, String cn, String ce) {
        if (ctype.equals("Credit")) System.out.println("Processing Credit Card payment of $" + amount);
        else if (ctype.equals("Debit")) System.out.println("Processing Debit Card payment of $" + amount);
        else System.out.println("Unknown Payment Method");
        if (amount > 1000) System.out.println("High-value transaction alert!");
        System.out.println("Payment Done for " + cn + " (Card Ending:" + ce.substring(ce.length() - 4) + ")");
    }
}