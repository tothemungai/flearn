import { makeStyles, Typography } from "@material-ui/core";
import { DefaultLeaf } from "slate-react";

const useStyles = makeStyles({
  placeholder: {
    opacity: 0.5,
  },
});
const RenderLeafs = ({ attributes, leaf, children }) => {
  const classes = useStyles();
  if (leaf.bold) {
    children = <b>{children}</b>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underlined) {
    children = <u>{children}</u>;
  }
  if (leaf.placeholder) {
    children = (
      <>
        <DefaultLeaf {...{ attributes, leaf, children }} />
        <span
          style={{ opacity: 0.3, position: "absolute", top: 0, width: "500px" }}
          contentEditable={false}
        >
          Type / to open menu
        </span>
      </>
    );
  }
  return (
    <span {...attributes} style={{ position: "relative", width: "100%" }}>
      {children}
    </span>
  );
};

export default RenderLeafs;
