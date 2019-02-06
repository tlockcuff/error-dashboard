import React, { Component } from "react";
import { error } from "../utils/firebase";
import { observer } from "mobx-react";
import ErrorName from "../components/error/name";
import ErrorTime from "../components/error/time";
import UserAgent from "../components/error/user-agent";
import Section from "../components/section";
import { TagList, Tag } from "../components/tag";
import { ua } from "../utils/common";
import prettyMs from "pretty-ms";
import ErrorTrace from "../components/error/stack-trace";
import EventTrace from "../components/error/event-trace";
import { Link } from "react-router-dom";

class ErrorDetail extends Component {
  componentDidMount() {
    error.path = `clients/${this.props.match.params.clientId}/errors/${this.props.match.params.errorId}`;
  }

  render() {
    return error.data ? (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mt-3 bg-white px-0 mx-0">
            <li class="breadcrumb-item">
              <Link to="/">Clients</Link>
            </li>
            <li class="breadcrumb-item">
              <Link to={`/client/${this.props.match.params.clientId}`}>{this.props.match.params.clientId}</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {error.data.name}
            </li>
          </ol>
        </nav>

        <Section className="pt-2 d-flex align-items-center">
          <ErrorName name={error.data.name} message={error.data.message} />
          <div className="ml-auto text-right">
            <ErrorTime timestamp={error.data.created} />
          </div>
        </Section>

        <Section>
          <UserAgent agent={error.data.userAgent} />
        </Section>

        <Section title="TAGS">
          <TagList>
            <Tag prefix="browser" text={`${ua(error.data.userAgent).family} ${ua(error.data.userAgent).major}.${ua(error.data.userAgent).minor}.${ua(error.data.userAgent).patch}`} />
            <Tag prefix="os" text={`${ua(error.data.userAgent).os.family} ${ua(error.data.userAgent).os.major}.${ua(error.data.userAgent).os.minor}.${ua(error.data.userAgent).os.patch}`} />
            <Tag prefix="level" text={error.data.name} />
            {error.data.location ? <Tag prefix="origin" linkable text={error.data.location.origin.replace(/"/g, "")} /> : ""}
            {error.data.location ? <Tag prefix="url" linkable text={error.data.location.href.replace(/"/g, "")} /> : ""}
            {error.data.pageTitle ? <Tag prefix="title" text={error.data.pageTitle.replace(/"/g, "")} /> : ""}
          </TagList>
        </Section>

        <Section title="MESSAGE">
          <pre className="m-0 p-0">{error.data.message}</pre>
        </Section>

        <Section title="STACK TRACE">{error.data.error ? <ErrorTrace stack={error.data.error} /> : null}</Section>

        <Section title="EVENT TRACE" desc="">
          {error.data.events && JSON.parse(error.data.events).length > 0 ? <EventTrace events={error.data.events} /> : <p className="text-muted">No event trace was recorded</p>}
        </Section>

        <Section title="TIMING">
          {error.data.timing ? (
            <div>
              The error occured <strong>{prettyMs(parseInt(error.data.timing.errorOccured - error.data.timing.domLoad), { formatSubMs: true })}</strong> after DOM load.
            </div>
          ) : null}
        </Section>

        <Section title="DEVICE">
          {error.data.windowDimensions ? (
            <TagList>
              <Tag prefix="height" text={error.data.windowDimensions.height + "px"} />
              <Tag prefix="width" text={error.data.windowDimensions.width + "px"} />
            </TagList>
          ) : null}
        </Section>

        <Section title="VARIABLES">
          {error.data.oPage ? (
            <TagList>
              <Tag prefix="ContentId" text={error.data.oPage.ContentId} />
              <Tag prefix="TagId" text={error.data.oPage.TagId} />
              <Tag prefix="TagRoot" text={error.data.oPage.TagName.replace(/"/g, "")} />
              {Object.keys(JSON.parse(error.data.oPage.Keys)).map(key => (
                <Tag key={key} prefix={key} text={JSON.parse(error.data.oPage.Keys)[key].replace(/"/g, "")} />
              ))}
            </TagList>
          ) : null}
        </Section>

        <Section title="PLATFORM">
          {error.data.platform ? (
            <TagList>
              <Tag prefix="platform" text={error.data.platform.name.replace(/"/g, "")} />
              <Tag prefix="version" text={error.data.platform.version.replace(/"/g, "")} />
            </TagList>
          ) : null}
        </Section>
      </div>
    ) : null;
  }
}

export default observer(ErrorDetail);
