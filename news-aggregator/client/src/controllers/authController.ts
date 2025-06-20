// client/src/controllers/authController.ts
import readlineSync from "readline-sync";
import { signup, login } from "../api/userApi";

export async function signupFlow() {
  console.log("--- Signup ---");
  const firstname = readlineSync.question("First Name: ");
  const lastname = readlineSync.question("Last Name: ");
  const email = readlineSync.questionEMail("Email: ");
  const password = readlineSync.question("Password: ", { hideEchoBack: true });
  const role = readlineSync.keyInSelect(["user", "admin"], "Role: ", { cancel: false }) === 0 ? "user" : "admin";

  try {
    console.log("firstname "+ firstname  , "lastname " + lastname,  "email "+ email, "password "+ password, "role "+ role);
    const res = await signup({ firstname, lastname, email, password, role });
    console.log(JSON.stringify(res.data.message));
  } catch (err: any) {
    console.log("Signup failed 1:", err);
    console.log("Signup failed:", err.response?.data?.message ?? err.message);
  }
}

export async function loginFlow() {
  console.log("--- Login ---");
  const email = readlineSync.questionEMail("Email: ");
  const password = readlineSync.question("Password: ", { hideEchoBack: true });

  try {
    const res = await login({ email, password });
    console.log(res.data.message);
    // You can return user info or token here if you want to manage session
    return res.data.user;
  } catch (err: any) {
    console.log("Login failed:", err.response?.data?.message || err.message);
    return null;
  }
}
