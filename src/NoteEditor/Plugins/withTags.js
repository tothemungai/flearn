const withTags = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "tag" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "tag" ? true : isVoid(element);
  };

  return editor;
};

export default withTags;
