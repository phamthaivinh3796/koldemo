import styled from "styled-components";

export default styled.div`
    width: 300px;
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 30px 10px 10px 10px;
    color: #FFFFFF;
    font-size: 13px;
    position: fixed;
    right: 0px;
    z-index: 99999;
    top: 50px;
    background: #15171f;
    border-left: 1px solid #e8dfdf17;
    transform: ${props => props.openSideBar ? 'translateX(0%)' : 'translateX(100%)'};
    transition: ${props => props.openSideBar ? 'transform 0.3s ease-in-out' : 'transform 0.3s ease-in-out'};

    .filter-wapper-block {
        border: 1px solid #333d52;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 50px;

        .title-filter {
            font-size: 18px;
            margin-top: -35px;
            background: #14161e;
            width: 100px;
            padding: 10px;
            font-weight: bold;
            color: #556486;
        }

        .filter-block {
            color: #ddefde;

            .select__single-value{
                color: #FFFFFF !important;
            }
            .select__multi-value__remove {
                color: #333333;
            }
            .select__input input {
                color: #FFFFFF !important;
            }
            .block-name {
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .block-body {
                margin-bottom: 25px;
    
                .select__control {
                    background: #2c3e50;
                    border: none;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                }
    
                .select__indicator-separator {
                    background-color: transparent;
                }
            }
    
            .margin {
                margin-left: 20px;
            }
        }
    }
}
`;
