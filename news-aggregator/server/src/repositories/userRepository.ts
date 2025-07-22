import db from "../config/db";

export interface UserInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

export interface User extends UserInput {
  user_id: number;
}

class UserRepository {

  public static async createUser(user: UserInput): Promise<number> {
    const [result]: any = await db.query(
      "INSERT INTO USERS (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.password, user.role]
    );
    return result.insertId;
  }

  
  public static async findByEmail(email: string): Promise<User | undefined> {
    const [rows] = await db.query("SELECT * FROM USERS WHERE email = ?", [email]);
    if (!Array.isArray(rows)) throw new Error("Query did not return rows");
    return (rows as User[])[0];
  }
}

export default UserRepository;
