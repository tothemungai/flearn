import { Editor, Range as SlateRange, Text, Transforms } from "slate";
import { useSlate } from "slate-react";
import { produce } from "immer";
const MAX_SEARCH_LENGTH = 10;

const configureCommandMenu = (editor) => {
  const { selection } = editor;
  //check if the current text node has a /
  const [node, path] = Editor.node(editor, selection);
  //we check if the text node is marked (menu should not appear)
  if (!Text.isText(node)) return [null, null, 0];

  const match = Editor.string(editor, path).match(/\/(\w*)/);
  if (!match) return [null, null, 0];
  //if match has a . or is too long mark the node so a menu wont appear
  if (
    match[1].length > MAX_SEARCH_LENGTH ||
    Boolean(Editor.string(editor, path).match(/\./))
  ) {
    return [null, null, 0];
  }

  //now we need to determine the range that will be overwritten on insert
  //range = from where the / starts to the currets position
  const range = produce(selection, (draft) => {
    draft.anchor.offset = match.index;
  });

  return [range, match[1], 0];
};

export default configureCommandMenu;
