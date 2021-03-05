import React from "react";
import "react-toastify/scss/main.scss";
import HomePage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import "./assets/css/App.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import RestaurantSearch from "./pages/RestaurantSearch";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    navBar: {
      backgroundColor: "#212121",
      color: "white",
      zIndex: theme.zIndex.drawer + 1,
      width: "100%",
      position: "sticky",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div>
      <BrowserRouter>
        <AppBar className={classes.navBar}>
          <Toolbar>
            <Typography variant="h5">
              <Link style={{ textDecoration: "none" }} to="/">
                <span style={{ color: "white", fontWeight: "bold" }}>
                  Zomato Restaurant Search
                </span>
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <ToastContainer />
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route
            exact
            path={"/location/:locationId"}
            component={RestaurantSearch}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
