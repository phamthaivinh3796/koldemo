import React from "react";
import ReactDOM from "react-dom";
import App from "./routers/index.container";
import { Router } from "react-router-dom";
import { GlobalStyle } from "./globalStyle";
import { createBrowserHistory } from "history";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { split, from } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();

const httpLink = new HttpLink({
  uri: `http://kols-api.kompa.vn/graphql`
});

const wsLink = new WebSocketLink({
  uri: `ws://kols-api.kompa.vn/graphql`,
  options: {
    reconnect: true
  }
});

const cache = new InMemoryCache();

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: from([link]),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
      <GlobalStyle />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
