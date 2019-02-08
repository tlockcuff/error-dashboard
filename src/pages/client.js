import React, { Component } from "react";
import { Link } from "react-router-dom";
import { clients, errors, error } from "../utils/firebase";
import { observer } from "mobx-react";
import ErrorTime from "../components/error/time";
import ErrorDetail from "../components/error/error-detail";
import { distanceInWordsToNow } from "date-fns";

class Client extends Component {
  componentWillMount() {
    if (this.props.match.params.clientId) {
      this.loadClientErrors();
    }
  }

  // if the clientId in route change load in the new errors
  componentDidUpdate(prevProps) {
    if (this.props.match.params.clientId !== prevProps.match.params.clientId) {
      this.loadClientErrors();
    } else if (this.props.match.params.errorId !== prevProps.match.params.errorId) {
      this.loadError();
    }
  }

  loadClientErrors() {
    errors.path = `clients/${this.props.match.params.clientId}/errors`;
    errors.query = ref => ref.orderBy("created", "desc").limit(200);
    if (this.props.match.params.errorId) {
      this.loadError();
    }
  }

  loadError() {
    error.path = `clients/${this.props.match.params.clientId}/errors/${this.props.match.params.errorId}`;
  }

  findLogo(doc) {
    return doc ? `${doc.data.domain}/images/_fav-icon.png` : null;
  }
  findLastUpdate(doc) {
    return doc ? `${distanceInWordsToNow(new Date(parseInt(doc.data.lastUpdated)), { addSuffix: true })}` : null;
  }

  render() {
    return (
      <div className="">
        <div className="d-flex">
          <div className="w-25 pr-0 border-right bg-white">
            <div className="dropdown border-bottom">
              <a className="client-picker dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img
                  src={this.findLogo(clients.docs.find(doc => doc.id === this.props.match.params.clientId)) || ""}
                  className="rounded"
                  style={{ width: 28, position: "relative", top: "-2px", marginRight: 12 }}
                  alt=""
                />
                {this.props.match.params.clientId || "Select Client"}
                <small>{this.findLastUpdate(clients.docs.find(doc => doc.id === this.props.match.params.clientId)) || ""}</small>
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {clients.docs.map(doc => (
                  <Link className="dropdown-item d-flex justify-content-between align-items-center" key={doc.id} to={`/client/${doc.id}`}>
                    <div style={{ whiteSpace: "normal" }}>
                      <img src={`${doc.data.domain}/images/_fav-icon.png`} className="rounded" style={{ width: 28, position: "relative", top: "-2px", marginRight: 12 }} alt="" />
                      {doc.id}
                    </div>
                    <div>
                      <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                        {distanceInWordsToNow(new Date(parseInt(doc.data.lastUpdated)), { addSuffix: true })}
                      </small>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ height: "calc(100vh - 76px)", overflow: " scroll" }}>
              {errors.isLoading ? (
                <div className="text-center py-3">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {errors.docs.map(doc => (
                    <li
                      className={`list-group-item list-group-item-action d-flex align-items-start justify-content-between ${this.props.match.params.errorId === doc.id ? "bg-light" : ""}`}
                      style={{ cursor: "pointer" }}
                      key={doc.id}
                      onClick={() => {
                        this.props.history.push(`/client/${this.props.match.params.clientId}/error/${doc.id}`);
                      }}
                    >
                      <div>
                        <h5 className={`${this.props.match.params.errorId === doc.id ? "text-primary" : ""}`}>{doc.data.message}</h5>
                        <ErrorTime timestamp={doc.data.created} />
                      </div>
                      <span className="badge badge-danger badge-pill">{doc.data.name}</span>
                    </li>
                  ))}
                  {this.props.match.params.clientId ? <small className="text-center py-4 text-muted">Showing the last 200 errors</small> : null}
                </ul>
              )}
            </div>
          </div>
          <div className="w-75 bg-light p-3" style={{ height: "100vh", overflow: " scroll" }}>
            {this.props.match.params.errorId ? <ErrorDetail error={error} /> : <div className="text-center p-5">Select an error to view it's details</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default observer(Client);
