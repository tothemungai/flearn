import { Grid, TextField, Typography } from "@material-ui/core";
import isHotkey from "is-hotkey";
import { useEffect, useState } from "react";

const NoteName = ({ note, setNote }) => {
  const [edit, setEdit] = useState(false);
  const [noteName, setNoteName] = useState(note.name);

  useEffect(() => {
    setNoteName(note.name);
  }, [note]);
  if (edit) {
    return (
      <TextField
        id="standard-basic"
        label="Standard"
        value={noteName}
        onChange={(e) => {
          setNoteName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (isHotkey("Enter", e)) {
            setNote({ ...note, name: noteName });
            setEdit(false);
          }
        }}
      />
    );
  } else {
    return (
      <Typography
        onClick={() => setEdit(true)}
        variant="h3"
        style={{ marginTop: ".5em" }}
      >
        {note.name}
      </Typography>
    );
  }
};

export default NoteName;
