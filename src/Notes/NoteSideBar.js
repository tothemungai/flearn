import {
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import isHotkey from "is-hotkey";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NoteManager } from "../Note/NoteManager";
import { v4 } from "uuid";
import { Add, FiberManualRecord } from "@material-ui/icons";
import produce from "immer";

const useStyles = makeStyles((theme) => ({
  paperTitle: {
    display: "flex",
    alignItems: "center",
  },
  tagsSearch: {
    margin: `${theme.spacing(2.5)}px 0px 0px 0px`,
  },
}));
const NoteSideBar = ({ note, value, numberOfChanges }) => {
  const [activeTags, setActiveTags] = useState([]);
  const [notes, setNotes] = useState([]);
  const classes = useStyles();
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
      <Card>
        <CardContent>
          <Grid container alignItems="center">
            <Grid item>
              <Typography>NOTES {numberOfChanges}</Typography>
            </Grid>
            <Grid item>
              <Add
                onClick={() => {
                  const newNoteId = v4();
                  history.push(`/note/${newNoteId}`);
                  setNotes(
                    produce(notes, (draft) => {
                      draft.push({
                        data: [
                          {
                            type: "title",
                            children: [{ text: "" }],
                          },
                          {
                            type: "paragraph",
                            children: [{ text: "" }],
                          },
                        ],
                        id: newNoteId,
                      });
                    })
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {activeTags.map((tag) => {
              return (
                <Chip
                  size={"small"}
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
              fullWidth={true}
              classes={{ root: classes.tagsSearch }}
              size={"small"}
              label="Tags"
              variant="outlined"
              onKeyDown={(e) => {
                if (isHotkey("Enter", e)) {
                  setActiveTags([...activeTags, { tagName: e.target.value }]);
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <List component="nav">
              {notes.map((noteFromServer) => {
                //check if this is the active current node
                let title = "Untitled";
                if (noteFromServer.id === note.id) {
                  const [localTitle] = (value.length > 0 &&
                    value[0].type === "title" &&
                    value[0].children) || [{ text: "Untitled" }];
                  title = localTitle;
                } else {
                  const [localTitle] = (noteFromServer.data[0].type ===
                    "title" &&
                    noteFromServer.data[0].children) || [{ text: "Untitled" }];
                  title = localTitle;
                }
                return (
                  <ListItem
                    button
                    onClick={(e) => {
                      history.push(`/note/${noteFromServer.id}`);
                    }}
                  >
                    <ListItemText
                      primary={
                        title.text.trim() === "" ? "New Note" : title.text
                      }
                    />
                    {numberOfChanges !== 0 && noteFromServer.id === note.id && (
                      <FiberManualRecord />
                    )}
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteSideBar;
