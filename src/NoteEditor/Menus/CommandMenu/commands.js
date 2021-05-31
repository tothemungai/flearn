const commands = [
  { type: "heading-1", displayName: "Heading One" },
  {
    type: "flashcard",
    displayName: "Simple Flashcard",
    meta: { question: "", answer: "", attempts: [] },
  },
  {
    type: "tag",
    displayName: "Tag",
    meta: { tagName: "" },
  },
  {
    type: "note-link",
    displayName: "Note Link",
    meta: {
      id: "",
      name: "",
    },
  },
];

export default commands;
