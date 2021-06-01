import {
  Button,
  Chip,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@material-ui/core";
import isHotkey from "is-hotkey";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NoteManager } from "../Note/NoteManager";
import { v4 } from "uuid";
const NoteSideBar = () => {
  const [activeTags, setActiveTags] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (Boolean(activeTags.length === 0)) {
      NoteManager.getAllNotes().then(({ data }) => {
        const { notes } = Boolean(data.notes) ? data : { notes: [] };
        setNotes(notes);
      });
    } else {
      NoteManager.getByTags(activeTags).then(({ data }) => {
        const { notes } = Boolean(data.notes) ? data : { notes: [] };
        setNotes(notes);
      });
    }
  }, [activeTags]);
  const history = useHistory();
  return (
    <>
      <Paper>
        <DialogTitle>NOTES</DialogTitle>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push(`/note/${v4()}`);
          }}
        >
          New Note
        </Button>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {activeTags.map((tag) => {
                return (
                  <Chip
                    label={tag.tagName}
                    clickable
                    color={"primary"}
                    onDelete={() =>
                      setActiveTags(
                        activeTags.filter(
                          (activeTag) => activeTag.tagName !== tag.tagName
                        )
                      )
                    }
                  />
                );
              })}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tags"
                onKeyDown={(e) => {
                  if (isHotkey("Enter", e)) {
                    setActiveTags([...activeTags, { tagName: e.target.value }]);
                  }
                }}
              />
            </Grid>
          </Grid>
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
      </Paper>
    </>
  );
};

export default NoteSideBar;
