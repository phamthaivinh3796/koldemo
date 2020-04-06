import React, { PureComponent } from "react";
import Styles from "./index.style";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  NotificationManager,
  NotificationContainer
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// const defaultUser = [
//   {
//     username: "koldemo@kompa.ai",
//     password: "koldemo123",
//     id: 1
//   },
//   {
//     username: "huytran@unicorndg.com",
//     password: "unicorndg@demokol",
//     id: 3
//   }
// ];

export default class extends PureComponent {
  state = {
    username: "",
    password: ""
  };

  submitForm = e => {
    e.preventDefault();
    const defaultUser = this.props.users;
    const findUser = defaultUser.find(item => item.email === this.state.user);
    if (findUser) {
      if (findUser.password === this.state.password) {
        localStorage.setItem("User", JSON.stringify({ user: this.state.user }));
        this.props.history.push("/");
      } else {
        NotificationManager.error("", "Wrong password!", 1000);
      }
    } else {
      NotificationManager.error("", "User does not exist!", 1000);
    }
  };

  render() {
    if (localStorage.getItem("User")) {
      return <Redirect to="/" />;
    }
    return (
      <Styles>
        <div className="login-dark">
          <form onSubmit={e => this.submitForm(e)}>
            <h2 className="sr-only">Login Form</h2>
            <div className="illustration">
              <img src="../img/logoKompa.png" />
              Kompa Group - Kols Dashboard
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={e => this.setState({ user: e.target.value })}
                placeholder="Username or email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                Log In
              </button>
            </div>
            <div className="forgot">
              Contact us: <a href="mailto:dev@kompa.ai">dev@kompa.ai</a>
            </div>
          </form>
        </div>
        <NotificationContainer />
      </Styles>
    );
  }
}
