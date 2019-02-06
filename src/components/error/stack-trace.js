import React, { Component } from "react";
import stacktracey from "stacktracey";
import "../../styles/traceback.css";

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
        <div className="traceback in-app-traceback border rounded">
          {console.log(this.props.stack)}
          <ul style={{ margin: 0, padding: 0 }}>
            <li className="frame is-expandable expanded javascript">
              {this.state.frames[0].fileName ? (
                <div className="title">
                  <code className="filename">
                    <span className=" truncated">
                      <span className="short-value">{this.state.frames[0].fileName}</span>
                    </span>
                  </code>
                </div>
              ) : null}
              <ol start={this.state.frames[0].line} className="context expanded">
                {this.state.frames.map((o, i) => (
                  <li className={`expandable`} key={i}>
                    <span className="contextline">{o.beforeParse}</span>
                  </li>
                ))}
              </ol>
            </li>
          </ul>
        </div>
      </div>
    ) : null;
  }
}

export default ErrorTrace;
