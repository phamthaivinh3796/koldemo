import React, { Component } from "react";
import Styles from "./index.style";
import { Zoom } from "animate-components";
import { NotificationManager } from "react-notifications";
import { Mutation } from "react-apollo";
import { Button } from "reactstrap";
import gql from "graphql-tag";

const FAVORITE = gql`
  mutation createOnefavorite($data: favoriteCreateInput!) {
    createOnefavorite(data: $data) {
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

const FAVORITE_ADD = gql`
  mutation updateOnefavorite(
    $data: favoriteUpdateInput!
    $where: favoriteWhereUniqueInput!
  ) {
    updateOnefavorite(data: $data, where: $where) {
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
          responseRate
          audienceSize
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

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChannel:
        props.item.channel.length > 0
          ? props.item.channel[0].channelType
          : null,
      isFavorite: this.props.isFavorite,
      isBooking: this.props.isBooking
    };
  }

  createFavorite = (name, API, id) => {
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
      if (this.props.countFavorite && this.props.countFavorite < 20) {
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
              1000
            );
            this.setState({
              isFavorite: !this.state.isFavorite
            });
          })
          .catch(error => {})
          .finally(() => {});
      } else {
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
          1000
        );
      })
      .catch(error => {})
      .finally(() => {});
  };

  render() {
    const {
      id,
      age,
      channel,
      birthday,
      occupation,
      fullname,
      nickname,
      gender,
      category,
      location,
      biography
    } = this.props.item;

    const durationCard = 0.5;
    const jobs = occupation.map(item => item.name);
    const getChannelProfile = channel.find(
      item => item.channelType === this.state.activeChannel
    );
    const avatarDefaultFemale =
      "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlbYnjYkOGWAFMyLJYfk1ELJ3TOS-Y41DHOCfWaIWrZMg6YHHKbdiv5MTUhGiEHP7o&_nc_ht=scontent.fsgn2-4.fna&oh=e82d0d3a762257417afb5e16da907dfa&oe=5EF4FEAC";
    const avatarDefaultMale =
      "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlJG8CNTJrV4CzRigIDY9qFLMWABcsB1KXEeHhqf1LHWGmfq__KoMRnO-LWjBTSKWU&_nc_ht=scontent.fsgn2-4.fna&oh=96c95bcd3c1d2de144ebe65484b46efd&oe=5EEE617C";
    const defaultAvatar =
      gender === "male" ? avatarDefaultMale : avatarDefaultFemale;
    return (
      <Styles className="col-body col-md-3">
        <Zoom style={{ height: "100%" }} duration={`${durationCard}s`}>
          <div className="col-body-content">
            <span
              className="back-btn"
              onClick={() => this.props.closeDetails()}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </span>
            <div
              className={`col-body-content-top ${
                gender === "male" ? "light-blue" : "light-yellow"
              }`}
            >
              <img
                alt="content-img"
                className="content-img"
                src={
                  getChannelProfile &&
                  getChannelProfile.channelType === "INSTAGRAM"
                    ? getChannelProfile.avatar
                    : getChannelProfile
                    ? "http://graph.facebook.com/" +
                      getChannelProfile.channelId +
                      "/picture?width=160&height=160"
                    : defaultAvatar
                }
              />
              <div className="top-info">
                <div className="top-info-name">
                  {(nickname && nickname) || fullname}
                </div>
                <div className="top-info-nickname">
                  {(nickname && `(${fullname})`) || <>&nbsp;</>}
                </div>
              </div>
            </div>
            <div
              style={{ marginTop: "4px" }}
              className="kol-details-left text-light"
            >
              <div className="btn-group-top">
                {this.state.isBooking ? (
                  <Button disabled={true} color="primary">
                    {this.state.isBooking
                      ? "Added to BookingList"
                      : "Add to BookingList"}
                  </Button>
                ) : (
                  <Mutation mutation={BOOKING}>
                    {createOneBooking => {
                      return (
                        <Button
                          color="primary"
                          onClick={() => {
                            this.createOneBooking(
                              (nickname && nickname) || fullname,
                              createOneBooking,
                              id,
                              this.props.item
                            );
                          }}
                        >
                          {this.state.isBooking
                            ? "Added to BookingList"
                            : "Add to BookingList"}
                        </Button>
                      );
                    }}
                  </Mutation>
                )}

                {!this.props.countFavorite ? (
                  <Mutation mutation={FAVORITE}>
                    {createOnefavorite => {
                      return (
                        <Button
                          color={
                            this.state.isFavorite ? "success" : "secondary"
                          }
                          onClick={() => {
                            this.createFavorite(
                              (nickname && nickname) || fullname,
                              createOnefavorite,
                              id,
                              this.props.item
                            );
                          }}
                        >
                          {this.state.isFavorite
                            ? "Added to favourite"
                            : "Add to favourite"}
                        </Button>
                      );
                    }}
                  </Mutation>
                ) : (
                  <Mutation mutation={FAVORITE_ADD}>
                    {updateOnefavorite => {
                      return (
                        <Button
                          color={
                            this.state.isFavorite ? "success" : "secondary"
                          }
                          onClick={() => {
                            this.changeFavorite(
                              (nickname && nickname) || fullname,
                              updateOnefavorite,
                              id,
                              this.props.item
                            );
                          }}
                        >
                          {this.state.isFavorite
                            ? "Added to favourite"
                            : "Add to favourite"}
                        </Button>
                      );
                    }}
                  </Mutation>
                )}
              </div>
              <div className="row info-row">
                <div className="col-12 left-col">INFO</div>
                <div className="col-12 right-col">
                  <div className="row info-row-details">
                    <div className="col-5">
                      <i className="fa fa-user" aria-hidden="true"></i>
                      &nbsp;&nbsp;Fullname
                    </div>
                    <div className="col-7" style={{ whiteSpace: "nowrap" }}>
                      {fullname}
                    </div>
                  </div>
                  {nickname && (
                    <div className="row info-row-details">
                      <div className="col-5">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        &nbsp;&nbsp;Nickname
                      </div>
                      <div className="col-7">{nickname}</div>
                    </div>
                  )}
                  <div className="row info-row-details">
                    <div className="col-5">
                      <i className="fa fa-briefcase" aria-hidden="true"></i>
                      &nbsp;&nbsp;Occupation
                    </div>
                    <div className="col-7">
                      {occupation.map(item => {
                        return (
                          <React.Fragment key={item.id}>
                            <span key={item.id} className="badge badge-success">
                              {item.name}
                            </span>
                            &nbsp;
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                  <div className="row info-row-details">
                    <div className="col-5">
                      <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                      &nbsp;&nbsp;Age
                    </div>
                    <div className="col-7">{age || "-"}</div>
                  </div>
                  <div className="row info-row-details">
                    <div className="col-5">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      &nbsp;&nbsp;DOB
                    </div>
                    <div className="col-7">{birthday || "-"}</div>
                  </div>
                  <div className="row info-row-details">
                    <div className="col-5">
                      <i className="fa fa-venus-mars" aria-hidden="true"></i>
                      &nbsp;&nbsp;Gender
                    </div>
                    <div className="col-7">
                      {gender === "male" ? "Male" : "Female"}
                    </div>
                  </div>

                  <div className="row info-row-details">
                    <div className="col-5">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      &nbsp;&nbsp;Location
                    </div>
                    <div className="col-7">
                      {location.length > 0
                        ? location.map(item => {
                            return (
                              <React.Fragment key={item.id}>
                                <span
                                  className="badge badge-info"
                                  key={item.id}
                                >
                                  {item.name}
                                </span>{" "}
                                &nbsp;
                              </React.Fragment>
                            );
                          })
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row info-row">
                <div className="col-12 left-col">CATEGORIES</div>
                <div className="col-12 right-col">
                  {category.map(item => {
                    return (
                      <React.Fragment key={item.id}>
                        <span key={item.id} class="tag">
                          {item.name}
                        </span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="row info-row">
                <div className="col-12 left-col">BIOGRAPHY</div>
                <div className="col-12 right-col">{biography && biography}</div>
              </div>
            </div>
          </div>
        </Zoom>
      </Styles>
    );
  }
}

export default CartItem;
