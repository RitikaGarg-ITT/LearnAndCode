import readlineSync from "readline-sync";
import { signup, login } from "../api/userApi";

export async function signupFlow() {
  console.log("--- Signup ---");
  const firstname = readlineSync.question("First Name: ");
  const lastname = readlineSync.question("Last Name: ");
  const email = readlineSync.questionEMail("Email: ");
  const password = readlineSync.question("Password: ", { hideEchoBack: true });

  try {
    // No role sent here!
    const res = await signup({ firstname, lastname, email, password });
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
    return res.data.user;
  } catch (err: any) {
    console.log("Login failed:", err.response?.data?.message || err.message);
    return null;
  }
}
