import { Grid, Icon, Paper, Portal, styled } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Editor, Range as SlateRange } from "slate";
import { FormatBold, FormatItalic, FormatUnderlined } from "@material-ui/icons";
import { isFormatActive, toggleFormat } from "../Format/format";
const StyledHovering = styled(Paper)({
  padding: "8px 7px 6px",
  position: "fixed",
  zIndex: 1,
  top: "-10000px",
  left: "-10000px",
  marginTop: "-6px",
  opacity: 0,
  transition: "opacity 0.75s",
});
const HoveringToolbar = () => {
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    if (!el) {
      return;
    }
    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      SlateRange.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });
  return (
    <Portal container={document.body}>
      <StyledHovering variant="outlined" ref={ref}>
        <FormatBold
          onMouseDown={(e) => toggleFormat(editor, "bold")}
          color={isFormatActive(editor, "bold") ? "primary" : ""}
        />
        <FormatItalic
          onMouseDown={(e) => toggleFormat(editor, "italic")}
          color={isFormatActive(editor, "italic") ? "primary" : ""}
        />
        <FormatUnderlined
          onMouseDown={(e) => toggleFormat(editor, "underlined")}
          color={isFormatActive(editor, "underlined") ? "primary" : ""}
        />
      </StyledHovering>
    </Portal>
  );
};

export default HoveringToolbar;
