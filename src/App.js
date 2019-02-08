import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "jquery/dist/jquery.slim";
import "bootstrap/dist/js/bootstrap.bundle";

// Pages
import Client from "./pages/client";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/" exact component={Client} />
          <Route path="/client/:clientId" exact component={Client} />
          <Route path="/client/:clientId/error/:errorId" exact component={Client} />
        </>
      </Router>
    );
  }
}

export default App;
