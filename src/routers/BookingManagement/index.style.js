import styled from "styled-components";

export default styled.div`
    padding: 20px;

    .btn-decline {
        display: inline-block;
        font-weight: 400;
        padding: 5px 15px;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        transition: all .15s ease-in-out;
        border-radius: 0;
        color: #c5959a;
        background-color: transparent;
        background-image: none;
        border-color: #c5959a;
    }

    .btn-accept {
        display: inline-block;
        font-weight: 400;
        padding: 5px 15px;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        transition: all .15s ease-in-out;
        border-radius: 0;
        color: #95c8ff;
        background-color: transparent;
        background-image: none;
        border-color: #95c8ff;
        margin-left: 10px;
    }

    .badge-number {
        position: absolute;
        right: 10px;
        top: 9px;
        padding: 5px 10px;
        border-radius: 30px;
        background: #b96666;
        font-size: 11px;
        width: 23px;
        font-weight: bold;
        height: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    }
    table {
        color: #dae0e5;
        font-size: 13px;

        thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #1e2330;
            text-align: center;
        }

        tbody {
            tr:nth-child(even) {
                background: rgba(255, 255, 255, 0.15);
            }
        }

        td {
            border-top: none;
            text-align: center;
            vertical-align: middle;

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

            .tag-cat {
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

            .tag-channel {
                padding: 5px;
                font-size: 18px;
            }
        }
        th {
            border-top: none;
        }
    }

    .tab-content {
        background: #333d52;
        padding: 10px;
        color: #FFFFFF;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
    }

    .nav-tabs {
        border-bottom: none;

        .nav-link {
            border: none;
            color: #dae0e5;
            padding: .5rem 2.5rem .5rem 1rem;
            cursor: pointer;

            &.active {
                background-color: #333d52;
                border: none;
                color: #dae0e5;
            }
        }

        .nav-item {
            margin-bottom: 0px;
            position: relative;
        }
    }
`;
