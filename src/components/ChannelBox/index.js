import React, { Component } from "react";

class Chanel extends Component {
  render() {
    const { channel, activeTab } = this.props;
    const icon =
      channel.channelType === "PROFILE"
        ? "fa-facebook"
        : channel.channelType === "FANPAGE"
        ? "fa-facebook-square"
        : channel.channelType === "YOUTUBE"
        ? "fa-youtube-square"
        : "fa-instagram";
    return (
      <div
        onClick={() => this.props.onChangeChannel(channel.channelType)}
        className={`channel-card ${activeTab === channel.channelType &&
          `channel-card-active`}`}
      >
        <div className="channel-type mr-3">
          <i className={`fa ${icon}`} aria-hidden="true"></i>
        </div>
        <div style={{ paddingRight: "10px" }}>
          <div className="channel-name mr-3 ">{channel.name}</div>
          <span className="channel-type-name">{channel.channelType}</span>
        </div>
        <div>
          <img
            alt="channel"
            className="align-self-center rounded-circle channel-box-img"
            src={
              channel.channelType === "INSTAGRAM"
                ? channel.avatar
                : "http://graph.facebook.com/" +
                  channel.channelId +
                  "/picture?width=160&height=160"
            }
          />
        </div>
      </div>
    );
  }
}

export default Chanel;
