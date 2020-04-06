import React, { PureComponent } from "react";
import { Container, Row } from "reactstrap";
import Styles from "./index.style";
import { ClipLoader, SyncLoader } from "react-spinners";
import { change_alias, collapseArray } from "../../utils";
import { CartItem, DetailsKol } from "../../components";

export default class extends PureComponent {
  state = {
    kolsDetails: false,
    channel: 1,
    kolId: null,
    pos: 0,
    pagination: 16,
    loadingMore: false,
    data: [],
    user: null,
    countFavorite: 0
  };

  removePagination = () => {
    this.setState({
      pagination: 16
    });
  };

  kolClicked = (name, pos) => {
    this.setState({
      kolsDetails: true,
      kolId: name,
      pos: pos
    });
  };

  setBooking = data => {
    const newUser = {
      ...this.state.user,
      favorite: {
        profiles: [...this.state.user.favorite.profiles, data]
      }
    };
    this.setState({
      countFavorite: this.state.countFavorite + 1,
      user: newUser
    });
  };

  updateBooking = data => {
    const newUser = {
      ...this.state.user,
      bookings: [...this.state.user.bookings, data]
    };

    this.setState({
      user: newUser
    });
  };

  setFavoriteCount = data => {
    const newUser = {
      ...this.state.user,
      favorite: {
        profiles: data.profiles
      }
    };
    this.setState({
      countFavorite: Number(this.state.countFavorite) + 1,
      user: newUser
    });
  };

  removeFavoriteCount = data => {
    const newUser = {
      ...this.state.user,
      favorite: {
        profiles: this.state.user.favorite.profiles.filter(
          item => item.id !== data.id
        )
      }
    };
    this.setState({
      countFavorite: Number(this.state.countFavorite) - 1,
      user: newUser
    });
  };

  loadMore = () => {
    this.setState({
      loadingMore: true
    });

    setTimeout(() => {
      this.setState({
        loadingMore: false,
        pagination: this.state.pagination + 16
      });
    }, 1000);
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

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data &&
      nextProps.data.profiles &&
      JSON.stringify(this.props.data.profiles) !==
        JSON.stringify(nextProps.data.profiles)
    ) {
      this.setState({
        data: nextProps.data.profiles
      });
    }
    if (
      nextProps.data &&
      nextProps.data.user &&
      JSON.stringify(nextProps.data.user) !==
        JSON.stringify(this.props.data.user)
    ) {
      this.setState({
        user: nextProps.data.user,
        countFavorite: nextProps.data.user.favorite
          ? nextProps.data.user.favorite.profiles.length
          : null
      });
    }

