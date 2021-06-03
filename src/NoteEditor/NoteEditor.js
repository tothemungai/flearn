import { Portal } from "@material-ui/core";
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
import { useLocation, useParams } from "react-router";
import withNoteLink from "./Plugins/withNoteLinks";
import keyHandler from "./KeyHandler/keyHandler";
import commands from "./Menus/CommandMenu/commands";
import withLayout from "./Plugins/withLayout";
import NoteSideBar from "../Notes/NoteSideBar";
import store from "../Store/store";
import { observer } from "mobx-react-lite";
import decorateWithPlaceholders from "./Plugins/decorateWithPlaceholders";
const NoteEditor = observer(() => {
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
  const { id: noteId } = useParams();
  const location = useLocation();
  const [numberOfChanges, setNumberOfChanges] = useState(0);

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
          const [target, search] = configureCommandMenu(editor);
          store.configureHoveringCommandMenu(target, search ? search : "");
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
      <CommandMenu />

      <Editable
        onKeyDown={(e) =>
          keyHandler(e, editor, note, value, resetNumberOfChanges)
        }
        renderElement={RenderElements}
        renderLeaf={RenderLeafs}
        placeholder={"Type / for commands"}
        decorate={(block) => decorateWithPlaceholders(block, editor)}
      />
    </Slate>
  );
});

export default NoteEditor;
