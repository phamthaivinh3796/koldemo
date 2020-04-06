import React, { Component } from "react";
import Styles from "./index.style";
import { numberWithCommas } from "../../utils";
import { Zoom } from "animate-components";
import { NotificationManager } from "react-notifications";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import moment from "moment";

const FAVORITE = gql`
  mutation createOnefavorite($data: favoriteCreateInput!) {
    createOnefavorite(data: $data) {
      id
      profiles {
        id
        fullname
      }
    }
  }
`;

const FAVORITE_ADD = gql`
  mutation updateOnefavorite(
    $data: favoriteUpdateInput!
    $where: favoriteWhereUniqueInput!
  ) {
    updateOnefavorite(data: $data, where: $where) {
      id
      profiles {
        id
        fullname
      }
    }
  }
`;

const BOOKING = gql`
  mutation createOneBooking($data: BookingCreateInput!) {
    createOneBooking(data: $data) {
      status
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
          avgEngagement
          audienceSize
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
`;

// const REMOVE_BOOKING = gql`
// mutation deleteOneBooking($where: BookingWhereUniqueInput!){
//   deleteOneBooking(where: $where){
//     id
//   }
// }
// `;

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChannel:
        props.item.channel.length > 0
          ? props.item.channel[0].channelType
          : null,
      isFavorite: this.props.isFavorite,
      isBooking: this.props.isBooking,
      dropdownOpen: false
    };
  }

  setDropdownOpen = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  createFavorite = (name, API, id, data) => {
    API({
      variables: {
        data: {
          user: {
            connect: {
              id: this.props.getUser.id
            }
          },
          profiles: {
            connect: {
              id: id
            }
          }
        }
      }
    })
      .then(response => {
        this.props.updateUser &&
          this.props.updateUser(id, !this.state.isFavorite);
        this.setState({
          isFavorite: !this.state.isFavorite
        });
        NotificationManager.success(
          "",
          `Added "${name}" to your favorite list`,
          1000
        );
      })
      .catch(error => {})
      .finally(() => {});
  };

  changeFavorite = (name, API, id, data) => {
    if (this.state.isFavorite) {
      API({
        variables: {
          data: {
            profiles: {
              disconnect: {
                id: id
              }
            }
          },
          where: {
            id: this.props.getUser.id
          }
        }
      })
        .then(response => {
          this.props.updateUser &&
            this.props.updateUser(id, !this.state.isFavorite);
          this.props.removeFavoriteCount &&
            this.props.removeFavoriteCount(data);
          NotificationManager.info(
            "",
            `Removed "${name}" to your favorite list`,
            1000
          );
          this.setState({
            isFavorite: !this.state.isFavorite
          });
        })
        .catch(error => {})
        .finally(() => {});
    } else {
      if (this.props.countFavorite < 20) {
        API({
          variables: {
            data: {
              profiles: {
                connect: {
                  id: id
                }
              }
            },
            where: {
              id: this.props.getUser.id
            }
          }
        })
          .then(response => {
            this.props.updateUser &&
              this.props.updateUser(id, !this.state.isFavorite);
            this.props.setFavoriteCount &&
              this.props.setFavoriteCount(response.data.updateOnefavorite);
            NotificationManager.success(
              "",
              `Added "${name}" to your favorite list`,
              2000
            );
            this.setState({
              isFavorite: !this.state.isFavorite
            });
          })
          .catch(error => {})
          .finally(() => {});
      } else {
        console.log(this.props);
        NotificationManager.error("", `Limit 20 Kols per Favorite list`, 1000);
      }
    }
  };

  createOneBooking = (name, API, id, data) => {
    API({
      variables: {
        data: {
          user: {
            connect: {
              id: this.props.getUser.id
            }
          },
          profiles: {
            connect: {
              id: id
            }
          }
        }
      }
    })
      .then(response => {
        this.setState({
          isBooking: !this.state.isBooking
        });
        this.props.updateBooking &&
          this.props.updateBooking(response.data.createOneBooking);
        NotificationManager.success(
          "",
          `Added "${name}" to your booking list`,
          2000
        );
      })
      .catch(error => {})
      .finally(() => {});
  };

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  handleChangeActiveChannge = value => {
    this.setState({
      activeChannel: value
    });
  };

  render() {
    const {
      id,
      channel,
      occupation,
      location,
      fullname,
      nickname,
      gender,
      category
    } = this.props.item;
    console.log(this.props.countFavorite);


    const durationCard = 0.7;
    const jobs = occupation.map(item => item.name);
    const getChannelProfile = channel.length > 0 ? channel[0] : null;
    const avatarDefaultFemale =
      "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlbYnjYkOGWAFMyLJYfk1ELJ3TOS-Y41DHOCfWaIWrZMg6YHHKbdiv5MTUhGiEHP7o&_nc_ht=scontent.fsgn2-4.fna&oh=e82d0d3a762257417afb5e16da907dfa&oe=5EF4FEAC";
    const avatarDefaultMale =
      "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlJG8CNTJrV4CzRigIDY9qFLMWABcsB1KXEeHhqf1LHWGmfq__KoMRnO-LWjBTSKWU&_nc_ht=scontent.fsgn2-4.fna&oh=96c95bcd3c1d2de144ebe65484b46efd&oe=5EEE617C";
    const defaultAvatar =
      gender === "male" ? avatarDefaultMale : avatarDefaultFemale;

    const getPosts = channel.find(
      item => item.channelType === this.state.activeChannel
    );

    const posts = (getPosts && getPosts.post) || [];

    const getFollower =
      (getPosts && numberWithCommas(Number(getPosts.follower))) || "-";

    const getPostADay =
      (getPosts && numberWithCommas(Number(getPosts.postADay))) || "-";

    const getAvgEngagement =
      (getPosts && numberWithCommas(Number(getPosts.avgEngagement))) || "-";

    const getLocation =
      location.length > 0 ? (
        <>
          <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;
          {location[0].name}
        </>
      ) : null;
    return (
      <Styles
        activeChannel={this.state.activeChannel}
        className="col-body col-md-3"
      >
        <Zoom style={{ height: "100%" }} duration={`${durationCard}s`}>
          <div className="col-body-content" ref="profile">
            <div
              className={`col-body-content-top ${
                gender === "male" ? "light-blue" : "light-yellow"
              }`}
            >
              <div
                onClick={() => {
                  this.props.kolClicked(
                    id,
                    window.scrollY || document.documentElement.scrollTop
                  );
                }}
                className="post-img"
                style={{
                  backgroundImage: `url(${
                    getChannelProfile &&
                    getChannelProfile.channelType === "INSTAGRAM"
                      ? getChannelProfile.avatar
                      : getChannelProfile
                      ? "http://graph.facebook.com/" +
                        getChannelProfile.channelId +
                        "/picture?width=160&height=160"
                      : defaultAvatar
                  }`,
                  backgroundSize: "cover",
                  width: "80px",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  float: "left",
                  height: "80px",
                  border: "3px solid #FFFFFF",
                  borderRadius: "100px",
                  cursor: "pointer"
                }}
              >
                &nbsp;
              </div>
              <div className="top-info">
                <div className="top-info-name">
                  {(nickname && nickname) || fullname}
                </div>
                <div className="top-info-nickname">
                  {(nickname && `(${fullname})`) || <>&nbsp;</>}
                </div>
                {getLocation && (
                  <div className="top-info-job">{getLocation}</div>
                )}
              </div>
              {this.state.isBooking ? (
                <i
                  className={`fa fa-bookmark booking-btn ${
                    this.state.isBooking ? "active" : ""
                  }`}
                  aria-hidden="true"
                ></i>
              ) : (
                <Mutation mutation={BOOKING}>
                  {createOneBooking => {
                    return (
                      <i
                        className={`fa fa-bookmark booking-btn ${
                          this.state.isBooking ? "active" : ""
                        }`}
                        aria-hidden="true"
                        onClick={() => {
                          this.createOneBooking(
                            (nickname && nickname) || fullname,
                            createOneBooking,
                            id,
                            this.props.item
                          );
                        }}
                      ></i>
                    );
                  }}
                </Mutation>
              )}
              {!this.props.countFavorite ? (
                <Mutation mutation={FAVORITE}>
                  {createOnefavorite => {
                    return (
                      <i
                        className={`fa fa-star favorite-btn ${
                          this.state.isFavorite ? "active" : ""
                        }`}
                        aria-hidden="true"
                        onClick={() => {
                          this.createFavorite(
                            (nickname && nickname) || fullname,
                            createOnefavorite,
                            id,
                            this.props.item
                          );
                        }}
                      ></i>
                    );
                  }}
                </Mutation>
              ) : (
                <Mutation mutation={FAVORITE_ADD}>
                  {updateOnefavorite => {
                    return (
                      <i
                        className={`fa fa-star favorite-btn ${
                          this.state.isFavorite ? "active" : ""
                        }`}
                        aria-hidden="true"
                        onClick={() => {
                          console.log("item", this.props.item);
                          console.log("id", id);
                          this.changeFavorite(
                            (nickname && nickname) || fullname,
                            updateOnefavorite,
                            id,
                            this.props.item
                          );
                        }}
                      ></i>
                    );
                  }}
                </Mutation>
              )}
            </div>
            <>
              <div className="col-body-content-latest-post d-block">
                <div className="title-wapper">
                  <div className="title" style={{ width: "120px" }}>
                    Overviews
                  </div>
                  <hr className="title-line" />
                </div>
                <div className="content overview">
                  <div
                    className="overview-content"
                    onClick={() => {
                      if (
                        channel.find(item => item.channelType === "PROFILE")
                      ) {
                        this.handleChangeActiveChannge("PROFILE");
                      }
                    }}
                  >
                    {channel.find(item => item.channelType === "PROFILE") && (
                      <i
                        className="fa fa-facebook"
                        style={{ fontSize: "36px" }}
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  <div
                    className="overview-content"
                    onClick={() => {
                      if (
                        channel.find(item => item.channelType === "FANPAGE")
                      ) {
                        this.handleChangeActiveChannge("FANPAGE");
                      }
                    }}
                  >
                    {channel.find(item => item.channelType === "FANPAGE") && (
                      <i
                        className="fa fa-facebook-square"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  <div
                    className="overview-content"
                    onClick={() => {
                      if (
                        channel.find(item => item.channelType === "YOUTUBE")
                      ) {
                        this.handleChangeActiveChannge("YOUTUBE");
                      }
                    }}
                  >
                    {channel.find(item => item.channelType === "YOUTUBE") && (
                      <i
                        className="fa fa-youtube-square"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  <div
                    className="overview-content"
                    onClick={() => {
                      if (
                        channel.find(item => item.channelType === "INSTAGRAM")
                      ) {
                        this.handleChangeActiveChannge("INSTAGRAM");
                      }
                    }}
                  >
                    {channel.find(item => item.channelType === "INSTAGRAM") && (
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    )}
                  </div>
                </div>
                <div className="col-body-content-body white speech-bubble">
                  <div className="body-column">
                    <div className="reach-bottom">Followers</div>
                    <div className="reach-top">{getFollower}</div>
                  </div>
                  <div className="body-column">
                    <div className="reach-bottom">Posts a day</div>
                    <div className="reach-top">{getPostADay}</div>
                  </div>
                  <div>
                    <div className="reach-bottom">Engagement a post</div>
                    <div className="reach-top">{getAvgEngagement}</div>
                  </div>
                </div>
              </div>
              <div className="col-body-content-latest-post">
                <div className="title-wapper">
                  <div className="title">Latest Post</div>
                  <hr className="title-line" />
                </div>
                {(posts.length > 0 && (
                  // posts.map(item => {
                  //   return (
                  <div className="content" key={posts[0].id}>
                    <div className="content-header">
                      {posts[0].attachment && (
                        <div
                          className="post-img"
                          style={{
                            backgroundImage: `url(${posts[0].attachment})`,
                            backgroundSize: "cover",
                            width: "80px",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            float: "left",
                            height: "80px",
                            borderRadius: "0px"
                          }}
                        >
                          &nbsp;
                        </div>
                      )}
                      <div
                        className="post-content"
                        style={{ width: "calc(100% - 80px)" }}
                      >
                        <div className="post-content-title">
                          {posts[0].content &&
                            posts[0].content
                              .split(/\\n/g)
                              .join("\n")
                              .substring(0, 150) + "..."}
                        </div>
                      </div>
                    </div>
                    <div className="content-footer">
                      <div className="group-interaction">
                        <div className="group-interaction-item">
                          <img
                            alt="content-img"
                            src={"./img/Icon/interaction.png"}
                            style={{ width: "50px" }}
                          />{" "}
                          {numberWithCommas(Number(posts[0].likes))}
                        </div>
                        <div className="group-interaction-item">
                          <i className="fa fa-comment" aria-hidden="true"></i>{" "}
                          {numberWithCommas(Number(posts[0].comments))}
                        </div>
                        <div className="group-interaction-item">
                          <i
                            className="fa fa-share-square-o"
                            aria-hidden="true"
                          ></i>{" "}
                          {numberWithCommas(Number(posts[0].shares))}
                        </div>
                      </div>
                      <div style={{ whiteSpace: "nowrap" }}>
                        {moment(posts[0].publishedAt).fromNow()}
                      </div>
                    </div>
                  </div>
                )) || (
                  // );
                  <div className="no-post">No Recent Post</div>
                )}
              </div>
              <div className="col-body-content-latest-post col-body-content-footer-ocup">
                <div className="title-wapper" style={{ marginBottom: "10px" }}>
                  <div className="title">Occupations</div>
                  <hr className="title-line" />
                </div>
                {(jobs.length > 0 &&
                  jobs.map(item => {
                    return (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    );
                  })) ||
                  ""}
              </div>
            </>
            <div className="col-body-content-latest-post col-body-content-footer">
              <div className="title-wapper" style={{ marginBottom: "10px" }}>
                <div className="title" style={{ width: "100px" }}>
                  Categories
                </div>
                <hr className="title-line" />
              </div>
              {category.slice(0, 4).map(item => {
                return (
                  <span key={item.id} className="tag d-flex">
                    {item.name}
                  </span>
                );
              })}
              {category.slice(0, 4).length !== category.length && (
                <>
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.setDropdownOpen}
                  >
                    <DropdownToggle>
                      <span>+</span>
                      {/* <i className="fa fa-plus" aria-hidden="true"></i> */}
                      {category.slice(4, category.length).length}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag="div">
                        {category.slice(4, category.length).map(item => {
                          return (
                            <span key={item.id} className="tag">
                              {item.name}
                            </span>
                          );
                        })}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <div></div>
                </>
              )}
            </div>
          </div>
        </Zoom>
      </Styles>
    );
  }
}

export default CartItem;
