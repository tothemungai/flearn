import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  styled,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import {
  createEditor,
  Editor,
  Node,
  Range as SlateRange,
  Transforms,
} from "slate";
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
import NoteName from "./EditorComponents/NoteName";
import keyHandler from "./KeyHandler/keyHandler";
import commands from "./Menus/CommandMenu/commands";
import EditorTitle from "./EditorComponents/EditorTitle";
import withLayout from "./Plugins/withLayout";

const useStyles = makeStyles((theme) => ({
  editor: {
    padding: theme.spacing(1),
    minHeight: "100%",
    flexGrow: 1,
  },
}));

const NoteEditor = () => {
  const editor = useMemo(
    () =>
      withLayout(
        withNoteLink(
          withTags(withFlashcards(withBlocks(withReact(createEditor()))))
        )
      ),
    []
  );
  const [note, setNote] = useState("New Note");
  const [value, setValue] = useState([]);
  const [target, setTarget] = useState();
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState(commands);
  const { id: noteId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setFilteredCommands(
      commands.filter((c) =>
        c.displayName.toLowerCase().startsWith(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    Transforms.deselect(editor);
    NoteManager.getNote(noteId)
      .then(({ data }) => {
        const { note } = Boolean(data.note)
          ? data
          : {
              note: {
                data: [
                  {
                    type: "title",
                    children: [{ text: "New Note" }],
                  },
                  {
                    type: "paragraph",
                    children: [{ text: "" }],
                  },
                ],
                name: "New Note",
                id: noteId,
              },
            };
        setNote(note);
        setValue(note.data);
      })
      .catch(console.log);
  }, [location]);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        if (editor.selection && SlateRange.isCollapsed(editor.selection)) {
          const [target, search, index] = configureCommandMenu(editor);
          setTarget(target);
          setSearch(search ? search : "");
        }
        setValue(newValue);
        console.log(newValue);
      }}
    >
      <HoveringToolbar />
      <CommandMenu
        target={target}
        search={search}
        setTarget={setTarget}
        index={index}
        filteredCommands={filteredCommands}
      />

      <Editable
        onKeyDown={(e) =>
          target &&
          keyHandler(e, setIndex, index, filteredCommands, editor, target)
        }
        renderElement={RenderElements}
        renderLeaf={RenderLeafs}
        placeholder={"Type / for commands"}
        decorate={([node, path]) => {
          if (editor.selection != null) {
            if (
              !Editor.isEditor(node) &&
              Editor.string(editor, [path[0]]) === "" &&
              SlateRange.includes(editor.selection, path) &&
              SlateRange.isCollapsed(editor.selection)
            ) {
              return [
                {
                  ...editor.selection,
                  placeholder: true,
                },
              ];
            }
          }
          return [];
        }}
      />
    </Slate>
  );
};

export default NoteEditor;
