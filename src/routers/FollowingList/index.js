import React, { PureComponent } from "react";
import { Container, Row } from "reactstrap";
import Styles from "./index.style";
import { ClipLoader } from "react-spinners";
import { change_alias } from "../../utils";
import { CartItem, DetailsKol } from "../../components";

export default class extends PureComponent {
  state = {
    kolsDetails: false,
    channel: 1,
    kolId: null,
    pos: 0,
    data: null,
    countFavorite: 0
  };

  kolClicked = (name, pos) => {
    this.setState({
      kolsDetails: true,
      kolId: name,
      pos: pos
    });
  };

  updateBooking = data => {
    const newUser = {
      ...this.state.data,
      bookings: [...this.state.data.bookings, data]
    };

    this.setState({
      data: newUser
    });
  };

  setFavoriteCount = data => {
    const newUser = {
      ...this.state.data,
      favorite: {
        profiles: data.profiles
      }
    };

    this.setState({
      countFavorite: this.state.countFavorite + 1,
      data: newUser
    });
  };

  removeFavoriteCount = data => {
    const newUser = {
      ...this.state.data,
      favorite: {
        profiles: this.state.data.favorite.profiles.filter(
          item => item.id !== data.id
        )
      }
    };
    this.setState({
      data: newUser,
      countFavorite: this.state.countFavorite - 1
    });
  };

  closeDetails = () => {
    this.setState({
      kolsDetails: false,
      kolId: null
    });
    setTimeout(() => {
      window.scrollTo(0, this.state.pos);
    }, 200);
    setTimeout(() => {
      this.setState({
        pos: 0
      });
    }, 400);
  };

  updateUser = (id, favorite) => {
    const filterItem = this.state.data.favorite.profiles.map(item => {
      return item.id === id ? { ...item, isShow: true } : item;
    });
    const newData = {
      ...this.state.data,
      favorite: {
        profiles: filterItem
      }
    };
    this.setState({
      data: newData
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data &&
      nextProps.data.user &&
      JSON.stringify(nextProps.data.user) !==
        JSON.stringify(this.props.data.user)
    ) {
      this.setState({
        data: nextProps.data.user,
        countFavorite: nextProps.data.user.favorite
          ? nextProps.data.user.favorite.profiles.length
          : 0
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

    let newData = this.state.data.favorite
      ? this.state.data.favorite.profiles
          .filter(item => !item.isShow)
          .filter(item => {
            return (
              change_alias(item.fullname)
                .toLowerCase()
                .search(change_alias(this.props.valueSearch).toLowerCase()) !==
                -1 ||
              (item.nickname &&
                change_alias(item.nickname)
                  .toLowerCase()
                  .search(
                    change_alias(this.props.valueSearch).toLowerCase()
                  ) !== -1)
            );
          })
      : [];
    //sort channel - start
    const dataSortChannelData = newData.map(item => {
      let newChannel = [];
      item.channel.map(i => {
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
      item.channel = data;
      return item;
    });
    newData = dataSortChannelData;

    //end sort

    const favorite =
      this.state.data && this.state.data.favorite
        ? this.state.data.favorite.profiles
        : [];
    const booking =
      this.state.data && this.state.data.bookings
        ? this.state.data.bookings
        : [];

    return (
      <Container fluid={true}>
        <Styles>
          <Row>
            {!this.state.kolId &&
              newData.map((item, index) => {
                const isFavorite = favorite.find(i => i.id === item.id);
                const isBooking = booking.find(
                  i => i.profiles[0].id === item.id
                );
                return (
                  <CartItem
                    user={this.state.data}
                    kolsDetails={this.kolsDetails}
                    kolClicked={this.kolClicked}
                    key={item.id}
                    index={index}
                    getUser={this.props.getUser}
                    updateBooking={this.updateBooking}
                    item={item}
                    isFavorite={isFavorite ? true : false}
                    isBooking={isBooking ? true : false}
                    updateUser={this.updateUser}
                  />
                );
              })}
            {this.state.kolId && (
              <DetailsKol
                closeDetails={this.closeDetails}
                setFavoriteCount={this.setFavoriteCount}
                removeFavoriteCount={this.removeFavoriteCount}
                updateBooking={this.updateBooking}
                kolId={this.state.kolId}
                getUser={this.props.getUser}
                updateBooking={this.updateBooking}
                user={this.state.data}
                countFavorite={this.state.countFavorite}
                isFavorite={
                  favorite.find(i => i.id === this.state.kolId) ? true : false
                }
                isBooking={
                  booking.find(i => i.profiles[0].id === this.state.kolId)
                    ? true
                    : false
                }
              />
            )}
          </Row>
        </Styles>
      </Container>
    );
  }
}
