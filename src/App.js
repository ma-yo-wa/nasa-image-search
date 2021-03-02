import React from "react";
import Search from "./pages/Search";
import Gallery from "./pages/Gallery";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/gallery" component={Gallery} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
