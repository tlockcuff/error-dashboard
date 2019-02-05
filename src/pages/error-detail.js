import React, { Component } from "react";
import { error } from "../utils/firebase";
import { observer } from "mobx-react";
import ErrorName from "../components/error/name";
import ErrorTime from "../components/error/time";
import UserAgent from "../components/error/user-agent";
import Section from "../components/section";
import { TagList, Tag } from "../components/tag";
import { ua } from '../utils/common'
import prettyMs from 'pretty-ms';

class ErrorDetail extends Component {
  render() {
    error.path = `clients/${this.props.match.params.clientId}/errors/${this.props.match.params.errorId}`;

    console.log(error.data)

    return error.data ? (
      <div className="container">

        <Section className="pt-4 d-flex align-items-center">
          <ErrorName name={error.data.name} message={error.data.message}></ErrorName>
          <div className="ml-auto text-right">
            <ErrorTime timestamp={error.data.created}></ErrorTime>
          </div>
        </Section>

        <Section>
          <UserAgent agent={error.data.userAgent}></UserAgent>
        </Section>

        <Section title="TAGS">
          <TagList>
            <Tag prefix="browser" text={`${ua(error.data.userAgent).family} ${ua(error.data.userAgent).major}.${ua(error.data.userAgent).minor}.${ua(error.data.userAgent).patch}`}></Tag>
            <Tag prefix="os" text={`${ua(error.data.userAgent).os.family} ${ua(error.data.userAgent).os.major}.${ua(error.data.userAgent).os.minor}.${ua(error.data.userAgent).os.patch}`}></Tag>
            <Tag prefix="level" text={error.data.name}></Tag>
            {error.data.location ? <Tag prefix="origin" linkable text={error.data.location.origin.replace(/"/g, '')}></Tag> : ''}
            {error.data.location ? <Tag prefix="url" linkable text={error.data.location.href.replace(/"/g, '')}></Tag> : ''}
            {error.data.pageTitle ? <Tag prefix="title" text={error.data.pageTitle.replace(/"/g, '')}></Tag> : ''}
          </TagList>
        </Section>

        <Section title="MESSAGE">
          <pre className="m-0 p-0">{error.data.message}</pre>
        </Section>

        <Section title="STACK TRACE">
          {error.data.stack ? (
            <pre className="bg-light border p-2 rounded">
              {JSON.parse(error.data.stack).map((o, i) => (
                <div key={i}>
                  <div>{o.url}</div>
                </div>
              ))}
            </pre>
          ) : null}
        </Section>

        <Section title="TIMELINE" desc="">

        TODO<br/>
        - Show events in order of how they happend<br/>
        - Add event trace is available
          
        </Section>

        <Section title="EVENT TRACE" desc="">
          {error.data.events ? (
            <div>
              {JSON.parse(error.data.events).map((o, i) => (
                <div key={i} className="px-2 mb-3 d-flex flex-column">
                  <div className="d-flex">
                    <TagList>
                      <Tag prefix="event.type" text={o.type}></Tag>
                      <Tag prefix="when" text={`${prettyMs(parseInt(o.timing.afterLoad), { formatSubMs: true })} after DOM load`}></Tag>
                    </TagList>
                  </div>
                  <div>
                    <div><pre className="bg-light border p-2 rounded" style={{ maxHeight: 150 }}>{o.html}</pre></div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </Section>

        <Section title="TIMING">
          {error.data.timing ? (
            <div>
              <div>The error occured <strong>{prettyMs(parseInt(error.data.timing.errorOccured - error.data.timing.domLoad), { formatSubMs: true })}</strong> after DOM load.</div>
            </div>
          ) : null}
        </Section>

        <Section title="DEVICE">
          {error.data.windowDimensions ? (
            <TagList>
              <Tag prefix="height" text={error.data.windowDimensions.height + 'px'}></Tag>
              <Tag prefix="width" text={error.data.windowDimensions.width + 'px'}></Tag>
            </TagList>
          ) : null}
        </Section>


        <Section title="QUERY STRING">
         TODO (parse the href being passed in)
        </Section>

        <Section title="VARIABLES">
          {error.data.oPage ? (
            <TagList>
              <Tag prefix="ContentId" text={error.data.oPage.ContentId}></Tag>
              <Tag prefix="TagId" text={error.data.oPage.TagId}></Tag>
              <Tag prefix="TagRoot" text={error.data.oPage.TagName.replace(/"/g, '')}></Tag>
              {Object.keys(JSON.parse(error.data.oPage.Keys)).map(key => (
                <Tag key={key} prefix={key} text={JSON.parse(error.data.oPage.Keys)[key].replace(/"/g, '')}></Tag>
              ))}
            </TagList>
          ) : null}
        </Section>

        <Section title="PLATFORM">
          {error.data.platform ? (
            <TagList>
              <Tag prefix="platform" text={error.data.platform.name.replace(/"/g, '')}></Tag>
              <Tag prefix="version" text={error.data.platform.version.replace(/"/g, '')}></Tag>
            </TagList>
          ) : null}
        </Section>

      </div>
    ) : null;
  }
}

export default observer(ErrorDetail);

