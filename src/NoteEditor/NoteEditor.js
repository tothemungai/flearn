import { Container, Grid, Paper, styled, Typography } from "@material-ui/core";
import { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
const initialEditorValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const StyledEditorPaper = styled(Paper)({
  padding: "1em",
  margin: "2em 0em",
  height: "500px",
});

const NoteEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialEditorValue);
  return (
    <Container maxWidth="sm">
      <Grid container direction="row" justify="center">
        <Typography variant="h3" style={{ marginTop: ".5em" }}>
          Note Editor
        </Typography>
      </Grid>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <StyledEditorPaper elevation={0} variant="outlined">
          <Editable />
        </StyledEditorPaper>
      </Slate>
    </Container>
  );
};

export default NoteEditor;
