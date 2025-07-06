import db from "../config/db";

// Define a UserInput interface for user creation
export interface UserInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

// Define a User interface for fetched users (can be expanded)
export interface User extends UserInput {
  user_id: number;
}

class UserRepository {
  /**
   * Creates a new user in the database.
   * @param user - User input object
   * @returns The inserted user's ID
   */
  public static async createUser(user: UserInput): Promise<number> {
    const [result]: any = await db.query(
      "INSERT INTO USERS (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.password, user.role]
    );
    return result.insertId;
  }

  /**
   * Finds a user by email.
   * @param email - The user's email address
   * @returns The user object or undefined if not found
   */
  public static async findByEmail(email: string): Promise<User | undefined> {
    const [rows] = await db.query("SELECT * FROM USERS WHERE email = ?", [email]);
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return (rows as User[])[0];
  }
}

export default UserRepository;
