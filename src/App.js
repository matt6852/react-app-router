import React from "react";
import { useGlobalContext } from "./context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleCocktail from "./pages/SingleCocktail";
import Error from "./pages/Error";
// import components
import Navbar from "./components/Navbar";
import Contacts from "./pages/Contacts";

function App() {
  const { showContent, setShowContent } = useGlobalContext();
  return (
    <Router>
      <Navbar />
      <div className={`container-start ${showContent && "disapire"}`}>
        <button
          className="btn-start"
          onClick={() => setShowContent(!showContent)}
        >
          let's get started
        </button>
      </div>
      {showContent && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contacts">
            <Contacts />
          </Route>
          <Route path="/cocktail/:id">
            <SingleCocktail />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default App;
