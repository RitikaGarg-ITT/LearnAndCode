const db = require("../config/db");

const getCategories = async () => {
  const [rows] = await db.query("SELECT * FROM CATEGORIES");
  return rows;
};

module.exports = { getCategories };
