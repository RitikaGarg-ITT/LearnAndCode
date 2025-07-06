import axios from "axios";

export async function fetchTodayHeadlines() {
  return axios.get("http://localhost:4000/api/headlines/today");
}

export async function fetchHeadlineById(id: number) {
  return axios.get(`http://localhost:4000/api/headlines/${id}`);
}
