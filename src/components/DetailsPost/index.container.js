import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import DetailsKol from ".";

const buildQuery = gql`
  query profile($where: profileWhereUniqueInput!) {
    profile(where: $where) {
      id
      age
      email
      fullname
      nickname
      gender
      birthday
      phone
      category {
        id
        name
      }

      location {
        id
        name
      }
      occupation {
        id
        name
      }
      channel {
        id
        channelId
        channelType
        follower
        followerGrowth
        like
        name
        avatar
        audienceSize
        subscribe
        locationRange {
          location {
            id
            code
            name
          }
          locationRate
        }
        ageRange {
          value
          ageGroup
        }
        genderRange {
          value
          gender
        }
        post {
          id
          title
          content
          caption
          description
          attachment
          url
          authorName
          authorId
          sourceName
          publishedAt
          postId
          likes
          shares
          comments
        }
      }
    }
  }
`;

const withGraphql = graphql(buildQuery, {
  options: props => {
    return {
      variables: {
        where: {
          id: props.kolId
        }
      },
      fetchPolicy: "no-cache"
    };
  }
});

export default compose(withGraphql)(DetailsKol);
