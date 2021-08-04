import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import About from "./About";
import "./App.css";
import Home from "./Home";
import LogIn from "./LogIn";
import MyFridge from "./MyFridge";

function App() {
  return (
    <Router>
      <div className="App container">
        <nav className="navbar navbar-default navbar-fixed-top">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/MyFridge">My Fridge</Link>
            </li>
            <li>
              <Link to="/LogIn">Log In</Link>
            </li> 
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/MyFridge">
            <MyFridge />
          </Route>
          <Route path="/LogIn">
            <LogIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </div>
     
    </Router>
  );
}

export default App;
