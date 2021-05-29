import { Editor, Range as SlateRange } from "slate";
import { useSlate } from "slate-react";

const configureCommandMenu = (editor) => {
  const { selection } = editor;
  const [start] = SlateRange.edges(editor.selection);
  const wordBefore = Editor.before(editor, start, { unit: "word" });
  //we get the exact range /(search-term)
  const before = wordBefore && Editor.before(editor, wordBefore);
  const wordBeforeRange = before && Editor.range(editor, before, start);
  const wordBeforeText =
    wordBeforeRange && Editor.string(editor, wordBeforeRange);
  const wordBeforeMatch = wordBeforeText && wordBeforeText.match(/\/(\w*)/);
  const exactRange = wordBeforeMatch && {
    ...wordBeforeRange,
    anchor: {
      ...wordBeforeRange.anchor,
      offset: wordBeforeRange.anchor.offset + wordBeforeMatch.index || 0,
    },
  };
  const exactRangeText = exactRange && Editor.string(editor, exactRange);

  const beforeRange = before && Editor.range(editor, before, start);
  const beforeText = beforeRange && Editor.string(editor, beforeRange);
  const beforeMatch = beforeText && beforeText.match(/\/(\w*)/);
  const after = Editor.after(editor, start);
  const afterRange = Editor.range(editor, start, after);
  const afterText = Editor.string(editor, afterRange);
  const afterMatch = afterText.match(/^(\w*|$)/);
  //   debugger;
  if (beforeMatch && afterMatch) {
    return [exactRange, beforeMatch[1], 0];
  } else {
    return [null, null, 0];
  }
};

export default configureCommandMenu;
