import {
  Button,
  Chip,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Popper,
  TextField,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import isHotkey from "is-hotkey";
import { useRef, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

const Tag = ({ element, children, attributes }) => {
  const [tagName, setTagName] = useState(element.tagName);
  const [open, setOpen] = useState(false);
  const editor = useSlate();
  const anchorEl = useRef();
  return (
    <span {...attributes} contentEditable={false}>
      <Chip
        ref={anchorEl}
        icon={<Label />}
        clickable={true}
        size={"small"}
        label={tagName === "" ? "undefined" : tagName}
        variant="outlined"
        color={tagName === "" ? "secondary" : "primary"}
        onClick={() => setOpen(true)}
      />
      <Popper open={open} anchorEl={anchorEl.current}>
        <ClickAwayListener
          onClickAway={() => {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, { tagName }, { at: path });
            setOpen(false);
          }}
        >
          <Paper>
            <DialogTitle>Enter tag</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="tagname"
                label="Tag Name"
                type="text"
                fullWidth
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (isHotkey("Enter", e)) {
                    const path = ReactEditor.findPath(editor, element);
                    Transforms.setNodes(editor, { tagName }, { at: path });
                    setOpen(false);
                  }
                }}
                autoFocus
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  const path = ReactEditor.findPath(editor, element);
                  Transforms.setNodes(editor, { tagName }, { at: path });
                  setOpen(false);
                }}
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </Paper>
        </ClickAwayListener>
      </Popper>
      <span>{children}</span>
    </span>
  );
};

export default Tag;
