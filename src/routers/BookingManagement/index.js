import React, { PureComponent } from "react";
import { ClipLoader } from "react-spinners";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Row,
  Col
} from "reactstrap";
import Styles from "./index.style";
import { Mutation } from "react-apollo";
import { NotificationManager } from "react-notifications";
import Stepper from "react-stepper-horizontal";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  ContactInfo,
  BrandInfo,
  Campain,
  TargetAudience,
  Payment
} from "../../components";
import moment from "moment";

import gql from "graphql-tag";

const REMOVE = gql`
  mutation deleteOneBooking($where: BookingWhereUniqueInput!) {
    deleteOneBooking(where: $where) {
      id
    }
  }
`;

const channelIcon = {
  PROFILE: {
    icon: "fa-facebook"
  },
  FANPAGE: {
    icon: "fa-facebook-square"
  },
  YOUTUBE: {
    icon: "fa-youtube-square"
  },
  INSTAGRAM: {
    icon: "fa-instagram"
  }
};

export default class extends PureComponent {
  state = {
    activeTab: "1",
    data: null,
    checked: [],
    modal: false,
    activeStep: 0,
    form1: null,
    form2: null,
    form3: null,
    form4: null,
    form5: null
  };

  child = {};

  saveDataForm = (API, updateOneBooking) => {
    const audienceLocation = this.state.form4.locations
      ? {
          audienceLocation: {
            connect: this.state.form4.locations.map(item => {
              return {
                id: item.value
              };
            })
          }
        }
      : {};
    API({
      variables: {
        data: {
          user: {
            connect: {
              id: this.props.getUser.id
            }
          },
          fullname: this.state.form1.name,
          email: this.state.form1.email,
          phone: this.state.form1.phone,
          company: this.state.form1.company,
          jobTitle: this.state.form1.jobTitle,
          brandname: this.state.form2.branchName,
          productName: this.state.form2.productName,
          category: {
            connect: {
              id: Number(this.state.form2.categories)
            }
          },
          productDescription: this.state.form2.describeTheProduct,
          campaintName: this.state.form3.campaignName,
          campaignStartAt: moment(this.state.form3.timelineFrom)
            .add(7, "hours")
            .toISOString(),
          campaignEndAt: moment(this.state.form3.timelineTo)
            .add(7, "hours")
            .toISOString(),
          campaignsTarget: this.state.form3.campaignTargeting
            .map(item => item.value)
            .join(","),
          channelType: this.state.form3.channels
            .map(item => item.value)
            .join(","),
          contentBy: this.state.form3.contentBy,
          campaignHashtag: this.state.form3.hashTag,
          campaignKeywords: this.state.form3.keywords,
          campaignLink: this.state.form3.link,
          campaignPostType: this.state.form3.format
            .map(item => item.value)
            .join(","),
          bref: this.state.form3.brief,
          audienceGender: this.state.form4.genders
            ? this.state.form4.genders.map(item => item.value).join(",")
            : "",
          audienceAgeRange: this.state.form4.ageRange
            ? this.state.form4.ageRange.map(item => item.value).join(",")
            : "",
          otherTarget: this.state.form4.otherTarget,
          totalBudget: this.state.form5.totalBudget,
          paymentTerm: this.state.form5.paymentTerm,
          profiles: {
            connect: this.state.data.bookings
              .filter(item => item.status === "booking")
              .filter(item => this.state.checked.includes(item.id))
              .map(item => {
                return {
                  id: item.profiles[0].id
                };
              })
          },
          ...audienceLocation
        }
      }
    })
      .then(response => {
        this.state.checked.forEach((id, key) => {
          updateOneBooking({
            variables: {
              data: {
                status: "waiting"
              },
              where: {
                id: id
              }
            }
          })
            .then(response => {
              // NotificationManager.success("", `Success`, 1000);
              const newData = {
                ...this.state.data,
                bookings: this.state.data.bookings.map(item => {
                  return item.id === id ? { ...item, status: "waiting" } : item;
                })
              };
              this.setState({
                data: newData,
                checked: [],
                activeStep: 0,
                form1: null,
                form2: null,
                form3: null,
                form4: null,
                form5: null
              });
            })
            .catch(error => {})
            .finally(() => {});
        });
        this.setModal();
      })
      .catch(error => {})
      .finally(() => {});
  };

