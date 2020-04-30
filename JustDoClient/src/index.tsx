import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import MainReducer from "./store/reducers/MainReducer";
import { Provider } from "react-redux";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: `http://localhost:4000`,
});

const store = createStore(MainReducer);


const app = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root") as HTMLElement);
serviceWorker.unregister();
