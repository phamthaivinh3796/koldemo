import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import { ClipLoader, SyncLoader } from "react-spinners";
import Main from "./Main/index.container";

export default class App extends PureComponent {
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

    const users = this.props.data.users;

    return (
      <Switch>
        <Route
          path="/login"
          render={props => <Auth users={users} {...props} />}
        />
        <Route path="/" render={props => <Main users={users} {...props} />} />
      </Switch>
    );
  }
}
