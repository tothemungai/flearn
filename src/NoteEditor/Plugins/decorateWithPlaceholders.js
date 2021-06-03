import { Editor, Range as SlateRange } from "slate";

const decorateWithPlaceholders = (block, editor) => {
  const [node, path] = block;
  if (!Editor.isEditor(node)) {
    const [parent] = Editor.above(editor, { at: path });
    if (parent.type === "title" && Editor.string(editor, path).trim() === "") {
      return [
        {
          anchor: {
            path,
            offset: 0,
          },

          focus: {
            path,
            offset: 0,
          },
          placeholderTitle: true,
        },
      ];
    }
  }
  if (editor.selection != null) {
    if (
      !Editor.isEditor(node) &&
      Editor.string(editor, [path[0]]) === "" &&
      SlateRange.includes(editor.selection, path) &&
      SlateRange.isCollapsed(editor.selection)
    ) {
      return [
        {
          ...editor.selection,
          placeholder: true,
        },
      ];
    }
  }
  return [];
};

export default decorateWithPlaceholders;
