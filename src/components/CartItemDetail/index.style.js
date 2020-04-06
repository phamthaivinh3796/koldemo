import styled from "styled-components";

export default styled.div`
  height: 100% !important;
  .overview-content i {
    cursor: pointer;
  }

  .btn-group-top {
    display: flex;
    justify-content: space-between;
    margin-top: -13px;
    margin-left: -5px;
    margin-right: -5px;

    button {
      font-size: 10px;
      width: 100%;
      margin: 5px;
    }
  }

  .back-btn {
    cursor: pointer;
    position: absolute;
    color: #ffffff;
    padding: 5px 30px;
    font-size: 11px;
    margin: 4px;
    background: #1e2330;
    border-radius: 5px;
  }

  .kol-details-left {
    overflow: auto;
    padding: 10px;
  }

  .info-row-details {
    min-height: 20px;
    margin-bottom: 10px;
  }

  .col-body-content {
    height: auto;
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

  .tag {
    color: #ffffff;
    padding: 5px;
    font-size: 12px;
    background: #808080;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 5px;
    float: left;
    cursor: pointer;
    font-weight: bold;
  }

  .info-row {
    margin: 0px;
    border: 1px solid #deefde;
    margin-bottom: 10px;
    margin-bottom: 4px;
    font-size: 14px;
    margin-bottom: 20px;
    border-radius: 5px;

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
      display: block !important;
      align-items: center;
      text-shadow: 1px 1px #353030;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;
