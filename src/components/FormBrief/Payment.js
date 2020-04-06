import React, { Component } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const BOOKING = gql`
  mutation createOneContactbref($data: ContactbrefCreateInput!) {
    createOneContactbref(data: $data) {
      id
    }
  }
`;

const UPDATE = gql`
  mutation updateOneBooking(
    $data: BookingUpdateInput!
    $where: BookingWhereUniqueInput!
  ) {
    updateOneBooking(data: $data, where: $where) {
      status
    }
  }
`;

export default class Payment extends Component {
  state = {
    totalBudget: this.props.formData ? this.props.formData.totalBudget : "",
    paymentTerm: this.props.formData ? this.props.formData.paymentTerm : "",
    error: null
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  updateInfo = (name, data) => {
    this.setState({
      [name]: data
    });
  };

  submitForm = (API, updateOneBooking) => {
    if (this.state.totalBudget === "") {
      this.setState({
        error: "Please fill al required fields!"
      });
    } else {
      const { error, ...dataSend } = this.state;
      // this.props.setActiveStep(0);
      this.props.setFormData("form5", dataSend);
      setTimeout(() => {
        this.props.saveDataForm(API, updateOneBooking);
      }, 500);
    }
  };

  render() {
    const { error } = this.state;

    return (
      <div>
        <div className="body-form">
          <small style={{ color: "red" }}>{this.state.error}</small>
          <Form>
            <FormGroup row>
              <Label for="totalBudget" sm={3}>
                Total Budget *
              </Label>
              <Col sm={9}>
                <Input
                  type="number"
                  name="totalBudget"
                  id="totalBudget"
                  value={this.state.totalBudget}
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  className={
                    this.state.totalBudget === "" && error ? "error" : ""
                  }
                  placeholder="Total Budget"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={3}>
                Payment Term
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  placeholder="Payment Term"
                  type="textarea"
                  value={this.state.paymentTerm}
                  name="paymentTerm"
                  id="exampleText"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Mutation mutation={UPDATE}>
                {updateOneBooking => {
                  return (
                    <Mutation mutation={BOOKING}>
                      {createOneContactbref => {
                        return (
                          <Button
                            className="btn-next"
                            outline
                            color="success"
                            onClick={() =>
                              this.submitForm(
                                createOneContactbref,
                                updateOneBooking
                              )
                            }
                          >
                            Confirm
                          </Button>
                        );
                      }}
                    </Mutation>
                  );
                }}
              </Mutation>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
