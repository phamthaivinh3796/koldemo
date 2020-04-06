import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import App from ".";

const buildQuery = gql`
  query {
    users {
      id
      email
      password
    }
  }
`;

const withGraphql = graphql(buildQuery);

export default compose(withGraphql)(App);
