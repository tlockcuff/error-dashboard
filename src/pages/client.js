import React, { Component } from "react";
import { Link } from "react-router-dom";
import { errors } from "../utils/firebase";
import { observer } from "mobx-react";
import ErrorTime from "../components/error/time";

class Client extends Component {
  componentDidMount() {
    errors.path = `clients/${this.props.match.params.clientId}/errors`;
    errors.query = ref => ref.orderBy("created", "desc");
  }

  render() {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mt-3 bg-white px-0 mx-0">
            <li class="breadcrumb-item">
              <Link to="/">Clients</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {this.props.match.params.clientId}
            </li>
          </ol>
        </nav>

        <h1 className="pt-2 pb-4">{this.props.match.params.clientId} Errors</h1>
        <table className="table table-striped table-hover w-100">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Message</th>
              <th scope="col">URL</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {errors.docs.map(doc => (
              <tr key={doc.id}>
                <td style={{ verticalAlign: "middle" }}>{doc.data.name}</td>
                <td style={{ verticalAlign: "middle" }}>
                  <Link to={`/client/${this.props.match.params.clientId}/error/${doc.id}`}>{doc.data.message}</Link>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <a href={doc.data.location.href.replace(/"/g, "")} target="_blank" rel="noopener noreferrer">
                    {doc.data.location.href.replace(/"/g, "")}
                  </a>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <ErrorTime timestamp={doc.data.created} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default observer(Client);
