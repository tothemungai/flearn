import NoteEditor from "./NoteEditor/NoteEditor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./Routes/routes";
import { Container, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import NoteSideBar from "./Notes/NoteSideBar";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
}));
function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container classes={{ root: classes.container }}>
          <Grid container justify="center" spacing={theme.spacing(1)}>
            <Grid item sm={3}>
              <div id="sidebar" />
            </Grid>
            <Grid item xs={12} sm={9}>
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
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
