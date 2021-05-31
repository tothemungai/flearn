const DataStore = require("nedb");
const path = require("path");

const db = {};

db.notes = new DataStore({
  filename: path.join(__dirname, "notes.db"),
  autoload: true,
});

module.exports = db;
