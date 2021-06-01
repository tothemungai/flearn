const db = require("../Stores/Stores");

class NoteManager {
  static async upsertNote(note) {
    const { id } = note;
    return new Promise((resolve, reject) => {
      db.notes.update({ id }, note, { upsert: true }, (error, _, upsert) => {
        if (error) reject(error);
        resolve({ upsert });
      });
    });
  }

  static async getAllNotes() {
    return new Promise((resolve, reject) => {
      db.notes.find({}, {}, (error, notes) => {
        if (error) reject(error);

        resolve(notes);
      });
    });
  }

  static async getNote(id) {
    return new Promise((resolve, reject) => {
      db.notes.findOne({ id }, (error, note) => {
        if (error) reject(error);

        resolve(note);
      });
    });
  }

  static async getByTags(tags = []) {
    const tagQuery = tags.map((tag) => {
      return {
        "data.children.type": "tag",
        "data.children.tagName": tag.tagName,
      };
    });

    return new Promise((resolve, reject) => {
      db.notes.find({ $or: tagQuery }, {}, (error, documents) => {
        if (error) reject(error);

        resolve(documents);
      });
    });
  }
}

module.exports = NoteManager;
