import {
  Editor,
  Range as SlateRange,
  Element as SlateElement,
  Point,
  Transforms,
} from "slate";

const withBlocks = (editor) => {
  const { deleteBackward } = editor;
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && SlateRange.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);
        //if this is the 2nd block after the title do nothing. We don't want to move other blocks to the title
        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          Point.equals(selection.anchor, start) &&
          path[0] === 1
        ) {
          return;
        }

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

export default withBlocks;
