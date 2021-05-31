import NoteEditor from "../NoteEditor/NoteEditor";

const routes = [
  {
    path: "/",
    Component: () => <h1>List of notes here</h1>,
  },
  {
    path: "/note/:id",
    Component: NoteEditor,
  },
];

export default routes;
