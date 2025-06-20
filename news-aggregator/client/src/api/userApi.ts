// client/src/api/userApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:4000/api/users";

export async function signup(data: any) {
  console.log(data);
  return axios.post(`${BASE_URL}/signup`, data);
}

export async function login(data: any) {
  return axios.post(`${BASE_URL}/login`, data);
}
