import NoteEditor from "./NoteEditor/NoteEditor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./Routes/routes";
function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => {
          return (
            <Route key={route.path} path={route.path} exact>
              <route.Component />
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
