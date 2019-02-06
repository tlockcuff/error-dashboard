import React, { Component } from "react";
import { clients } from "../utils/firebase";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { distanceInWordsToNow } from "date-fns";

class Clients extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="py-4">Clients</h1>

        <table className="table table-striped table-hover w-100">
          <thead>
            <tr>
              <th />
              <th>Client</th>
              <th>Domain</th>
              <th>Last Error</th>
            </tr>
          </thead>
          <tbody>
            {clients.docs.map(doc => (
              <tr key={doc.id}>
                <td style={{ verticalAlign: "middle" }}>
                  <Link to={`/client/${doc.id}`}>
                    <img src={`${doc.data.domain}/images/_fav-icon.png`} style={{ height: 35 }} className="card-top img-fluid rounded" />
                  </Link>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <Link to={`/client/${doc.id}`}>{doc.id}</Link>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <a href={doc.data.domain} target="_blank" rel="noopener noreferrer">
                    {doc.data.domain}
                  </a>
                </td>
                <td style={{ verticalAlign: "middle" }}>{distanceInWordsToNow(parseInt(doc.data.lastUpdated), { addSuffix: true })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default observer(Clients);
