import styled from "styled-components";

export default styled.div`
  .plus-tag {
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 28px;
    cursor: pointer;
  }

  .dropdown {
    button {
      height: 28px;
      /* width: 30px; */
      padding: 2px 10px;
      font-weight: bold;
    }
  }

  .dropdown-menu {
    padding: 0px;
    outline: none;
  }

  .dropdown-item {
    padding: 5px;
  }

  .speech-bubble {
    position: relative;
    background: #00aabb;
    border-radius: 0.4em;
    box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.3);
  }

  .favorite-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ffffff;
    text-shadow: 1px 1px #8e8282;
    cursor: pointer;

    &.active {
      color: yellow;
    }
  }

  .booking-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #ffffff;
    text-shadow: 1px 1px #8e8282;
    cursor: pointer;

    &.active {
      color: yellow;
    }
  }

  .no-post {
    text-align: center;
    color: #ffffff54;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
  }

  .group-interaction {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .group-interaction-item {
      margin-right: 10px;
      white-space: nowrap;
    }
  }

  .overview-content i {
    cursor: pointer;
  }

  .kol-details-left {
    overflow: auto;
    height: calc(100vh - 234px);
    padding: 10px;
  }

  .speech-bubble:after {
    content: "";
    position: absolute;
    top: 0;
    left: ${props => {
      return props.activeChannel === "PROFILE"
        ? "16%"
        : props.activeChannel === "FANPAGE"
        ? "40%"
        : props.activeChannel === "YOUTUBE"
        ? "65%"
        : props.activeChannel === "INSTAGRAM"
        ? "90%"
        : "15%";
    }};
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #ddefde;
    border-top: 0;
    margin-left: -20px;
    margin-top: -8px;
  }

  .col-body-content-body {
    width: auto !important;
  }

  .top-info-nickname {
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 1px 1px #000000;
  }

  .info-row {
    margin: 0px;
    border: 1px solid #deefde;
    margin-bottom: 10px;
    margin-bottom: 4px;
    font-size: 14px;
    margin-bottom: 20px;

    .left-col {
      background: #deefde !important;
      color: #333d52;
      display: flex;
      align-items: center;
      font-weight: bold;
      text-shadow: 1px 1px #b5b0b0;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .right-col {
      display: flex;
      align-items: center;
      text-shadow: 1px 1px #353030;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    
  }
`;
