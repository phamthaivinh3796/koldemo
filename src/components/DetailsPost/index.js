import React, { Component } from "react";
import { numberWithCommas } from "../../utils";
import moment from "moment";

class DetailsKol extends Component {
  state = {
    readMore: false
  };

  render() {
    const { item, getChannel } = this.props;
    return (
      <div className="col-md-4" key={item.id}>
        <div className="post-template">
          <div className="header-post">
            <div className="post-img">
              <img
                alt="content-img"
                src={
                  getChannel.channelType === "INSTAGRAM"
                    ? getChannel.avatar
                    : "http://graph.facebook.com/" +
                      getChannel.channelId +
                      "/picture?width=160&height=160"
                }
              />
            </div>
            <div className="post-content">
              <div className="post-author">{item.authorName}</div>
              <div className="post-time">
                {moment(item.publishedAt).fromNow()}
              </div>
            </div>
          </div>
          <div className="body-post">
            {item.attachment && (
              <div
                className="post-img"
                style={{
                  backgroundImage: `url(${item.attachment})`,
                  backgroundSize: "cover",
                  width: "100%",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  float: "left",
                  height: "250px",
                  marginTop: "10px",
                  borderRadius: "0px"
                }}
              >
                &nbsp;
              </div>
            )}
            <div className="post-content">
              {(item.content &&
                item.content.length > 150 &&
                !this.state.readMore &&
                item.content.substring(0, 150) + "...") ||
                (item.content && item.content) ||
                ""}
              {item.content && item.content.length > 150 ? (
                <span
                  onClick={() =>
                    this.setState({ readMore: !this.state.readMore })
                  }
                  className="read-more"
                >
                  {" "}
                  {!this.state.readMore ? "Show more" : "Show less"}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="footer-post">
            <div className="post-interaction">
              <span className="like">
                <img
                  alt="content-img"
                  src={"./img/Icon/interaction.png"}
                  style={{ width: "50px" }}
                />{" "}
                {numberWithCommas(Number(item.likes))}{" "}
              </span>
            </div>
            <div className="post-time">
              <span className="like">
                <i className="fa fa-comment" aria-hidden="true"></i>{" "}
                {numberWithCommas(Number(item.comments))}
              </span>
              <span className="like">
                <i className="fa fa-share-square-o" aria-hidden="true"></i>{" "}
                {numberWithCommas(Number(item.shares))}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsKol;
