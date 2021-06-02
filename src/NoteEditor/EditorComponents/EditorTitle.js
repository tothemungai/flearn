import { Button, Grid } from "@material-ui/core";
import { NoteManager } from "../../Note/NoteManager";
import NoteName from "./NoteName";

const EditorTitle = ({ note, setNote, value }) => {
  return (
    <Grid container direction="row" alignItems="center" justify="space-between">
      <Grid item>
        <NoteName {...{ note, setNote }} />
      </Grid>
      <Grid item>
        <Button
          onClick={async () => {
            try {
              await NoteManager.saveNote({ ...note, data: value });
            } catch (error) {
              console.log(error);
            }
          }}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditorTitle;
