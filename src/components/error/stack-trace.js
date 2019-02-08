import React, { Component } from "react";
import stacktracey from "stacktracey";

class ErrorTrace extends Component {
  state = { frames: [] };

  componentDidMount() {
    const stackTrace = new stacktracey(this.props.stack);
    this.setState({ frames: stackTrace });
  }

  render() {
    return this.state.frames.length > 0 ? (
      <div>
        {this.props.stack.includes("localhost") ? <small className="text-muted mb-1">This stack trace contains minifed source code.</small> : null}
        <pre className="border rounded px-3 py-2 m-0">{this.props.stack}</pre>
      </div>
    ) : null;
  }
}

export default ErrorTrace;
