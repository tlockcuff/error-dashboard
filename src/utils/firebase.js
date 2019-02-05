import firebase from "firebase/app";
import "firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";

// Initialize firebase app
firebase.initializeApp({
  apiKey: "AIzaSyAxLZhl93YqacpHnoIqjL7OdRlRtEM_D5s",
  authDomain: "mojo-error-tracking.firebaseapp.com",
  databaseURL: "https://mojo-error-tracking.firebaseio.com",
  projectId: "mojo-error-tracking"
});

// Initialize `firestorter`
initFirestorter({ firebase: firebase });

// this is cool, so we can create a single collection here
// import in any component and just use it, you can change
// the path on the fly to load in new data or make dynamic
// queries, etc...

// everything is realtime by default, so any new data that
// comes into a collection or document will be render
// automatically, no need to refetch or reload the page

// export the collections and documents
export const clients = new Collection("clients");
export const errors = new Collection();
export const error = new Document();
