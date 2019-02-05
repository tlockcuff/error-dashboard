import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import Header from "./components/header";

// Pages
import Client from "./pages/client";
import ErrorDetail from "./pages/error-detail";
import Clients from "./pages/clients";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <Route path="/" exact component={Clients} />
          <Route path="/client/:clientId" exact component={Client} />
          <Route path="/client/:clientId/error/:errorId" exact component={ErrorDetail} />
        </>
      </Router>
    );
  }
}

export default App;
