export type UserRole = "admin" | "user" | "editor" | string; 

export default class User {
  public user_id: number | null;
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public role: UserRole;

  constructor(
    user_id: number | null,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: UserRole
  ) {
    this.user_id = user_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
