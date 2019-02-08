import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/custom.css";
import netlifyIdentity from "netlify-identity-widget";

netlifyIdentity.init();

ReactDOM.render(<App />, document.getElementById("root"));