  setFormData = (name, data) => {
    this.setState({
      [name]: data
    });
  };

  setModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  setActiveStep = activeStep => {
    this.setState({
      activeStep: activeStep
    });
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  checkedChange = data => {
    if (this.state.checked.includes(data)) {
      this.setState({
        checked: this.state.checked.filter(item => item !== data)
      });
    } else {
      this.setState({
        checked: [...this.state.checked, data]
      });
    }
  };

  checkedChangeAll = (checked, data) => {
    if (!checked) {
      this.setState({
        checked: []
      });
    } else {
      this.setState({
        checked: data
      });
    }
  };

  removeKols = (API, id) => {
    API({
      variables: {
        where: {
          id: id
        }
      }
    })
      .then(response => {
        // NotificationManager.success("", `Success`, 1000);
        const newData = {
          ...this.state.data,
          bookings: this.state.data.bookings.filter(item => item.id !== id)
        };
        this.setState({
          data: newData
        });
      })
      .catch(error => {})
      .finally(() => {});
  };

  updateKols = API => {
    this.state.checked.forEach((id, key) => {
      API({
        variables: {
          data: {
            status: "waiting"
          },
          where: {
            id: id
          }
        }
      })
        .then(response => {
          // NotificationManager.success("", `Success`, 1000);
          const newData = {
            ...this.state.data,
            bookings: this.state.data.bookings.map(item => {
              return item.id === id ? { ...item, status: "waiting" } : item;
            })
          };
          this.setState({
            data: newData
          });
        })
        .catch(error => {})
        .finally(() => {});
    });
  };

  removeKolsAll = API => {
    this.state.checked.forEach((id, key) => {
      API({
        variables: {
          where: {
            id: id
          }
        }
      })
        .then(response => {
          // NotificationManager.success("", `Success`, 1000);
          const newData = {
            ...this.state.data,
            bookings: this.state.data.bookings.filter(item => item.id !== id)
          };
          this.setState({
            data: newData
          });
        })
        .catch(error => {})
        .finally(() => {});
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data &&
      nextProps.data.user &&
      JSON.stringify(nextProps.data.user) !==
        JSON.stringify(this.props.data.user)
    ) {
      const getBooking = nextProps.data.user.bookings.filter(
        item => item.status === "booking"
      );
      this.setState({
        data: nextProps.data.user,
        checked: getBooking.map(item => item.id)
      });
    }
  }

  render() {
    const {
      data: { loading, error }
    } = this.props;

    if (!this.props.data) {
      return <>Nodata</>;
    }
    if (loading) {
      return (
        <div
          className="box confirmed confirmed-box"
          style={{
            height: "calc(100vh - 60px)",
            margin: "5px 0px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >
          <ClipLoader size={45} color={"#bdbdbd"} loading={true} />
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="box confirmed confirmed-box"
          style={{
            height: "calc(100vh - 60px)",
            margin: "5px 0px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >
          <ClipLoader size={45} color={"#bdbdbd"} loading={true} />
        </div>
      );
    }

    let getBooking = this.state.data.bookings.filter(
      item => item.status === "booking"
    );
    let getWaiting = this.state.data.bookings.filter(
      item => item.status === "waiting"
    );
    let getConfirm = this.state.data.bookings.filter(
      item => item.status === "confirm"
    );

    const locations = this.props.locations || [];

    const categories = this.props.categories || [];

    // console.log(this.state);
    const sortChannelgetBooking = getBooking.map(item => {
      let newChannel = [];
      item.profiles[0].channel.map(i => {
        if (i.channelType === "FANPAGE") {
          newChannel[1] = i;
        }
        if (i.channelType === "PROFILE") {
          newChannel[0] = i;
        }
        if (i.channelType === "INSTAGRAM") {
          newChannel[2] = i;
        }
        if (i.channelType === "YOUTUBE") {
          newChannel[3] = i;
        }
      });
      const data = newChannel.filter(i => {
        if (i.channelType) return i;
      });
      item.profiles[0].channel = data;
      return item;
    });
    getBooking = sortChannelgetBooking;

    return (
      <Container fluid={true}>
        <Styles
          className="tabs"
          openSideBar={this.props.openSideBar}
          id="ieURIB"
        >
          <Nav tabs>
            <NavItem>
              <NavLink
                className={`${this.state.activeTab === "1" ? "active" : ""}`}
                onClick={() => this.toggle("1")}
              >
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
                &nbsp;Your List
                {getBooking.length > 0 && (
                  <span className="badge-number">{getBooking.length}</span>
                )}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${this.state.activeTab === "2" ? "active" : ""}`}
                onClick={() => this.toggle("2")}
              >
                <i className="fa fa-spinner" aria-hidden="true"></i>{" "}
                &nbsp;Waiting
                {getWaiting.length > 0 && (
                  <span className="badge-number">{getWaiting.length}</span>
                )}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`${this.state.activeTab === "3" ? "active" : ""}`}
                onClick={() => this.toggle("3")}
              >
                <i className="fa fa-check" aria-hidden="true"></i> &nbsp;Confirm
                {getConfirm.length > 0 && (
                  <span className="badge-number">{getConfirm.length}</span>
                )}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col
                  sm="12"
                  style={{ padding: "20px 20px", textAlign: "right" }}
                >
                  <Mutation mutation={REMOVE}>
                    {deleteOneBooking => {
                      return (
                        <button
                          className="btn-decline"
                          onClick={() => {
                            if (this.state.checked.length > 0) {
                              this.removeKolsAll(deleteOneBooking);
                            }
                          }}
                          disabled={this.state.checked.length === 0}
                        >
                          Decline All
                        </button>
                      );
                    }}
                  </Mutation>

                  <button
                    className="btn-accept"
                    // onClick={() => this.updateKols(updateOneBooking)}
                    onClick={() => {
                      if (this.state.checked.length > 0) {
                        this.setModal();
                      }
                    }}
                    disabled={this.state.checked.length === 0}
                  >
                    Request
                  </button>
                </Col>
                <Col sm="12">
                  <Table>
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={e =>
                              this.checkedChangeAll(
                                e.target.checked,
                                getBooking.map(item => item.id)
                              )
                            }
                            checked={
                              this.state.checked.length === getBooking.length &&
                              getBooking.length !== 0
                            }
                          />
                        </th>
                        <th>Profile</th>
                        <th>Occupation</th>
                        <th>Categories</th>
                        <th>Channel</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getBooking.map((item, index) => {
                        // console.log(item);
                        const getAvatar =
                          item.profiles[0].channel.length > 0
                            ? item.profiles[0].channel[0].avatar
                            : null;
                        const avatarDefaultFemale =
                          "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlbYnjYkOGWAFMyLJYfk1ELJ3TOS-Y41DHOCfWaIWrZMg6YHHKbdiv5MTUhGiEHP7o&_nc_ht=scontent.fsgn2-4.fna&oh=e82d0d3a762257417afb5e16da907dfa&oe=5EF4FEAC";
                        const avatarDefaultMale =
                          "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlJG8CNTJrV4CzRigIDY9qFLMWABcsB1KXEeHhqf1LHWGmfq__KoMRnO-LWjBTSKWU&_nc_ht=scontent.fsgn2-4.fna&oh=96c95bcd3c1d2de144ebe65484b46efd&oe=5EEE617C";
                        const defaultAvatar =
                          item.gender === "male"
                            ? avatarDefaultMale
                            : avatarDefaultFemale;
                        return (
                          <tr>
                            <td scope="row">
                              <input
                                type="checkbox"
                                onChange={() => this.checkedChange(item.id)}
                                checked={this.state.checked.includes(item.id)}
                              />
                            </td>
                            <td
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                              }}
                            >
                              <div
                                className="post-img"
                                style={{
                                  backgroundImage: `url(${"http://graph.facebook.com/" +
                                    item.profiles[0].channel[0].channelId +
                                    "/picture?width=160&height=160" ||
                                    defaultAvatar})`,
                                  backgroundSize: "cover",
                                  width: "80px",
                                  backgroundPosition: "center center",
                                  backgroundRepeat: "no-repeat",
                                  float: "left",
                                  height: "80px",
                                  border: "3px solid #FFFFFF",
                                  borderRadius: "100px"
                                }}
                              >
                                &nbsp;
                              </div>
                              {item.profiles[0].fullname}
                            </td>
                            <td>
                              {item.profiles[0].occupation.map(i => (
                                <span class="tag">{i.name}</span>
                              ))}
                            </td>
                            <td>
                              {item.profiles[0].category.map(i => (
                                <span class="tag-cat">{i.name}</span>
                              ))}
                            </td>
                            <td>
                              {item.profiles[0].channel.map(i => (
                                <span class="tag-channel">
                                  <i
                                    className={`fa ${
                                      channelIcon[i.channelType].icon
                                    }`}
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              ))}
                            </td>
                            <td>
                              <Mutation mutation={REMOVE}>
                                {deleteOneBooking => {
                                  return (
                                    <button
                                      className="btn-decline"
                                      onClick={() =>
                                        this.removeKols(
                                          deleteOneBooking,
                                          item.id
                                        )
                                      }
                                    >
                                      Decline
                                    </button>
                                  );
                                }}
                              </Mutation>
                              {/* <Mutation mutation={UPDATE}>
                                {updateOneBooking => {
                                  return (
                                    <button
                                      className="btn-accept"
                                      onClick={() =>
                                        this.updateKols(
                                          updateOneBooking,
                                          item.id
                                        )
                                      }
                                    >
                                      Request
                                    </button>
                                  );
                                }}
                              </Mutation> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Table>
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Occupation</th>
                        <th>Categories</th>
                        <th>Channel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getWaiting.map((item, index) => {
                        const getAvatar =
                          item.profiles[0].channel.length > 0
                            ? item.profiles[0].channel[0].avatar
                            : null;
                        const avatarDefaultFemale =
                          "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlbYnjYkOGWAFMyLJYfk1ELJ3TOS-Y41DHOCfWaIWrZMg6YHHKbdiv5MTUhGiEHP7o&_nc_ht=scontent.fsgn2-4.fna&oh=e82d0d3a762257417afb5e16da907dfa&oe=5EF4FEAC";
                        const avatarDefaultMale =
                          "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlJG8CNTJrV4CzRigIDY9qFLMWABcsB1KXEeHhqf1LHWGmfq__KoMRnO-LWjBTSKWU&_nc_ht=scontent.fsgn2-4.fna&oh=96c95bcd3c1d2de144ebe65484b46efd&oe=5EEE617C";
                        const defaultAvatar =
                          item.gender === "male"
                            ? avatarDefaultMale
                            : avatarDefaultFemale;
                        return (
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                              }}
                            >
                              <div
                                className="post-img"
                                style={{
                                  backgroundImage: `url(${"http://graph.facebook.com/" +
                                    item.profiles[0].channel[0].channelId +
                                    "/picture?width=160&height=160" ||
                                    defaultAvatar})`,
                                  backgroundSize: "cover",
                                  width: "80px",
                                  backgroundPosition: "center center",
                                  backgroundRepeat: "no-repeat",
                                  float: "left",
                                  height: "80px",
                                  border: "3px solid #FFFFFF",
                                  borderRadius: "100px"
                                }}
                              >
                                &nbsp;
                              </div>
                              {item.profiles[0].fullname}
                            </td>
                            <td>
                              {item.profiles[0].occupation.map(i => (
                                <span class="tag">{i.name}</span>
                              ))}
                            </td>
                            <td>
                              {item.profiles[0].category.map(i => (
                                <span class="tag-cat">{i.name}</span>
                              ))}
                            </td>
                            <td>
                              {item.profiles[0].channel.map(i => (
                                <span class="tag-channel">
                                  <i
                                    className={`fa ${
                                      channelIcon[i.channelType].icon
                                    }`}
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <Table>
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Occupation</th>
                        <th>Categories</th>
                        <th>Channel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getConfirm.map((item, index) => {
                        const getAvatar =
                          item.profiles[0].channel.length > 0
                            ? item.profiles[0].channel[0].avatar
                            : null;
                        const avatarDefaultFemale =
                          "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84688533_170842440872810_7559275468982059008_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlbYnjYkOGWAFMyLJYfk1ELJ3TOS-Y41DHOCfWaIWrZMg6YHHKbdiv5MTUhGiEHP7o&_nc_ht=scontent.fsgn2-4.fna&oh=e82d0d3a762257417afb5e16da907dfa&oe=5EF4FEAC";
                        const avatarDefaultMale =
                          "https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=dbb9e7&_nc_oc=AQlJG8CNTJrV4CzRigIDY9qFLMWABcsB1KXEeHhqf1LHWGmfq__KoMRnO-LWjBTSKWU&_nc_ht=scontent.fsgn2-4.fna&oh=96c95bcd3c1d2de144ebe65484b46efd&oe=5EEE617C";
                        const defaultAvatar =
                          item.gender === "male"
                            ? avatarDefaultMale
                            : avatarDefaultFemale;
                        return (
                          <tr>
                            <td
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                              }}
                            >
                              <div
                                className="post-img"
                                style={{
                                  backgroundImage: `url(${"http://graph.facebook.com/" +
                                    item.profiles[0].channel[0].channelId +
                                    "/picture?width=160&height=160" ||
                                    defaultAvatar})`,
                                  backgroundSize: "cover",
                                  width: "80px",
                                  backgroundPosition: "center center",
                                  backgroundRepeat: "no-repeat",
                                  float: "left",
                                  height: "80px",
                                  border: "3px solid #FFFFFF",
                                  borderRadius: "100px"
                                }}
                              >
                                &nbsp;
                              </div>
                              {item.profiles[0].fullname}
                            </td>
                            <td>
                              {item.profiles[0].occupation.map(i => (
                                <span class="tag">{i.name}</span>
                              ))}
                            </td>
                            <td>
                              {item.profiles[0].category.map(i => (
                                <span class="tag-cat">{i.name}</span>
                              ))}
                            </td>
                            <td>
                              {item.profiles[0].channel.map(i => (
                                <span class="tag-channel">
                                  <i
                                    className={`fa ${
                                      channelIcon[i.channelType].icon
                                    }`}
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          <Modal size={"lg"} isOpen={this.state.modal} toggle={this.setModal}>
            <ModalHeader toggle={this.setModal}>Contact Brief</ModalHeader>
            <ModalBody>
              <Stepper
                steps={[
                  {
                    title: "Contact Info",
                    href: "#",
                    onClick: e => {
                      e.preventDefault();
                      this.setState({
                        activeStep: 0
                      });
                      // console.log(this.child[0]);
                    }
                  },
                  {
                    title: "Brand Info",
                    href: "#",
                    onClick: e => {
                      e.preventDefault();
                      this.setState({
                        activeStep: 1
                      });
                      // console.log(this.child[1]);
                    }
                  },
                  {
                    title: "Campain Info",
                    href: "#",
                    onClick: e => {
                      e.preventDefault();
                      this.setState({
                        activeStep: 2
                      });
                      // console.log(this.child[2]);
                    }
                  },
                  {
                    title: "Target Audience",
                    href: "#",
                    onClick: e => {
                      e.preventDefault();
                      this.setState({
                        activeStep: 3
                      });
                      // console.log(this.child[3]);
                    }
                  },
                  {
                    title: "Payment",
                    href: "#",
                    onClick: e => {
                      e.preventDefault();
                      this.setState({
                        activeStep: 4
                      });
                      // console.log(this.child[4]);
                    }
                  }
                ]}
                activeStep={this.state.activeStep}
              />
              {this.state.activeStep === 0 && (
                <ContactInfo
                  onRef={value => (this.child[0] = value)}
                  setActiveStep={this.setActiveStep}
                  setFormData={this.setFormData}
                  formData={this.state.form1}
                />
              )}
              {this.state.activeStep === 1 && (
                <BrandInfo
                  onRef={value => (this.child[1] = value)}
                  setActiveStep={this.setActiveStep}
                  setFormData={this.setFormData}
                  formData={this.state.form2}
                  categories={categories}
                />
              )}
              {this.state.activeStep === 2 && (
                <Campain
                  onRef={value => (this.child[2] = value)}
                  setActiveStep={this.setActiveStep}
                  setFormData={this.setFormData}
                  formData={this.state.form3}
                />
              )}
              {this.state.activeStep === 3 && (
                <TargetAudience
                  onRef={value => (this.child[3] = value)}
                  setActiveStep={this.setActiveStep}
                  setFormData={this.setFormData}
                  formData={this.state.form4}
                  locations={locations}
                />
              )}
              {this.state.activeStep === 4 && (
                <Payment
                  saveDataForm={this.saveDataForm}
                  onRef={value => (this.child[4] = value)}
                  setActiveStep={this.setActiveStep}
                  setFormData={this.setFormData}
                  formData={this.state.form5}
                />
              )}
            </ModalBody>
          </Modal>
        </Styles>
      </Container>
    );
  }
}
