import isHotkey from "is-hotkey";
import { Transforms } from "slate";
import { insertBlock } from "../blocks/blocks";

const keyHandler = (e, setIndex, index, filteredCommands, editor, target) => {
  if (isHotkey("up", e)) {
    e.preventDefault();
    const newIndex = index <= 0 ? 0 : index - 1;
    setIndex(newIndex);
  }
  if (isHotkey("down", e)) {
    e.preventDefault();
    const newIndex = index >= filteredCommands.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
  }
  if (isHotkey("Enter", e)) {
    e.preventDefault();
    if (!Boolean(filteredCommands[index])) return;
    const block = filteredCommands[index];
    Transforms.select(editor, target);
    Transforms.delete(editor);
    insertBlock(editor, block.type, block.meta);
  }
};

export default keyHandler;
