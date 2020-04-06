import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";

const genders = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  },
  {
    label: "Others",
    value: "others"
  }
];

const ageRange = [
  {
    label: "18-24",
    value: "18-24"
  },
  {
    label: "25-34",
    value: "25-34"
  },
  {
    label: "35-44",
    value: "35-44"
  },
  {
    label: "45-54",
    value: "45-54"
  },
  {
    label: "55-64",
    value: "55-64"
  },
  {
    label: "65+",
    value: "65+"
  }
];

export default class TargetAudience extends Component {
  state = {
    genders: this.props.formData ? this.props.formData.genders : null,
    ageRange: this.props.formData ? this.props.formData.ageRange : null,
    locations: this.props.formData ? this.props.formData.locations : null,
    otherTarget: this.props.formData ? this.props.formData.otherTarget : ""
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
    const { error, ...dataSend } = this.state;
    this.props.setActiveStep(4);
    this.props.setFormData("form4", dataSend);
  };

  render() {
    const locations = this.props.locations.map(item => {
      return {
        label: item.name,
        value: item.id
      };
    });

    return (
      <div>
        <div className="body-form">
          <Form>
            <FormGroup row>
              <Label for="exampleSelectMulti" sm={3}>
                Gender
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue={this.state.genders ? this.state.genders : []}
                  isMulti
                  name="colors"
                  options={genders}
                  onChange={data => this.updateInfo("genders", data)}
                  classNamePrefix="select"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelectMulti" sm={3}>
                Age-Range
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue={this.state.ageRange ? this.state.ageRange : []}
                  isMulti
                  name="colors"
                  options={ageRange}
                  onChange={data => this.updateInfo("ageRange", data)}
                  classNamePrefix="select"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelectMulti" sm={3}>
                Location
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue={
                    this.state.locations ? this.state.locations : []
                  }
                  isMulti
                  name="colors"
                  options={locations}
                  onChange={data => this.updateInfo("locations", data)}
                  classNamePrefix="select"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={3}>
                Others Targeting
              </Label>
              <Col sm={9}>
                <Input
                  placeholder="Other Target"
                  type="textarea"
                  name="otherTarget"
                  value={this.state.otherTarget}
                  id="exampleText"
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
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
