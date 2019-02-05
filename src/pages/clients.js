import React, { Component } from "react";
import { clients } from "../utils/firebase";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

class Clients extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="py-4">Clients</h1>

        <ul className="list-group">
          {clients.docs.map(doc => (
            <li className="list-group-item" key={doc.id}>
              <Link to={`/client/${doc.id}`}>{doc.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default observer(Clients);
