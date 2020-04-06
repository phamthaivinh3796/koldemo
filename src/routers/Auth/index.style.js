import styled from "styled-components";

export default styled.div`
  .login-dark {
    margin-top: -50px;
    height: 100vh;
    background: #475d62 url(../img/star-sky.jpg);
    background-size: cover;
    position: relative;
  }

  .login-dark form {
    max-width: 400px;
    width: 90%;
    background-color: #1e2833;
    padding: 40px;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
  }

  .login-dark .illustration {
    font-size: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #bbc6ca;

    img {
      width: 80px;
      margin-bottom: 10px;
    }
  }

  .login-dark form .form-control {
    background: none;
    border: none;
    border-bottom: 1px solid #434a52;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
  }

  .login-dark form .btn-primary {
    background: #214a80;
    border: none;
    border-radius: 4px;
    padding: 11px;
    box-shadow: none;
    margin-top: 26px;
    text-shadow: none;
    outline: none;
  }

  .login-dark form .btn-primary:hover,
  .login-dark form .btn-primary:active {
    background: #214a80;
    outline: none;
  }

  .login-dark form .forgot {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #6f7a85;
    opacity: 0.9;
    text-decoration: none;

    a {
      color: #00aeef;
    }
  }

  .login-dark form .forgot:hover,
  .login-dark form .forgot:active {
    opacity: 1;
    text-decoration: none;
  }

  .login-dark form .btn-primary:active {
    transform: translateY(1px);
  }
`;
