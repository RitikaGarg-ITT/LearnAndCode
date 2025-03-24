public class MainApp {
    public static void main(String[] args) {
        User u = new User("John", "john@example.com");
        OrderProcessing op = new OrderProcessing();
        op.orderDetails(u, "Laptop", 3, 700);
    }
}