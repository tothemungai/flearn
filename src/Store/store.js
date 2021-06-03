import { makeAutoObservable } from "mobx";
import { NoteManager } from "../Note/NoteManager";
import commands from "../NoteEditor/Menus/CommandMenu/commands";

class Store {
  constructor() {
    this.notes = [];
    this.activeNoteIndex = 0;
    this.hoveringCommandMenu = null;
    this.hoveringCommandMenuSearch = "";
    this._hoveringCommandMenuIndex = 0;
    makeAutoObservable(this);
  }
  async loadNotes() {
    const { data } = await NoteManager.getAllNotes();
    const { notes } = data.success ? data : { notes: [] };
    this.notes = notes;
  }

  configureHoveringCommandMenu(target, search) {
    this.hoveringCommandMenu = target;
    this.hoveringCommandMenuSearch = search;
  }
  get filteredCommands() {
    return commands.filter((c) =>
      c.displayName
        .toLowerCase()
        .startsWith(this.hoveringCommandMenuSearch.toLowerCase())
    );
  }
  get hoveringCommandMenuIndex() {
    if (this._hoveringCommandMenuIndex > this.filteredCommands.length - 1) {
      this._hoveringCommandMenuIndex = 0;
    } else if (this._hoveringCommandMenuIndex < 0) {
      this._hoveringCommandMenuIndex = this.filteredCommands.length - 1;
    }
    return this._hoveringCommandMenuIndex;
  }
  incrementHoveringCommandMenuIndex() {
    if (this._hoveringCommandMenuIndex > this.filteredCommands.length - 1) {
      this._hoveringCommandMenuIndex = 0;
    } else {
      this._hoveringCommandMenuIndex++;
    }
  }
  decrementHoveringCommandMenuIndex() {
    if (this._hoveringCommandMenuIndex <= 0) {
      this._hoveringCommandMenuIndex = this.filteredCommands.length - 1;
    } else {
      this._hoveringCommandMenuIndex--;
    }
  }
  isHoveringCommandMenuIndexValid() {
    return Boolean(
      this.filteredCommands[this.hoveringCommandMenuIndex] &&
        this.hoveringCommandMenu
    );
  }
  getBlockAtIndex() {
    return this.filteredCommands[this.hoveringCommandMenuIndex];
  }
}

export default new Store();
