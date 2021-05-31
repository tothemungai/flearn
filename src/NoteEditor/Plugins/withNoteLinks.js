const withNoteLink = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "note-link" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "note-link" ? true : isVoid(element);
  };

  return editor;
};

export default withNoteLink;
