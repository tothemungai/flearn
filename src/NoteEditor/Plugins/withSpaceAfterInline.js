import { Editor, Text, Transforms } from "slate";

const withSpaceAfterInline = (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (editor.isInline(node)) {
      const nodeAfter = Editor.next(editor, { at: path });
      if (Boolean(nodeAfter)) {
        if (Text.isText(nodeAfter[0]) && Editor.string(nodeAfter[0]) === "") {
          Transforms.setNodes(editor, { text: " " }, { at: nodeAfter[1] });
          return;
        }
      } else {
        debugger;
        Transforms.insertText(editor, " ", { at: path.focus });
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
};

export default withSpaceAfterInline;
