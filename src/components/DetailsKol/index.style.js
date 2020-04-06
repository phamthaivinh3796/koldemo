import styled from "styled-components";

export default styled.div`
    font-size: 12px;
    width: 100%;
    border-radius: 5px;
    margin: 0px !important;

    .col-body {
        height: auto;
        padding: 10px;
    }
    .header-analytic-wapper {
        margin-bottom: 20px;
    }
    .analytic-wapper {
        padding: 10px;
    }

    .analytic-box {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #dee2e626;

        .header {
            font-size: 20px;
            font-weight: bold;
            background-color: #dee2e626;
            width: 100%;
            text-align: center;
            text-shadow: 1px 1px #353030;
            color: #f8f9fa!important;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
        }
        .body {
            font-size: 30px;
            font-weight: bold;
            text-shadow: 1px 1px #353030;
            color: #f8f9fa!important;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }

    .channel-list {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        display: flex;
    }

    .latest-posts {
        font-size: 15px;
        font-weight: bold;
        color: #deefde !important;
        text-transform: uppercase;
        margin-top: 30px;
        padding: 10px;
        background: #252e40;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .post-template {
        padding: 10px;
        margin-top: 5px;
        background: #252e40;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .header-post {
        display: flex;
        text-shadow: 1px 1px #171616;

        .post-img{
            border-radius: 40px;
        }

        .post-img img{
            width: 35px;
            height: 35px;
            border: 1px solid #FFFFFF;
            box-shadow: 2px 1px 5px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.34);
            border-radius: 40px;
        }

        .post-content {
            font-size: 13px;
            line-height: 15px;
            color: #deefde !important;
            font-weight: 500;
            padding-left: 10px;
            margin-top: 5px;

            .post-time {
                margin-left: auto;
                font-size: 11px;
                color: #16a2b8;
                font-weight: 600;
            }
        }
    }

    .body-post {
        display: flex;
        text-shadow: 1px 1px #171616;
        flex-direction: column;

        .read-more {
            color: #77b6dc;
            cursor: pointer;
        }

        .post-img{
            border-radius: 40px;
            width: 100%;

            img {
                width: 100%;
                margin-top: 10px;
            }
        }

        .post-content {
            font-size: 13px;
            line-height: 15px;
            color: #deefde !important;
            font-weight: 500;
            padding-top: 10px;
        }
    }

    .footer-post {
        display: flex;
        margin-top: 10px;
        text-shadow: 1px 1px #171616;

        .post-interaction {
            display: flex;
            font-size: 11px;
            color: #16a2b8;
            font-weight: 600;
        }
        .post-time {
            margin-left: auto;
            font-size: 11px;
            color: #16a2b8;
            font-weight: 600;

            .like {
                margin-left: 10px;
            }
        }
    }

    .channel-card {
        cursor: pointer;
        margin-right: 2px;
        display: flex;
        padding: 10px;
        background: #252e40;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        justify-content: space-around;
        align-items: center;

        .channel-type {
            width: 35px;
            height: 35px;
            color: #FFFFFF;
            border-radius: 30px;
            background: #2773b5;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 2px 1px 5px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.34);
        }

        .channel-type-name{
            font-size: 8px;
            background: aqua;
            padding: 4px 8px;
            border-radius: 8px;
        }

        .channel-box-img {
            width: 35px;
            height: 35px;
            border: 3px solid #FFFFFF;
            box-shadow: 2px 1px 5px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.34);
        }

        .channel-name {
            font-size: 12px;
            color: #CCC;
            font-weight: bold;
            color: #f8f9fa!important;
            align-items: center;
            text-shadow: 1px 1px #353030;
        }
    }

    .channel-card-active {
        background: #333d52;
        border-bottom: 1px solid #4c5668;
    }

    .active-channel {
        background: #333d52;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 20px;
        overflow: auto;
    }
`;
