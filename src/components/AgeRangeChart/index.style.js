import styled from "styled-components";

export default styled.div`

.speech-bubble {
	position: relative;
	background: #00aabb;
    border-radius: .4em;
    box-shadow: 3px 7px 7px 0px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.30);
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

.speech-bubble:after {
	content: '';
    position: absolute;
    top: 0;
    left: ${props => props.activeChannel === 'PROFILE' ? '15%' : props.activeChannel === 'FANPAGE' ? '38%' : props.activeChannel === 'YOUTUBE' ? '65%' : props.activeChannel === 'INSTAGRAM' ? '90%' : '15%'};
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #ddefde;
    border-top: 0;
    margin-left: -20px;
    margin-top: -8px;
}

.col-body-content-body{
    width: auto !important;
}

.top-info-nickname {
    font-size: 12px;
    font-weight: bold;
    color: #FFFFFF;
    text-shadow: 1px 1px #000000;
}


.info-row {
    margin: 0px;
    height: 40px;
    border: 1px solid #deefde;
    margin-bottom: 10px;
    margin-bottom: 4px;
    font-size: 14px;

    .left-col {
        background: #deefde !important;
        color: #333d52;
        display: flex;
        align-items: center;
        font-weight: bold;
        text-shadow: 1px 1px #b5b0b0;
    }

    .right-col {
        display: flex;
        align-items: center;
        text-shadow: 1px 1px #353030;
    }
}
`;
