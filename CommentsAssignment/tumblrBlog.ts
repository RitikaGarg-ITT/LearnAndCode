import axios from "axios";

interface BlogInfo {
  title: string;
  description: string;
  name: string;
  posts: number;
}

interface TumblrPost {
  photos: { photo_url: string }[];
}

interface TumblrResponse {
  tumblelog: BlogInfo;
  posts: TumblrPost[];
}

/**
 * Function to fetch Tumblr blog data and extract relevant information
 * @param blogName - The name of the Tumblr blog
 * @param start - The starting post index
 * @param num - The number of posts to fetch
 */

async function fetchTumblrData(blogName: string, start: number, num: number): Promise<void> {

  const apiUrl = `https://${blogName}.tumblr.com/api/read/json?type=photo&num=${num}&start=${start}`;

  try {
    const response = await axios.get(apiUrl, { responseType: "text" });
    
    const jsonResponse = JSON.parse(response.data.replace(/^var tumblr_api_read = |;$/g, "")) as TumblrResponse;

    const blogInfo: BlogInfo = jsonResponse.tumblelog;
    console.log(`Title: ${blogInfo.title}`);
    console.log(`Name: ${blogInfo.name}`);
    console.log(`Description: ${blogInfo.description}`);
    console.log(`Number of Posts: ${blogInfo.posts}`);
    console.log("\nImage URLs:");

    jsonResponse.posts.forEach((post, index) => {
      post.photos.forEach((photo, photoIndex) => {
        console.log(`${start + index + 1}.${photoIndex + 1} ${photo.photo_url.replace(/_[0-9]+\./, "_1280.")}`);
      });
    });
  } catch (error) {
    console.error("Error fetching Tumblr data:", error);
  }
}
export default fetchTumblrData;
