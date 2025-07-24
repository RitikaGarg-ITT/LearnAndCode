import axios from "axios";

export async function fetchExternalServers() {
  await new Promise((res) => setTimeout(res, 100));
  return axios.get("http://localhost:4000/api/admin/servers");
}

export async function fetchExternalServerDetails(id: number) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.get(`http://localhost:4000/api/admin/servers/${id}`);
}

export async function updateExternalServer(id: number, apiKey: string) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.put(`http://localhost:4000/api/admin/servers/${id}`, { apiKey });
}

export async function addCategory(name: string) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.post("http://localhost:4000/api/admin/categories", { name });
}

export async function addServer({ name, api_uri, api_key }: { name: string; api_uri: string; api_key: string }) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.post("http://localhost:4000/api/admin/servers", {
    name,
    api_uri,
    api_key,
  });
}

export async function toggleArticleVisibility(articleId: number, is_hidden: boolean) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.put(`http://localhost:4000/api/admin/articles/${articleId}/visibility`, {
    is_hidden,
  });
}

export async function toggleCategoryVisibility(categoryId: number, is_hidden: boolean) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.put(`http://localhost:4000/api/admin/categories/${categoryId}/visibility`, {
    is_hidden,
  });
}

export async function fetchBlockedKeywords() {
  await new Promise((res) => setTimeout(res, 100));
  return axios.get("http://localhost:4000/api/admin/keywords");
}

export async function blockKeyword(keyword: string) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.post("http://localhost:4000/api/admin/keywords", { keyword });
}

export async function unblockKeyword(keyword: string) {
  await new Promise((res) => setTimeout(res, 100));
  return axios.delete(`http://localhost:4000/api/admin/keywords/${keyword}`);
}
