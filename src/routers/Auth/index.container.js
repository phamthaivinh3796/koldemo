import { compose } from "recompose";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import BookingManagement from ".";

const buildQuery = gql`
query profiles($where: userWhereUniqueInput!){
  profiles {
    id
    age
    email
    channel{
      id
      channelId
      channelType
      follower
      postADay
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
        location{
          id
          code
        }
        locationRate
      }
      post(first: 1) {
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
    occupation{
      id
      name
    }
    fullname
    nickname
    gender
    phone
  }
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
    bookings {
      profiles {
        id
        age
        email
        channel{
          id
          channelId
          channelType
          follower
          postADay
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
            location{
              id
              code
            }
            locationRate
          }
          post(first: 1) {
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
        occupation{
          id
          name
        }
        fullname
        nickname
        gender
        phone
      }
    }
    favorite {
      profiles {
        id
        age
        email
        channel{
          id
          channelId
          channelType
          follower
          postADay
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
            location{
              id
              code
            }
            locationRate
          }
          post(first: 1) {
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
        occupation{
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
          id: 1
        }
      },
      fetchPolicy: "no-cache"
    };
  }
});

export default compose(withGraphql)(BookingManagement);