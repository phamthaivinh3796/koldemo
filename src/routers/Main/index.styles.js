import styled from "styled-components";

export default styled.div`
.notification {
    box-sizing: border-box;
    padding: 10px 15px 15px 58px;
    border-radius: 2px;
    color: #fff;
    background-color: #ccc; 
    box-shadow: none !important;
    cursor: pointer;
    font-size: 1em;
    line-height: 1.2em;
    position: relative;
    opacity: 0.9;
    margin-top: 15px;
}

.notification-success {
    background-color: #51a351;
}

.notification .title {
    font-size: 1em;
    line-height: 1.2em;
    font-weight: bold;
    margin: 0 0 5px 0;
    font-size: 13px;
    height: 100%;
    margin-top: 10px;
}
`;
