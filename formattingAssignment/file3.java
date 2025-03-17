import java.util.ArrayList;
import java.util.List;
public class OrderProcessing {
    List < String > orders = new ArrayList < > ();
    public void orderDetails(User u, String i, int q, double p) {
        double total = q * p;
        if (q > 5) total *= 0.85;
        orders.add("Item:" + i + ",Qty:" + q + ",Total:" + total);
        System.out.println("Order Placed!");
        System.out.println("User:" + u.n + ", Item:" + i + ", Quantity:" + q + ", Total:" + total);
        if (q > 10) {
            System.out.println("Bulk Order Alert!");
        }
        sendEmail(u.e, "Order placed for " + i + " with total cost " + total);
    }
    public void sendEmail(String e, String msg) {
        System.out.println("Sending email to:" + e + " Message:" + msg);
    }
}