import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import { useState } from "react";
import { Editor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { insertBlock } from "../../blocks/blocks";

const Flashcard = ({ element, attributes, children }) => {
  const [open, setOpen] = useState(false);
  const [flashcard, setFlashcard] = useState({
    question: element.question,
    answer: element.answer,
  });
  const editor = useSlate();
  console.log(element);
  return (
    <span contentEditable={false} {...attributes}>
      <Chip
        icon={<HelpOutline />}
        clickable={true}
        size={"small"}
        label={flashcard.question === "" ? "UNSET" : flashcard.question}
        variant="outlined"
        color={flashcard.question === "" ? "secondary" : "primary"}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="form-dialog-title">Flashcard</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            value={flashcard.question}
            onChange={(e) =>
              setFlashcard({ ...flashcard, question: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="answer"
            label="Answer"
            type="text"
            fullWidth
            value={flashcard.answer}
            onChange={(e) =>
              setFlashcard({ ...flashcard, answer: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const path = ReactEditor.findPath(editor, element);
              Transforms.setNodes(editor, { ...flashcard }, { at: path });
              setOpen(false);
            }}
            color="primary"
          >
            Set
          </Button>
        </DialogActions>
      </Dialog>
      <span>{children}</span>
    </span>
  );
};

export default Flashcard;
