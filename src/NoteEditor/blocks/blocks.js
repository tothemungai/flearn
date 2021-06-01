import { Editor, Transforms, Node as SlateNode } from "slate";

export const insertBlock = (editor, type, meta = {}) => {
  const block = {
    type,
    children: [{ text: "" }],
    ...meta,
  };

  Transforms.insertNodes(editor, block);
  Transforms.move(editor);
  if (editor.isInline(block)) {
    Transforms.insertText(editor, " ");
  }
};
