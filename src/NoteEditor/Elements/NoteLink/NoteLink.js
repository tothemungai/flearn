import {
  Button,
  Chip,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
} from "@material-ui/core";
import { Note } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { NoteManager } from "../../../Note/NoteManager";

const NoteLink = ({ attributes, children, element }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(element);
  const editor = useSlate();
  const history = useHistory();

  const [notes, setNotes] = useState([]);
  const anchorEl = useRef();

  useEffect(() => {
    NoteManager.getAllNotes().then(({ data }) => {
      const { notes } = Boolean(data.notes) ? data : { notes: [] };

      setNotes(notes);
    });
  }, []);

  return (
    <span {...attributes}>
      <Chip
        ref={anchorEl}
        size={"small"}
        label={Boolean(note.name === "") ? "undefined" : note.name}
        icon={<Note />}
        color={Boolean(note.name === "") ? "secondary" : "primary"}
        clickable
        variant="outlined"
        onClick={() => setOpen(true)}
      />
      <Popper open={open} anchorEl={anchorEl.current}>
        <ClickAwayListener
          onClickAway={() => {
            setOpen(false);
          }}
        >
          <Paper>
            <DialogTitle>Notes</DialogTitle>
            <DialogContent>
              <List component="nav">
                {notes.map((note, index) => {
                  return (
                    <ListItem
                      button
                      key={note.tagName + index}
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
              <Button onClick={() => history.push(`/note/${note.id}`)}>
                Go
              </Button>
            </DialogActions>
          </Paper>
        </ClickAwayListener>
      </Popper>

      <span>{children}</span>
    </span>
  );
};

export default NoteLink;
