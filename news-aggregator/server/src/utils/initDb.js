const db = require("../config/db");

async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS USERS (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS CATEGORIES (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS EXT_SERVER (
        source_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        api_uri VARCHAR(255) NOT NULL,
        api_key VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        last_accessed_time DATETIME
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ARTICLES (
        article_id INT AUTO_INCREMENT PRIMARY KEY,
        source_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT,
        url VARCHAR(255),
        image_url VARCHAR(255),
        category_id INT,
        published_at DATETIME,
        FOREIGN KEY (source_id) REFERENCES EXT_SERVER(source_id),
        FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS SAVED_ARTICLES (
        saved_article_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        article_id INT NOT NULL,
        saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES USERS(user_id),
        FOREIGN KEY (article_id) REFERENCES ARTICLES(article_id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS KEYWORD (
        keyword_id INT AUTO_INCREMENT PRIMARY KEY,
        keyword_name VARCHAR(100) NOT NULL,
        category_id INT,
        user_id INT,
        FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id),
        FOREIGN KEY (user_id) REFERENCES USERS(user_id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS CONFIGURE_NOTIFICATION (
        configure_notif_id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT,
        user_id INT,
        is_enabled BOOLEAN DEFAULT TRUE,
        FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id),
        FOREIGN KEY (user_id) REFERENCES USERS(user_id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS NOTIFICATIONS (
        notification_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        article_id INT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES USERS(user_id),
        FOREIGN KEY (article_id) REFERENCES ARTICLES(article_id)
      );
    `);

    console.log("All tables created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error creating tables:", err);
    process.exit(1);
  }
}

createTables();
