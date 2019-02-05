import React, { Component } from 'react'

export default class ErrorName extends Component {
  render() {
    return (
      <div>
        <h4 className="mb-1 text-primary">{this.props.name}</h4>
        <p className="m-0 p-0"><pre>{this.props.message}</pre></p>
      </div>
    )
  }
}
