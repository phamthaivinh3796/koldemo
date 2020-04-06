import React, { PureComponent } from "react";
import Styles from "./index.style";
import { NavLink } from "react-router-dom";

export default class extends PureComponent {
  render() {
    return (
      <Styles>
        <span className="navigation" onClick={() => this.props.toggleMenuBar()}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </span>
        <span className="logo">
          <NavLink to="/influencer-discovery">
            <img alt={"kompa"} className="logo-img" src="./img/logoKompa.png" />
          </NavLink>
          <NavLink to="/influencer-discovery">
            <span className="logo-name">Kompa Group</span>
          </NavLink>
        </span>
        <span className="site-name">KOLS DASHBOARD</span>
        <span className="right-wapper">
          <span className="search">
            <input
              name="str"
              onChange={e => this.props._handleChangeDataSearch(e.target.value)}
              placeholder="Input keyword..."
            />
          </span>
          <span className="filter" onClick={() => this.props.toggleSideBar()}>
            <i className="fa fa-filter" aria-hidden="true"></i>
            <span>Advance Filter</span>
          </span>
        </span>
      </Styles>
    );
  }
}
