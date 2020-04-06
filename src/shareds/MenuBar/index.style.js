import styled from "styled-components";

export default styled.div`
    width: 250px;
    padding-top: 10px;
    height: 100vh;
    color: #FFFFFF;
    font-size: 13px;
    position: fixed;
    left: 0px;
    z-index: 99999;
    top: 50px;
    background: #15171f;
    border-left: 1px solid #e8dfdf17;
    transform: ${props => props.openMenuBar ? 'translateX(0%)' : 'translateX(-100%)'};
    transition: ${props => props.openMenuBar ? 'transform 0.3s ease-in-out' : 'transform 0.3s ease-in-out'};

    .menu-item {
        cursor: pointer;
        a {
            color: #ffffffa8;
            padding: 10px;
            display: flex;
            text-decoration: none;
            cursor: pointer;
            align-items: center;
            &.active {
                background: #333d53;
                color: #FFFFFF;
                background: #333d53;
                font-weight: bold;
            }

            &:hover {
                background: #333d53;
            }
        }
        
    }

    .filter-block {
        color: #ddefde;
        .block-name {
            font-size: 16px;
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
`;
