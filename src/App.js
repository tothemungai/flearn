import NoteEditor from "./NoteEditor/NoteEditor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./Routes/routes";
import { Grid } from "@material-ui/core";
import NoteSideBar from "./Notes/NoteSideBar";
function App() {
  return (
    <Router>
      <Grid container justify="center">
        <Grid item sm={4}>
          <NoteSideBar />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Switch>
            {routes.map((route) => {
              return (
                <Route key={route.path} path={route.path} exact>
                  <route.Component />
                </Route>
              );
            })}
          </Switch>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
