import React, { Component } from "react";

export default class ErrorName extends Component {
  render() {
    return (
      <div>
        <h5 className="m-0 p-0 text-primary">{this.props.message}</h5>
        <p className="mb-1">{this.props.name}</p>
      </div>
    );
  }
}
