import React, { Component } from "react";
import { error } from "../utils/firebase";
import { observer } from "mobx-react";

class ErrorDetail extends Component {
  render() {
    error.path = `clients/${this.props.match.params.clientId}/errors/${this.props.match.params.errorId}`;

    return (
      <div className="container-fluid">
        <h1 className="py-4">
          {error.data.name} | {error.data.message} ({error.data.mode})
        </h1>
        <pre>{JSON.stringify(error.data, null, 2)}</pre>
      </div>
    );
  }
}

export default observer(ErrorDetail);
