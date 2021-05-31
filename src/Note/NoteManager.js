import dummyNoteData from "./dummyNoteData";

export class NoteManager {
  static getNote(id) {
    id = parseInt(id);
    const { data } = dummyNoteData.find((note) => note.id === id) || {
      data: [],
    };
    return data;
  }

  static getAllNotes() {
    return dummyNoteData;
  }
}
