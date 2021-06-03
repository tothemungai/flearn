import axios from "axios";
const baseUrl = "http://localhost:5500/note/";

export class NoteManager {
  static async getNote(id) {
    return axios.post(baseUrl + "get", { id });
  }

  static getAllNotes() {
    return axios.post(baseUrl, "/");
  }

  static async saveNote(note) {
    return axios.post(baseUrl + "save", { note });
  }

  static async getByTags(tags = []) {
    return axios.post(baseUrl + "tags", { tags });
  }
}
