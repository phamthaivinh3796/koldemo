import React, { Component } from "react";
import Styles from "./index.style";
import { numberWithCommas } from "../../utils";
import AnimatedNumber from "react-animated-number";
import {
  ChannelBox,
  AgeRangeChart,
  SexChartByLocation,
  GenderPercent,
  CartItemDetail,
  FollowGrow,
  DetailsPost
} from "../";
import { ClipLoader } from "react-spinners";
import moment from "moment";

class DetailsKol extends Component {
  state = {
    activeTab: "PROFILE"
  };

  onChangeChannel = value => {
    this.setState({
      activeTab: value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.profile) {
      //sort channel - start
      let newChannel = [];
      nextProps.data.profile.channel.map(i => {
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
      const sortChannel = newChannel.filter(i => {
        if (i.channelType) return i;
      });
      nextProps.data.profile.channel = sortChannel;
      //end sort
      const getChannel =
        nextProps.data.profile.channel.length > 0
          ? nextProps.data.profile.channel[0].channelType
          : null;
      if (getChannel !== this.state.activeTab) {
        this.setState({
          activeTab: getChannel
        });
      }
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
            width: "100%",
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
            width: "100%",
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

    const { profile } = this.props.data;
    //sort channel - start
    let newChannel = [];
    profile.channel.map(i => {
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
    const sortChannel = newChannel.filter(i => {
      if (i.channelType) return i;
    });
    profile.channel = sortChannel;
    //end sort
    const allChannels = profile.channel.map(item => {
      const { post, ...other } = item;
      return (
        <ChannelBox
          key={item.id}
          activeTab={this.state.activeTab}
          channel={other}
          onChangeChannel={this.onChangeChannel}
        />
      );
    });
    const getChannel = profile.channel.filter(
      item => item.channelType === this.state.activeTab
    )[0];
    return (
      <Styles className="row">
        <CartItemDetail
          item={profile}
          closeDetails={this.props.closeDetails}
          setFavoriteCount={this.props.setFavoriteCount}
          removeFavoriteCount={this.props.removeFavoriteCount}
          countFavorite={this.props.countFavorite}
          user={this.props.user}
          getUser={this.props.getUser}
          favorite={this.props.favorite}
          isFavorite={this.props.isFavorite}
          isBooking={this.props.isBooking}
          updateBooking={this.props.updateBooking}
        />
        <div className="col-body col-md-9">
          <div className="channel-list">{allChannels}</div>
          <div className="active-channel">
            <div className="cover">
              <div className="col-md-12 header-analytic-wapper">
                <div className="row">
                  <div className="col-md-3 analytic-wapper">
                    <div className="analytic-box">
                      <div className="header">Follower</div>
                      <div className="body">
                        {getChannel.follower && (
                          <AnimatedNumber
                            component="text"
                            value={
                              getChannel.follower !== null
                                ? Number(getChannel.follower)
                                : "Unidentified"
                            }
                            stepPrecision={0}
                            style={{
                              transition: "0.8s ease-out",
                              transitionProperty:
                                "background-color, color, opacity"
                            }}
                            formatValue={n => numberWithCommas(n)}
                            duration={500}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 analytic-wapper">
                    <div className="analytic-box">
                      <div className="header">Post a day</div>
                      <div className="body">
                        <AnimatedNumber
                          component="text"
                          value={Number(getChannel.postADay)}
                          stepPrecision={0}
                          style={{
                            transition: "0.8s ease-out",
                            transitionProperty:
                              "background-color, color, opacity"
                          }}
                          formatValue={n => numberWithCommas(n)}
                          duration={500}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 analytic-wapper">
                    <div className="analytic-box">
                      <div className="header">AvR Engagement</div>
                      <div className="body">
                        <AnimatedNumber
                          component="text"
                          value={Number(getChannel.avgEngagement)}
                          stepPrecision={0}
                          style={{
                            transition: "0.8s ease-out",
                            transitionProperty:
                              "background-color, color, opacity"
                          }}
                          formatValue={n => numberWithCommas(n)}
                          duration={500}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 analytic-wapper">
                    <div className="analytic-box">
                      <div className="header">Response Rate</div>
                      <div className="body">
                        <AnimatedNumber
                          component="text"
                          value={Number(getChannel.responseRate)}
                          stepPrecision={0}
                          style={{
                            transition: "0.8s ease-out",
                            transitionProperty:
                              "background-color, color, opacity"
                          }}
                          formatValue={n => n + "%"}
                          duration={500}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {getChannel.channelType !== "INSTAGRAM" ? (
                <>
                  <div className="row" style={{ marginBottom: "50px" }}>
                    <div className="col-md-12">
                      {/* <FollowGrow
                        data={
                          profile.channel.filter(
                            item => item.channelType === this.state.activeTab
                          )[0]
                        }
                      /> */}
                    </div>
                  </div>

                  <div className="row" style={{ marginBottom: "50px" }}>
                    <div className="col-md-6">
                      <GenderPercent
                        data={
                          profile.channel.filter(
                            item => item.channelType === this.state.activeTab
                          )[0]
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <AgeRangeChart
                        data={
                          profile.channel.filter(
                            item => item.channelType === this.state.activeTab
                          )[0]
                        }
                      />
                    </div>
                  </div>

                  <div className="row" style={{ marginBottom: "50px" }}>
                    <div className="col-md-12">
                      <SexChartByLocation
                        data={
                          profile.channel.filter(
                            item => item.channelType === this.state.activeTab
                          )[0]
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="row">
                <div className="col-md-12">
                  <div className="latest-posts">Latest Posts</div>
                  <div className="row">
                    {getChannel.post
                      .sort((a, b) =>
                        Number(moment(a.publishedAt).valueOf()) <
                        Number(moment(b.publishedAt).valueOf())
                          ? 1
                          : -1
                      )
                      .slice(0, 6)
                      .map(item => {
                        return (
                          <DetailsPost
                            item={item}
                            getChannel={getChannel}
                            key={item.id}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default DetailsKol;
