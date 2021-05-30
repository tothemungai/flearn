import { Container, Grid, Paper, styled, Typography } from "@material-ui/core";
import isHotkey from "is-hotkey";
import { useMemo, useState } from "react";
import { createEditor, Range as SlateRange } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import RenderElements from "./Elements/RenderElements";
import RenderLeafs from "./Leafs/RenderLeafs";
import CommandMenu from "./Menus/CommandMenu/CommandMenu";
import configureCommandMenu from "./Menus/CommandMenu/configureCommandMenu";
import HoveringToolbar from "./Menus/HoveringToolbar";
import { insertBlock } from "./blocks/blocks";
import withBlocks from "./Plugins/withBlocks";
import withFlashcards from "./Plugins/withFlashcards";
import withTags from "./Plugins/withTags";
const initialEditorValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "A line of text in a paragraph. ",
      },
    ],
  },
];

const StyledEditorPaper = styled(Paper)({
  padding: "1em",
  margin: "2em 0em",
  height: "500px",
});

const NoteEditor = () => {
  const editor = useMemo(
    () => withTags(withFlashcards(withBlocks(withReact(createEditor())))),
    []
  );
  const [value, setValue] = useState(initialEditorValue);
  const [target, setTarget] = useState();
  const [search, setSearch] = useState("");
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
        onChange={(newValue) => {
          if (editor.selection && SlateRange.isCollapsed(editor.selection)) {
            const [target, search, index] = configureCommandMenu(editor);
            setTarget(target);
            setSearch(search ? search : "");
            setValue(newValue);
          }
          console.log(newValue);
        }}
      >
        <HoveringToolbar />
        <CommandMenu target={target} search={search} setTarget={setTarget} />
        <StyledEditorPaper elevation={0} variant="outlined">
          <Editable renderElement={RenderElements} renderLeaf={RenderLeafs} />
        </StyledEditorPaper>
      </Slate>
    </Container>
  );
};

export default NoteEditor;
