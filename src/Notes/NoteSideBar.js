import {
  Button,
  Card,
  CardContent,
  Chip,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import isHotkey from "is-hotkey";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NoteManager } from "../Note/NoteManager";
import { v4 } from "uuid";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paperTitle: {
    display: "flex",
    alignItems: "center",
  },
  tagsSearch: {
    margin: `${theme.spacing(2.5)}px 0px 0px 0px`,
  },
}));
const NoteSideBar = () => {
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
              <Typography>NOTES</Typography>
            </Grid>
            <Grid item>
              <Add
                onClick={() => {
                  history.push(`/note/${v4()}`);
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
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteSideBar;
