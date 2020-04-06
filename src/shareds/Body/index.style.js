import styled from "styled-components";

export default styled.div`
    .hidden-kols {
        display: none !important;
    }

    .kols-details {
        display: none !important;

       .col-body-content {
            border: none;
            padding: 10px;
       }
    }

    .kols-details-show {
        display: inherit !important;
    }
    
    .col-body {
        display:block;
        padding: 10px 15px;
        //  height: calc(100vh - 55px)
        height: 680px;
    }
    .col-body-content {
        height: 100%;
        background: #252e40;
        border: 1px solid rgba(91, 111, 138, 0.28);
        border-radius: 8px;
        display: inline-block;
        position: relative;
        width: 100%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);

        :hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }

        .light {
            background: #9dc59d;
        }

        .orange {
            background: #d39e00;
        }

        .gray {
            background: #adb5bd;
        }

        .light-blue {
            background: #58C9F3;
        }

        .light-yellow {
            background: #58C9F3;
        }

        .white {
            background: #deefde;
        }

        .col-body-content-top {
            width: 100%;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            display: flex;
            align-items: center;
            padding: 10px 10px 0px 10px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            flex-direction: column;

            .content-img {
                width: 80px;
                height: 80px;
                border-radius: 80px;
                border: 3px solid #FFFFFF;
                box-shadow: 2px 1px 5px rgba(0,0,0,0.22), 0 1px 2px rgba(0,0,0,0.34)
            }

            .top-info {
                padding: 10px;
                line-height: 18px;
                text-align: center;

                .tag {
                    color: #FFFFFF;
                    padding: 5px;
                    font-size: 12px;
                    background: #07a907;
                    border-radius: 5px;
                    margin-right: 10px;
                    margin-bottom: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }

                .top-info-name {
                    font-weight: bold;
                    font-size: 20px;
                    color: #FFFFFF;
                    text-shadow: 1px 1px #000000;
                }

                .top-info-job {
                    margin-top: 10px;
                    color: #f8f9fa;
                    font-size: 12px;
                    text-shadow: 1px 1px #000000d9;
                    background: #b55555;
                    padding: 3px 10px;
                    border-radius: 15px;
                }
            }
        }

        .col-body-content-body {
            width: 100%;
            display: flex;
            align-items: center;
            padding: 10px;
            justify-content: space-between;
            text-align: center;
            color: #FFFFFF;

            text-shadow: 1px 1px #b5b0b0;

            .body-column {
                border-right: 1px solid rgba(0, 0, 0, 0.07);
                padding: 0px 10px;
            }

            .reach-top {
                font-size: 15px;
                font-weight: bold;
                color: #333333;
            }

            .reach-bottom {
                font-size: 12px;
                color: #333333;
                font-weight: 500;
            }
        }

        .col-body-content-latest-post {
            padding-top: 10px;
            padding-bottom: 10px;
            margin: 0px 10px;

            .content {
                text-shadow: 1px 1px #171616;
            }

            .tag {
                color: #FFFFFF;
                padding: 5px;
                font-size: 12px;
                background: #07a907;
                border-radius: 5px;
                margin-right: 10px;
                margin-bottom: 5px;
                cursor: pointer;
                font-weight: bold;
            }

            .title-wapper {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: -10px;
            }
            

            .title {
                color: #FFFFFF;
                font-weight: bold;
                font-size: 13px;
                margin-left: 10px;
                width: 100px;
            }

            .title-line {
                margin: 0px;
                border: 0;
                border-top: 1px solid #dee2e626;
                width: 100%;
            }

            .content-header {
                display: flex;
                padding: 10px;

                .post-img {
                    width: 60px;
                    border-radius: 2px;
                }

                .post-content {
                    margin: 0px 5px;

                    .post-content-title {
                        font-size: 13px;
                        line-height: 15px;
                        color: #f8f9fa;
                        font-weight: 500;
                        word-break: break-word;
                    }
                }
            }
            .content-footer {
                display: flex;
                padding: 0px 10px 10px 10px;
                justify-content: space-between;
                font-size: 11px;
                color: #16a2b8;
                font-weight: 600;
            }

            .overview {
                // display:block;
                display: flex;
                justify-content: space-around;
                align-items: center;

                i {
                    font-size: 40px;
                    color: #ddefde;
                }

                .overview-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #ddefde;
                    padding: 10px;
                    text-shadow: 1px 1px #171616;
                }

                .overview-title {
                    font-size: 12px;
                    font-weight: bold;
                }
            }
        }

        .col-body-content-footer {
            position: absolute;
            bottom: 0;
            width: 100%;

            hr {
                margin-top: 1rem;
                margin-bottom: 1rem;
                border: 0;
                border-top: 1px solid #dee2e626;
            }

            .tag {
                color: #FFFFFF;
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
        }
    }

`;
