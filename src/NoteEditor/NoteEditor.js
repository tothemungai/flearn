import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Portal,
  styled,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useRef, useState } from "react";
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
import NoteSideBar from "../Notes/NoteSideBar";

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
  const [numberOfChanges, setNumberOfChanges] = useState(0);

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
                    children: [{ text: "" }],
                  },
                  {
                    type: "paragraph",
                    children: [{ text: "" }],
                  },
                ],
                id: noteId,
              },
            };
        setNote(note);
        setValue(note.data);
      })
      .catch(console.log);
  }, [location]);

  const resetNumberOfChanges = () => {
    setNumberOfChanges(0);
  };

  const incrementNumberOfChanges = () => {
    setNumberOfChanges(numberOfChanges + 1);
  };
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
        //save to db after every 10 changes
        if (numberOfChanges >= 10) {
          NoteManager.saveNote({ ...note, data: value }).catch(console.log);
          resetNumberOfChanges();
        } else {
          incrementNumberOfChanges();
        }
      }}
    >
      <Portal container={document.getElementById("sidebar")}>
        <NoteSideBar
          {...{
            note,
            value,
            numberOfChanges,
          }}
        />
      </Portal>
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
          keyHandler(
            e,
            setIndex,
            index,
            filteredCommands,
            editor,
            target,
            note,
            value,
            resetNumberOfChanges
          )
        }
        renderElement={RenderElements}
        renderLeaf={RenderLeafs}
        placeholder={"Type / for commands"}
        decorate={([node, path]) => {
          if (!Editor.isEditor(node)) {
            const [parent] = Editor.above(editor, { at: path });
            if (
              parent.type === "title" &&
              Editor.string(editor, path).trim() === ""
            ) {
              return [
                {
                  anchor: {
                    path,
                    offset: 0,
                  },

                  focus: {
                    path,
                    offset: 0,
                  },
                  placeholderTitle: true,
                },
              ];
            }
          }
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
