const express = require("express");
const NoteManager = require("../../Notes/NoteManager");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { note } = req.body;
    const data = await NoteManager.upsertNote(note);

    res.send({ success: true, data });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
});

router.post("/get", async (req, res) => {
  try {
    const { id } = req.body;
    const note = await NoteManager.getNote(id);
    res.send({ success: true, note });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const notes = await NoteManager.getAllNotes();
    res.send({ success: true, notes });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
});

router.post("/tags", async (req, res) => {
  try {
    const { tags } = req.body;
    const notes = await NoteManager.getByTags(tags);
    res.send({ success: true, notes });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
});

module.exports = router;
