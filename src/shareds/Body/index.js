import React, { PureComponent } from "react";
import { Container, Row } from "reactstrap";
import Styles from "./index.style";
import { CartItem, DetailsKol } from "../../components";

export default class extends PureComponent {
  render() {
    return (
      <Container fluid={true}>
        <Styles openSideBar={this.props.openSideBar} id="ieURIB">
          <Row>
            {!this.props.kolId && this.props.arrItem.map((item, index) => (
              <CartItem
                kolsDetails={this.props.kolsDetails}
                kolClicked={this.props.kolClicked}      
                key={index}
                index={index}
                item={item}
              />
            ))}
            {this.props.kolId &&
                <DetailsKol closeDetails={this.props.closeDetails} kolId={this.props.kolId} />
            }
          </Row>
        </Styles>
      </Container>
    );
  }
}