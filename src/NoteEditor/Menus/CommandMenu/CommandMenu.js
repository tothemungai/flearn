import { Card, List, ListItem, ListItemText, Portal } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { insertBlock } from "../../blocks/blocks";
import commands from "./commands";

const CommandMenu = ({
  target,
  search = "",
  setTarget,
  filteredCommands = [],
  index,
}) => {
  const ref = useRef();
  const editor = useSlate();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (target) {
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.bottom + window.pageYOffset + 10}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    } else {
      el.style.top = `${-9999}px`;
      el.style.left = `${-9999}px`;
    }
  }, [target]);

  return (
    <Portal container={document.body}>
      <Card
        variant="outlined"
        ref={ref}
        style={{
          top: "-9999px",
          left: "-9999px",
          position: "absolute",
          zIndex: 1,
          padding: "3px",
          background: "white",
          borderRadius: "4px",
          boxShadow: "0 1px 5px rgba(0,0,0,.2)",
        }}
      >
        <List component="nav">
          {filteredCommands.length < 1 && (
            <ListItem button disabled>
              <ListItemText primary={"Not found"} />
            </ListItem>
          )}
          {filteredCommands.map((command, commandIndex) => {
            return (
              <ListItem
                button
                selected={index === commandIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  Transforms.select(editor, target);
                  Transforms.delete(editor);
                  insertBlock(editor, command.type, command.meta);
                  setTarget(null);
                }}
              >
                <ListItemText primary={command.displayName} />
              </ListItem>
            );
          })}
        </List>
      </Card>
    </Portal>
  );
};

export default CommandMenu;
