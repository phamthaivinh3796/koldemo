import React, { PureComponent } from "react";
import { ClipLoader } from "react-spinners";
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Styles from "./index.style";

export default class extends PureComponent {
  state = {
    activeTab: '1'
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { data: { loading, error } } = this.props;

    if (!this.props.data) {
      return <>Nodata</>;
    }
    if (loading) {
      return <div className="box confirmed confirmed-box" style={{ height: 'calc(100vh - 60px)', margin: '5px 0px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <ClipLoader size={45} color={"#bdbdbd"} loading={true} />
      </div>;
    }

    if (error) {
      return <div className="box confirmed confirmed-box" style={{ height: 'calc(100vh - 60px)', margin: '5px 0px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <ClipLoader size={45} color={"#bdbdbd"} loading={true} />
      </div>;
    }

    return (
      <Container fluid={true}>
        <Styles className="tabs" openSideBar={this.props.openSideBar} id="ieURIB">
          coming soon
        </Styles>
      </Container>
    );
  }
}