import axios from "axios";

export async function getUserKeywords(token: string) {
  return axios.get("http://localhost:4000/api/user-keywords", {});
}

export async function addUserKeyword(token: string, keyword: string) {
  return axios.post("http://localhost:4000/api/user-keywords", { keyword });
}

export async function deleteUserKeyword(token: string, keyword: string) {
  return axios.delete("http://localhost:4000/api/user-keywords", {
    data: { keyword },
  });
}
