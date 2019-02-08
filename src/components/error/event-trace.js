import React, { Component } from "react";
import { TagList, Tag } from "../tag";
import prettyMs from "pretty-ms";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/xml/xml";
import { html_beautify } from "js-beautify";

class EventTrace extends Component {
  render() {
    return (
      <div className="event-trace">
        <div className="event-trace-marker" title="This is the start of event trace">
          start
        </div>
        {JSON.parse(this.props.events).map((o, i) => (
          <div key={i} className="event-trace-item p-3 mb-3 border rounded" title={i}>
            <div className="d-flex">
              <TagList>
                <Tag prefix="type" text={o.type} />
                <Tag prefix="tag" text={o.tagName} />
                <Tag prefix="timestamp" text={`${prettyMs(parseInt(o.timing.afterLoad), { formatSubMs: true })} after DOM load`} />
              </TagList>
            </div>
            <div className="border rounded" style={{ maxHeight: 180, overflowY: "auto" }}>
              <CodeMirror value={html_beautify(o.html) + '...'} options={{ readOnly: true, mode: "xml", theme: "ttcn", lineNumbers: true }} />
            </div>
          </div>
        ))}
        <div className="event-trace-marker" title="this is the end of the event trace">
          end
        </div>
      </div>
    );
  }
}

export default EventTrace;
