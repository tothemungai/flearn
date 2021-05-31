import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Note } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { NoteManager } from "../../../Note/NoteManager";

const NoteLink = ({ attributes, children, element }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(element);
  const editor = useSlate();
  const history = useHistory();
  return (
    <>
      <span {...attributes}>
        <Chip
          size={"small"}
          label={Boolean(note.name === "") ? "undefined" : note.name}
          icon={<Note />}
          color={Boolean(note.name === "") ? "secondary" : "primary"}
          clickable
          variant="outlined"
          onClick={() => setOpen(true)}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth={true}
          maxWidth={"xs"}
        >
          <DialogTitle>Notes</DialogTitle>
          <DialogContent>
            <List component="nav">
              {NoteManager.getAllNotes().map((note) => {
                return (
                  <ListItem
                    button
                    onClick={(e) => {
                      const path = ReactEditor.findPath(editor, element);
                      Transforms.setNodes(editor, { ...note }, { at: path });
                      setNote(note);
                      setOpen(false);
                    }}
                  >
                    <ListItemText primary={note.name} />
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button onClick={() => history.push(`/note/${note.id}`)}>Go</Button>
          </DialogActions>
        </Dialog>
      </span>
      <span>{children}</span>
    </>
  );
};

export default NoteLink;