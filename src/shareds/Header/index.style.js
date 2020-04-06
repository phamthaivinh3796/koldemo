import styled from "styled-components";

export default styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  background: #333d53;
  color: #dae0e5;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 10;
  border-bottom: 1px solid #e8dfdf17;

  .navigation {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    cursor: pointer;
  }

  .logo {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    cursor: pointer;
    flex-direction: column;
    line-height: 10px;

    a {
      color: #ffffff;
    }
    .logo-img {
      width: 30px;
      height: 30px;
    }

    .logo-name {
      font-size: 8px;
    }
  }

  .site-name {
    font-size: 15px;
    font-weight: bold;
  }

  .right-wapper {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 10px;
    order: 2;

    .search {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      border-radius: 5px;
      input {
        width: 250px;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        height: 25px;
        padding: 0 0 0 10px;
        background: #15171f;
        color: #dae0e5;

        :focus {
          outline: none;
        }
      }
    }

    .filter {
      display: flex;
      align-items: center;
      border-radius: 5px;
      height: 25px;
      padding: 0 0 0 10px;
      background: #15171f;
      color: #dae0e5;
      margin-left: 20px;
      width: 130px;
      font-size: 12px;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

      i {
        margin-right: 10px;
        font-size: 17px;
      }
    }
  }
`;
