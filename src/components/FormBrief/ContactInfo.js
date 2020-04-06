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

export default class ContactInfo extends Component {
  state = {
    company: this.props.formData ? this.props.formData.company : "",
    name: this.props.formData ? this.props.formData.name : "",
    jobTitle: this.props.formData ? this.props.formData.jobTitle : "",
    email: this.props.formData ? this.props.formData.email : "",
    phone: this.props.formData ? this.props.formData.phone : "",
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

  submitForm = () => {
    if (
      this.state.company === "" ||
      this.state.name === "" ||
      this.state.jobTitle === "" ||
      this.state.phone === ""
    ) {
      this.setState({
        error: "Please fill al required fields!"
      });
    } else {
      const { error, ...dataSend } = this.state;
      this.props.setActiveStep(1);
      this.props.setFormData("form1", dataSend);
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
              <Label for="company" sm={3}>
                Your Company *
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="text"
                  name="company"
                  id="company"
                  value={this.state.company}
                  className={this.state.company === "" && error ? "error" : ""}
                  placeholder="Your Company"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={3}>
                Your Name *
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  className={this.state.name === "" && error ? "error" : ""}
                  placeholder="Your Name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="jobTitle" sm={3}>
                Job Title *
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  name="jobTitle"
                  id="jobTitle"
                  value={this.state.jobTitle}
                  className={this.state.jobTitle === "" && error ? "error" : ""}
                >
                  <option value="">None</option>
                  <option value="Team Leader">Team Leader</option>
                  <option value="Manager">Manager</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Executive">Executive</option>
                  <option value="Coordinator">Coordinator</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Others">Others</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Email
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  value={this.state.email}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Phone" sm={3}>
                Phone *
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="number"
                  name="phone"
                  id="Phone"
                  value={this.state.phone}
                  placeholder="Phone"
                  className={this.state.email === "" && error ? "error" : ""}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Button
                onClick={() => this.submitForm()}
                className="btn-next"
                outline
                color="primary"
              >
                Next
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
