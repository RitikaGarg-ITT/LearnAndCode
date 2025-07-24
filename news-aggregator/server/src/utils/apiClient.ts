import axios, { AxiosRequestConfig } from "axios";

export interface FetchNewsParams {
  [key: string]: string | number | boolean | undefined;
}

export interface NewsApiResponse {
  articles: any[];
}

class ApiClient {
  /**
   * Fetches news articles from a given API URL with provided parameters.
   * @param apiUrl - The news API endpoint.
   * @param params - Query parameters for the API call.
   * @returns Array of articles from the API response.
   */
  public static async fetchNews(
    apiUrl: string,
    params: FetchNewsParams
  ): Promise<any[]> {
    try {
      const config: AxiosRequestConfig = {
        params,
        timeout: 10000,
      };
      const response = await axios.get<NewsApiResponse>(apiUrl, config);
      return response.data?.articles ?? [];
    } catch (error: any) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
}

export default ApiClient;
