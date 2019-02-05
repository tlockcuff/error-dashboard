import React, { Component } from 'react'

export default class Section extends Component {
  render() {
    return (
      <div className={`pb-4 mb-4 border-bottom ${this.props.className}`}>
        {this.props.title ? <h5 className={`text-muted ${this.props.desc ? 'mb-0' : 'mb-4'}`} style={{ fontSize:18 }}>{this.props.title}</h5> : null }
        {this.props.desc ? <p className="mb-4 text-muted" style={{ fontSize:14 }}>{this.props.desc}</p> : null}
        {this.props.children}
      </div>
    )
  }
}
