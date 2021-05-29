import { Editor, Transforms, Node as SlateNode } from "slate";

export const insertBlock = (editor, type) => {
  const block = {
    type,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, block);
};
