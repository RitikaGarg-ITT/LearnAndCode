import readline from "readline";
import fetchTumblrData from "./tumblrBlog";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the Tumblr blog name: ", (blogName) => {
  rl.question("Enter the start post number: ", (startInput) => {
    rl.question("Enter the number of posts to fetch: ", (numInput) => {
      const start = parseInt(startInput, 10);
      const num = parseInt(numInput, 10);

      if (isNaN(start) || isNaN(num) || start < 1 || num < 1) {
        console.log("Invalid input. Please enter valid numbers.");
        rl.close();
        return;
      }

      fetchTumblrData(blogName, start, num).finally(() => rl.close());
    });
  });
});
