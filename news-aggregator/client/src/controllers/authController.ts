import readlineSync from "readline-sync";
import { signup, login } from "../api/userApi";

export async function signupFlow() {
  console.log("--- Signup ---");
  const firstname = readlineSync.question("First Name: ");
  const lastname = readlineSync.question("Last Name: ");
  const email = readlineSync.questionEMail("Email: ");
  const password = readlineSync.question("Password: ", { hideEchoBack: true });

  try {
    const res = await signup({ firstname, lastname, email, password });
    console.log("\n✅ Signup successful:", res.data.message);
  } catch (err: any) {
    console.log("\n❌ Signup failed.");

    if (err.code === "ECONNREFUSED" || err.code === "ECONNRESET") {
      console.error("⚠️ Network error:", err.code);
    }

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Server error:", err.response.data.message);
    } else if (err.request) {
      console.error("No response received from server.");
    } else {
      console.error("Unexpected error:", err.message);
    }

  }
}

export async function loginFlow() {
  console.log("--- Login ---");
  const email = readlineSync.questionEMail("Email: ");
  const password = readlineSync.question("Password: ", { hideEchoBack: true });

  try {
    const res = await login({ email, password });
    console.log("\n✅ Login successful:", res.data.message);
    return res.data.user;
  } catch (err: any) {
    console.log("\n❌ Login failed.");

    if (err.code === "ECONNRESET" || err.code === "ECONNREFUSED") {
      console.error("⚠️ Network error:", err.code);
    }

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Server error:", err.response.data.message);
    } else if (err.request) {
      console.error("No response received from server.");
    } else {
      console.error("Unexpected error:", err.message);
    }
    return null;
  }
}
