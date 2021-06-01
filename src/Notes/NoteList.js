import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NoteManager } from "../Note/NoteManager";

const NoteList = () => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    NoteManager.getAllNotes().then(({ data }) => {
      const { notes } = Boolean(data.notes) ? data : { notes: [] };

      setNotes(notes);
    });
  }, []);
  const history = useHistory();
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Note List
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>List of notes</DialogTitle>
        <DialogContent>
          <List component="nav">
            {notes.map((note) => {
              return (
                <ListItem
                  button
                  onClick={(e) => {
                    history.push(`/note/${note.id}`);
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteList;