    if (
      JSON.stringify(nextProps.occupations) !==
        JSON.stringify(this.props.occupations) ||
      JSON.stringify(nextProps.locations) !==
        JSON.stringify(this.props.locations) ||
      JSON.stringify(nextProps.categories) !==
        JSON.stringify(this.props.categories) ||
      JSON.stringify(nextProps.chanel) !== JSON.stringify(this.props.chanel) ||
      JSON.stringify(nextProps.gender) !== JSON.stringify(this.props.gender) ||
      JSON.stringify(nextProps.locationsAudience) !==
        JSON.stringify(this.props.locationsAudience) ||
      JSON.stringify(nextProps.genderAudience) !==
        JSON.stringify(this.props.genderAudience) ||
      JSON.stringify(nextProps.ageRange) !==
        JSON.stringify(this.props.ageRange) ||
      nextProps.valueSearch !== this.props.valueSearch
    ) {
      this.removePagination();
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

    const newData = this.state.data.filter(item => {
      return (
        change_alias(item.fullname)
          .toLowerCase()
          .search(change_alias(this.props.valueSearch).toLowerCase()) !== -1 ||
        (item.nickname &&
          change_alias(item.nickname)
            .toLowerCase()
            .search(change_alias(this.props.valueSearch).toLowerCase()) !== -1)
      );
    });
    //filter AudienceSize
    const newDataAudienceSize =
      this.props.sizeAudience.value !== "none"
        ? newData.filter(item => {
            const existed = item.channel.find(i => {
              if (i.audienceSize === this.props.sizeAudience.value) return i;
            });
            if (existed) return item;
          })
        : newData;

    const newDataMapOccupations =
      this.props.occupations.length > 0
        ? newDataAudienceSize.filter(item => {
            return item.occupation.find(i =>
              this.props.occupations.map(a => a.value).includes(i.name)
            );
          })
        : newDataAudienceSize;

    const newDataMapLocations =
      this.props.locations.length > 0
        ? newDataMapOccupations.filter(item => {
            return item.location.find(i =>
              this.props.locations.map(a => a.value).includes(i.name)
            );
          })
        : newDataMapOccupations;

    const newDataCategories =
      this.props.categories.length > 0
        ? newDataMapLocations.filter(item => {
            return item.category.find(i =>
              this.props.categories.map(a => a.value).includes(i.name)
            );
          })
        : newDataMapLocations;

    const newDataChannel =
      this.props.chanel.length > 0
        ? newDataCategories.filter(item => {
            return item.channel.find(i =>
              this.props.chanel.map(a => a).includes(i.channelType)
            );
          })
        : newDataCategories;

    const newDataGender =
      this.props.gender.length > 0
        ? newDataChannel.filter(item => {
            return this.props.gender.includes(item.gender);
          })
        : newDataChannel;

    const favorite =
      this.state.user && this.state.user.favorite
        ? this.state.user.favorite.profiles
        : [];
    const booking =
      this.state.user && this.state.user.bookings
        ? this.state.user.bookings
        : [];

    //AgeRange

    const filterAudienceByAgeRange =
      this.props.ageRange.value !== "none"
        ? newDataGender.map(item => {
            item.channel.sort((a, b) => {
              const getAgeRangeA = a.ageRange.find(
                item => item.ageGroup === this.props.ageRange.value
              );
              const getAgeRangeB = b.ageRange.find(
                item => item.ageGroup === this.props.ageRange.value
              );
              const checkUnderfineA = getAgeRangeA ? getAgeRangeA.value : 0;
              const checkUnderfineB = getAgeRangeB ? getAgeRangeB.value : 0;
              return checkUnderfineA > checkUnderfineB ? -1 : 1;
            });
            return item;
          })
        : newDataGender;
    //channel[0] use for sort profile

    filterAudienceByAgeRange.sort((a, b) => {
      const getAgeRangeMaxValueA = a.channel[0].ageRange.find(
        item => item.ageGroup === this.props.ageRange.value
      );

      const getAgeRangeMaxValueB = b.channel[0].ageRange.find(
        item => item.ageGroup === this.props.ageRange.value
      );
      const checkUnderA = getAgeRangeMaxValueA ? getAgeRangeMaxValueA.value : 0;
      const checkUnderB = getAgeRangeMaxValueB ? getAgeRangeMaxValueB.value : 0;
      return checkUnderA > checkUnderB ? -1 : 1;
    });
    let dataSortAgeRange = filterAudienceByAgeRange.map(item => item);

    //Gender
    if (this.props.genderAudience.value !== "none") {
      if (this.props.ageRange.value === "none") {
        const newDataSortGender = dataSortAgeRange.map(item => {
          item.channel.sort((a, b) => {
            const getGenderA = a.genderRange.find(
              item => item.gender === this.props.gender.value
            );
            const getGenderB = b.genderRange.find(
              item => item.gender === this.props.gender.value
            );
            const checkUnderfineA = getGenderA ? getGenderA.value : 0;
            const checkUnderfineB = getGenderB ? getGenderB.value : 0;
            return checkUnderfineA > checkUnderfineB ? -1 : 1;
          });
          return item;
        });
        dataSortAgeRange = newDataSortGender.map(item => item);
      }

      //sort profile
      dataSortAgeRange.sort((a, b) => {
        const getGenderValueA = a.channel[0].genderRange.find(
          item => item.gender === this.props.genderAudience.value
        );

        const getGenderValueB = b.channel[0].genderRange.find(
          item => item.gender === this.props.genderAudience.value
        );
        const checkUnderA = getGenderValueA ? getGenderValueA.value : 0;
        const checkUnderB = getGenderValueB ? getGenderValueB.value : 0;
        return checkUnderA > checkUnderB ? -1 : 1;
      });
    }

    let dataSortGenderRange = dataSortAgeRange.map(item => item);

    //location
    let dataSortLocationRange = dataSortGenderRange.map(item => item);
    if (this.props.locationsAudience.value !== "none") {
      dataSortLocationRange = dataSortLocationRange.filter(item => {
        const existedLocation = item.location.find(i => {
          return i.name === this.props.locationsAudience.value;
        });
        if (existedLocation) return item;
      });
    }
    const dataSortGenderRangeAndSortChannel = dataSortLocationRange.map(
      item => {
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
      }
    );
    dataSortLocationRange = dataSortGenderRangeAndSortChannel;
    //get lasted post
    const dataLastedPost = dataSortLocationRange.map(item => {
      item.channel.map(i => {
        //sort post in channel
        i.post.sort((a, b) => {
          const dateA = new Date(a.publishedAt);
          const dateB = new Date(b.publishedAt);
          return dateA > dateB ? -1 : 1;
        });
        //sort locationAudience

        return i;
      });
      return item;
    });
    dataSortLocationRange = dataLastedPost;
    return (
      <Container fluid={true}>
        <Styles openSideBar={this.props.openSideBar} id="ieURIB">
          <Row>
            {!this.state.kolId &&
              dataSortLocationRange
                .slice(0, this.state.pagination)
                .map((item, index) => {
                  const isFavorite = favorite.find(i => i.id === item.id);
                  const isBooking = booking.find(
                    i => i.profiles[0].id === item.id
                  );
                  return (
                    <CartItem
                      user={this.state.user}
                      kolsDetails={this.kolsDetails}
                      kolClicked={this.kolClicked}
                      key={item.id}
                      index={index}
                      getUser={this.props.getUser}
                      setFavoriteCount={this.setFavoriteCount}
                      updateBooking={this.updateBooking}
                      removeFavoriteCount={this.removeFavoriteCount}
                      countFavorite={this.state.countFavorite}
                      item={item}
                      isFavorite={isFavorite ? true : false}
                      isBooking={isBooking ? true : false}
                    />
                  );
                })}
            {!this.state.kolId &&
              dataSortLocationRange.slice(0, this.state.pagination).length !==
                dataSortLocationRange.length && (
                <div className="load-more">
                  <button
                    className="load-more-btn"
                    onClick={() => this.loadMore()}
                  >
                    {this.state.loadingMore ? (
                      <SyncLoader size={8} color={"#FFFFFF"} loading={true} />
                    ) : (
                      "Load more"
                    )}
                  </button>
                </div>
              )}
            {this.state.kolId && (
              <DetailsKol
                closeDetails={this.closeDetails}
                kolId={this.state.kolId}
                getUser={this.props.getUser}
                setFavoriteCount={this.setFavoriteCount}
                removeFavoriteCount={this.removeFavoriteCount}
                countFavorite={this.state.countFavorite}
                user={this.state.user}
                updateBooking={this.updateBooking}
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
