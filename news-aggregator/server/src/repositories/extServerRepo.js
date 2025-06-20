const db = require("../config/db");

const getActiveServers = async () => {
  const [rows] = await db.query("SELECT source_id, name, api_uri, api_key FROM EXT_SERVER WHERE is_active = TRUE");
  return rows;
};

const updateLastFetched = async (sourceId) => {
  await db.query("UPDATE EXT_SERVER SET last_accessed_time = NOW() WHERE source_id = ?", [sourceId]);
};

module.exports = { getActiveServers, updateLastFetched };
