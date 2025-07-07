import axios from "axios";

// Fetch all categories from server (returns array of strings)
export async function fetchCategories() {
  try {
    await new Promise((res) => setTimeout(res, 100));
    const res = await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      url: "http://localhost:4000/api/categories",
    });
    return res.data.categories; // e.g. ["business", "entertainment", ...]
  } catch (err: any) {
    // Print more details about the error
    console.log("Error in fetchCategories:", err.message, err.code, err.response?.data);
  }
}

// Fetch headlines for given date range and category
export async function fetchHeadlines(params: { startDate: string; endDate: string; category?: string }) {

  try {
    await new Promise((res) => setTimeout(res, 100));
    let url = `http://localhost:4000/api/headlines?startDate=${params.startDate}&endDate=${params.endDate}`;
    if (params.category && params.category.toLowerCase() !== "all") {
      url += `&category=${params.category}`;
    }
    const res = await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      url: url,
    });
  
    return res;
  } catch (err: any) {
    console.log("Error in fetchHeadlines:", err.message, err.code, err.response?.data);
    throw new Error(err.response?.data?.message || err.message || "Unknown error fetching headlines");
  }
}

// Fetch a single headline/article by ID
export async function fetchHeadlineById(id: number) {
  try {
    await new Promise((res) => setTimeout(res, 100));
    return await axios.get(`http://localhost:4000/api/headlines/${id}`);
  } catch (err: any) {
    console.error("Error in fetchHeadlineById:", err.message, err.code, err.response?.data);
    throw new Error(err.response?.data?.message || err.message || "Unknown error fetching headline by ID");
  }
}
