import { Typography } from "@material-ui/core";
import SimpleFlashcard from "./Flashcard/SimpleFlashcard";

const RenderElements = ({ attributes, element, children }) => {
  switch (element.type) {
    case "heading-1":
      return (
        <Typography variant="h1" {...attributes}>
          {children}
        </Typography>
      );
    case "flashcard":
      return <SimpleFlashcard {...{ attributes, element, children }} />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};

export default RenderElements;
