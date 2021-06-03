import { Note } from "@material-ui/icons";
import isHotkey from "is-hotkey";
import { Transforms } from "slate";
import { NoteManager } from "../../Note/NoteManager";
import store from "../../Store/store";
import { insertBlock } from "../blocks/blocks";
import { toJS } from "mobx";

const keyHandler = (e, editor, note, value, resetNumberOfChanges) => {
  if (Boolean(store.hoveringCommandMenu)) {
    if (isHotkey("up", e)) {
      e.preventDefault();
      store.decrementHoveringCommandMenuIndex();
    }
    if (isHotkey("down", e)) {
      e.preventDefault();
      store.incrementHoveringCommandMenuIndex();
    }
    if (isHotkey("Enter", e)) {
      e.preventDefault();
      if (!store.isHoveringCommandMenuIndexValid()) return;
      const block = store.getBlockAtIndex();
      Transforms.select(editor, toJS(store.hoveringCommandMenu));
      Transforms.delete(editor);
      insertBlock(editor, block.type, block.meta);
    }
  }
  if (isHotkey("mod+s", e)) {
    e.preventDefault();
    NoteManager.saveNote({ ...note, data: value });
    resetNumberOfChanges();
    return;
  }
};

export default keyHandler;
