const RenderLeafs = ({ attributes, leaf, children }) => {
  if (leaf.bold) {
    children = <b>{children}</b>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underlined) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

export default RenderLeafs;
