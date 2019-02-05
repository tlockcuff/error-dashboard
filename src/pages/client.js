import React, { Component } from "react";
import { Link } from "react-router-dom";
import { errors } from "../utils/firebase";
import { observer } from "mobx-react";

class Client extends Component {
  render() {
    // this is pretty cool, it's an observable so we can
    // just dynamically update the path of the errors collection
    // and it will auto load the new collection data
    errors.path = `clients/${this.props.match.params.clientId}/errors`;
    // errors.query = (ref) => ref.orderBy('name').startAt('Err').endAt('Err' + '\uf8ff')

    return (
      <div className="container-fluid">
        <h1 className="py-4">{this.props.match.params.clientId} Errors</h1>
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Message</th>
              <th scope="col">URL</th>
              <th scope="col">Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {errors.docs.map(doc => (
              <tr key={doc.id}>
                <th scope="row">
                  <Link to={`/client/${this.props.match.params.clientId}/error/${doc.id}`}>{doc.data.name}</Link>
                </th>
                <td>{doc.data.message}</td>
                <td>{doc.data.location.href}</td>
                <td> {doc.data.created}</td>
                <td>
                  <pre>{JSON.stringify(doc.data, null, 2)}</pre>
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
