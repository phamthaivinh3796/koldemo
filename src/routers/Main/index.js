import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { Header, Body, FilterBar, MenuBar } from "../../shareds";
import BookingManagement from "../BookingManagement/index.container";
import FollowingList from "../FollowingList/index.container";
import InfluencerDiscovery from "../InfluencerDiscovery/index.container";
import CampaignTracking from "../CampaignTracking/index.container";
import { ClipLoader } from "react-spinners";
import Styles from "./index.styles";
import "react-notifications/lib/notifications.css";

export default class extends PureComponent {
  state = {
    openSideBar: false,
    openMenuBar: false,
    occupations: [],
    locations: [],
    categories: [],
    chanel: [],
    gender: [],
    sizeAudience: {
      value: "none",
      label: "None",
      isFixed: true
    },
    locationsAudience: {
      value: "none",
      label: "None",
      isFixed: true
    },
    genderAudience: {
      value: "none",
      label: "None",
      isFixed: true
    },
    ageRange: {
      value: "none",
      label: "None",
      isFixed: true
    },
    valueSearch: ""
  };

  render() {
    if (!localStorage.getItem("User")) {
      return <Redirect to="/login" />;
    }

    if (this.props.location.pathname === "/") {
      return <Redirect to="/influencer-discovery" />;
    }
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

    const defaultUser = this.props.users;

    const { locations, occupations, categories } = this.props.data;
    
    const getUser = defaultUser.find(
      item => item.email === JSON.parse(localStorage.getItem("User")).user
    );

    return (
      <Styles>
        <MenuBar
          outsideClickIgnoreClass={"navigation"}
          closeMenuBar={this.closeMenuBar}
          openMenuBar={this.state.openMenuBar}
        />
        <Header
          history={this.props.history}
          _handleChangeDataSearch={this._handleChangeDataSearch}
          toggleSideBar={this.toggleSideBar}
          toggleMenuBar={this.toggleMenuBar}
        />
        <Switch>
          <Route
            path="/following-list"
            render={() => (
              <FollowingList
                occupations={this.state.occupations}
                locations={this.state.locations}
                categories={this.state.categories}
                chanel={this.state.chanel}
                gender={this.state.gender}
                getUser={getUser}
                valueSearch={this.state.valueSearch}
                openSideBar={this.state.openSideBar}
              />
            )}
          />
          <Route
            path="/booking-management"
            render={() => (
              <BookingManagement
                openSideBar={this.state.openSideBar}
                locations={locations}
                getUser={getUser}
                categories={categories}
              />
            )}
          />
          <Route
            path="/influencer-discovery"
            render={() => (
              <InfluencerDiscovery
                sizeAudience={this.state.sizeAudience}
                occupations={this.state.occupations}
                locations={this.state.locations}
                categories={this.state.categories}
                chanel={this.state.chanel}
                gender={this.state.gender}
                getUser={getUser}
                locationsAudience={this.state.locationsAudience}
                genderAudience={this.state.genderAudience}
                ageRange={this.state.ageRange}
                valueSearch={this.state.valueSearch}
                openSideBar={this.state.openSideBar}
              />
            )}
          />
          <Route
            path="/campaign-tracking"
            render={() => (
              <CampaignTracking
                occupations={this.state.occupations}
                locations={this.state.locations}
                categories={this.state.categories}
                chanel={this.state.chanel}
                gender={this.state.gender}
                getUser={getUser}
                valueSearch={this.state.valueSearch}
                openSideBar={this.state.openSideBar}
              />
            )}
          />
        </Switch>
        <FilterBar
          locations={locations}
          occupations={occupations}
          categories={categories}
          filterOb={this.state}
          _handleCheckAllGender={this._handleCheckAllGender}
          _handleCheckAllChanel={this._handleCheckAllChanel}
          _handleChangeCheckboxGroup={this._handleChangeCheckboxGroup}
          _handleChangeSelected={this._handleChangeSelected}
          _handleChangeSelectedAudience={this._handleChangeSelectedAudience}
          openSideBar={this.state.openSideBar}
          outsideClickIgnoreClass={"filter"}
          closeSideBar={this.closeSideBar}
        />
        <NotificationContainer />
      </Styles>
    );
  }

  _handleChangeDataSearch = str => {
    this.setState({
      valueSearch: str,
      locationsAudience: {
        value: "none",
        label: "None",
        isFixed: true
      },
      genderAudience: {
        value: "none",
        label: "None",
        isFixed: true
      },
      ageRange: {
        value: "none",
        label: "None",
        isFixed: true
      }
    });
  };

  _handleChangeSelectedAudience = (name, data) => {
    this.setState({
      [name]: data,
      occupations: [],
      locations: [],
      categories: [],
      chanel: [],
      gender: [],
      valueSearch: ""
    });
  };

  _handleChangeSelected = (name, data) => {
    this.setState({
      [name]: data,
      locationsAudience: {
        value: "none",
        label: "None",
        isFixed: true
      },
      genderAudience: {
        value: "none",
        label: "None",
        isFixed: true
      },
      ageRange: {
        value: "none",
        label: "None",
        isFixed: true
      }
    });
  };

  _handleCheckAllGender = () => {
    if (this.state.gender.length === 3) {
      this.setState({
        gender: [],
        locationsAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        genderAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        ageRange: {
          value: "none",
          label: "None",
          isFixed: true
        }
      });
    } else {
      this.setState({
        gender: ["male", "female", "others"],
        locationsAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        genderAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        ageRange: {
          value: "none",
          label: "None",
          isFixed: true
        }
      });
    }
  };

  _handleCheckAllChanel = () => {
    if (this.state.chanel.length === 4) {
      this.setState({
        chanel: [],
        locationsAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        genderAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        ageRange: {
          value: "none",
          label: "None",
          isFixed: true
        }
      });
    } else {
      this.setState({
        chanel: ["PROFILE", "FANPAGE", "YOUTUBE", "INSTAGRAM"],
        locationsAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        genderAudience: {
          value: "none",
          label: "None",
          isFixed: true
        },
        ageRange: {
          value: "none",
          label: "None",
          isFixed: true
        }
      });
    }
  };

  _handleChangeCheckboxGroup = (value, field) => {
    this.setState({
      [field]: value,
      locationsAudience: {
        value: "none",
        label: "None",
        isFixed: true
      },
      genderAudience: {
        value: "none",
        label: "None",
        isFixed: true
      },
      ageRange: {
        value: "none",
        label: "None",
        isFixed: true
      }
    });
  };

  toggleSideBar = () => {
    this.setState({
      openSideBar: !this.state.openSideBar
    });
  };

  toggleMenuBar = () => {
    this.setState({
      openMenuBar: !this.state.openMenuBar
    });
  };

  closeMenuBar = () => {
    this.setState({
      openMenuBar: false
    });
  };

  closeSideBar = () => {
    this.setState({
      openSideBar: false
    });
  };
}
