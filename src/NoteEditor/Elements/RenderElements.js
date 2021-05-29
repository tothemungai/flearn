import { Typography } from "@material-ui/core";

const RenderElements = ({ attributes, element, children }) => {
  switch (element.type) {
    case "heading-1":
      return (
        <Typography variant="h1" {...attributes}>
          {children}
        </Typography>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default RenderElements;
