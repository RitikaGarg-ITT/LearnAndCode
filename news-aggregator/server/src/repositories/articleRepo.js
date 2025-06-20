const db = require("../config/db");

const createArticle = async (article) => {
  const [result] = await db.query(
    `INSERT INTO ARTICLES 
    (source_id, title, description, content, url, image_url, category_id, published_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      article.source_id,
      article.title,
      article.description,
      article.content,
      article.url,
      article.image_url,
      article.category_id,
      article.published_at,
    ]
  );
  return result.insertId;
};

const articleExists = async (url) => {
  const [rows] = await db.query("SELECT 1 FROM ARTICLES WHERE url = ?", [url]);
  return rows.length > 0;
};

module.exports = { createArticle, articleExists };
