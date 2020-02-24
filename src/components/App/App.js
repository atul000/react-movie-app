import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../elements/Header/Header";
import Home from "../Home/Home";
import NotFound from "../elements/NotFound/NotFound";
import Movie from "../Movie/Movie";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:movieId" component={Movie} exact />
          <Route exact component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
