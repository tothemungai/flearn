import { Transforms, Element as SlateElement, Node } from "slate";

const withLayout = (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const title = {
          type: "title",
          children: [{ text: "New Note" }],
        };
        Transforms.insertNodes(editor, title, { at: path.concat(0) });
      }

      if (editor.children.length < 2) {
        const paragraph = {
          type: "paragraph",
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
      }

      for (const [child, childPath] of Node.children(editor, path)) {
        const type = childPath[0] === 0 ? "title" : child.type;

        if (childPath[0] !== 0 && child.type === "title") {
          const newProperties = { type: "paragraph" };
          Transforms.setNodes(editor, newProperties, { at: childPath });
        }

        if (SlateElement.isElement(child) && child.type !== type) {
          const newProperties = { type };
          Transforms.setNodes(editor, newProperties, { at: childPath });
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

export default withLayout;
