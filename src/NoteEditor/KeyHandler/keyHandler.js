import isHotkey from "is-hotkey";

const keyHanlder = (event) => {
  if (isHotkey("/", event)) {
    this.openCommandMenu();
  }
};

export default keyHandler;
