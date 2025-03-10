public class User {
    public String n;
    public String e;
    public User(String name, String email) {
        this.n = name;
        this.e = email;
    }
    public void showInfo() {
        System.out.println("User Name:" + n + " Email:" + e);
    }
}