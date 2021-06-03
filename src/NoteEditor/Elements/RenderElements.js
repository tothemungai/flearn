import { Typography } from "@material-ui/core";
import SimpleFlashcard from "./Flashcard/SimpleFlashcard";
import NoteLink from "./NoteLink/NoteLink";
import Tag from "./Tag/Tag";
import { Node } from "slate";

const RenderElements = ({ attributes, element, children }) => {
  switch (element.type) {
    case "title":
      return (
        <Typography variant={"h3"} {...attributes}>
          {children}
        </Typography>
      );
    case "heading-1":
      return (
        <Typography variant="h1" {...attributes}>
          {children}
        </Typography>
      );
    case "flashcard":
      return <SimpleFlashcard {...{ attributes, element, children }} />;
    case "tag":
      return <Tag {...{ attributes, element, children }} />;
    case "note-link":
      return <NoteLink {...{ attributes, element, children }} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default RenderElements;
