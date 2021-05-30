const withFlashcards = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "flashcard" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "flashcard" ? true : isVoid(element);
  };

  return editor;
};

export default withFlashcards;
