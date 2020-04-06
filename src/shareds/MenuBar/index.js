import React, { PureComponent } from "react";
import Styles from "./index.style";
import onClickOutside from "react-onclickoutside";
import { NavLink } from "react-router-dom";

class MenuBar extends PureComponent {
  handleClickOutside = evt => {
    this.props.closeMenuBar();
  };

  render() {
    return (
      <Styles openMenuBar={this.props.openMenuBar}>
        <div className="menu-item">
          <NavLink activeClassName="active" to="/influencer-discovery">
            <i className="fa fa-users"></i>&nbsp;&nbsp;Influencer Discovery
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink activeClassName="active" to="/following-list">
            <i className="fa fa-star"></i>&nbsp;&nbsp;Following List
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink activeClassName="active" to="/booking-management">
            <i className="fa fa-shopping-cart"></i>&nbsp;&nbsp;Booking
            Management
          </NavLink>
        </div>
        <div className="menu-item">
          <NavLink activeClassName="active" to="/campaign-tracking">
            <i className="fa fa-tachometer"></i>&nbsp;&nbsp;Campaign Tracking
          </NavLink>
        </div>
      </Styles>
    );
  }
}

export default onClickOutside(MenuBar);
