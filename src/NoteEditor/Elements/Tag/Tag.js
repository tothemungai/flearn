import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

const Tag = ({ element, children, attributes }) => {
  const [tagName, setTagName] = useState(element.tagName);
  const [open, setOpen] = useState(false);
  const editor = useSlate();
  return (
    <>
      <span {...attributes} contentEditable={false}>
        <Chip
          icon={<Label />}
          clickable={true}
          size={"small"}
          label={tagName === "" ? "undefined" : tagName}
          variant="outlined"
          color={"primary"}
          onClick={() => setOpen(true)}
        />
        <Dialog open={open} onClose={() => setOpen(false)}>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
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
        </Dialog>
      </span>
      <span>{children}</span>
    </>
  );
};

export default Tag;
