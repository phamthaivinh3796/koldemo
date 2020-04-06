import React, { Component } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

class Chanel extends Component {
  render() {
    return (
      <Col onClick={()=>this.props._changeChannel(this.props.channel)} lg="6" xl="12" className="mb-4">
        <Card className="card-stats mb-4 mb-xl-0">
          <CardBody>
            <Row>
              <div>
                <img
                  alt='avatar'
                  className="align-self-center rounded-circle mr-3"
                  style={{ width: 85, height: 85 }}
                  src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/p960x960/75418161_2975752192453227_7747867242431250432_o.jpg?_nc_cat=1&_nc_ohc=bHZi41l-U48AX9hjvj8&_nc_ht=scontent.fsgn2-4.fna&_nc_tp=1002&oh=702969bf3745b34008c0e57c2a7f8891&oe=5ED75E52"
                />
              </div>
              <div className="col">
                <CardTitle tag="h1" className="text-uppercase text-muted mb-0">
                  Min
                </CardTitle>
                <div>
                  <div>
                    <p className="badge badge-success mr-2">Singer</p>
                  </div>
                  <label>Last activity : 1 days ago</label>
                </div>
              </div>
              <div style={{backgroundColor:"#4d94ff"}} className="icon icon-shape text-white rounded-circle shadow">
              </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Chanel;
  