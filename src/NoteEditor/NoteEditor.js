import {
  Button,
  Container,
  Grid,
  Paper,
  styled,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { createEditor, Range as SlateRange, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import RenderElements from "./Elements/RenderElements";
import RenderLeafs from "./Leafs/RenderLeafs";
import CommandMenu from "./Menus/CommandMenu/CommandMenu";
import configureCommandMenu from "./Menus/CommandMenu/configureCommandMenu";
import HoveringToolbar from "./Menus/HoveringToolbar";
import withBlocks from "./Plugins/withBlocks";
import withFlashcards from "./Plugins/withFlashcards";
import withTags from "./Plugins/withTags";
import { NoteManager } from "../Note/NoteManager";
import { useHistory, useLocation, useParams } from "react-router";
import withNoteLink from "./Plugins/withNoteLinks";
import { v4 } from "uuid";
import NoteName from "./NoteName";
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
    () =>
      withNoteLink(
        withTags(withFlashcards(withBlocks(withReact(createEditor()))))
      ),
    []
  );
  const [note, setNote] = useState("New Note");
  const [value, setValue] = useState([]);
  const [target, setTarget] = useState();
  const [search, setSearch] = useState("");
  const { id: noteId } = useParams();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    NoteManager.getNote(noteId)
      .then(({ data }) => {
        const { note } = Boolean(data.note)
          ? data
          : {
              note: { data: initialEditorValue, name: "New Note", id: noteId },
            };
        Transforms.deselect(editor);
        setNote(note);
        setValue(note.data);
      })
      .catch(console.log);
  }, [location]);
  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <NoteName {...{ note, setNote }} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/note/${v4()}`);
            }}
          >
            New Note
          </Button>
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
