import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import FollowingList from ".";

const buildQuery = gql`
  query profiles($where: userWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      bookings {
        status
        id
        profiles {
          id
        }
      }
      favorite {
        id
        profiles {
          id
          age
          email
          channel {
            id
            channelId
            channelType
            follower
            postADay
            audienceSize
            avgEngagement
            responseRate
            followerGrowths {
              recordAt
              value
            }
            like
            name
            avatar
            subscribe
            locationRange {
              location {
                id
                code
              }
              locationRate
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
          fullname
          nickname
          gender
          phone
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
          id: props.getUser.id
        }
      },
      fetchPolicy: "no-cache"
    };
  }
});

export default compose(withGraphql)(FollowingList);
