import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class BrandInfo extends Component {
  state = {
    productName: this.props.formData ? this.props.formData.productName : "",
    branchName: this.props.formData ? this.props.formData.branchName : "",
    categories: this.props.formData ? this.props.formData.categories : "",
    describeTheProduct: this.props.formData
      ? this.props.formData.describeTheProduct
      : "",
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
    if (this.state.branchName === "" || this.state.categories === "") {
      this.setState({
        error: "Please fill al required fields!"
      });
    } else {
      const { error, ...dataSend } = this.state;
      this.props.setActiveStep(2);
      this.props.setFormData("form2", dataSend);
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
              <Label for="Brandname" sm={3}>
                Brandname *
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="branchName"
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  id="Brandname"
                  placeholder="Brandname"
                  value={this.state.branchName}
                  className={
                    this.state.branchName === "" && error ? "error" : ""
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Category" sm={3}>
                Category *
              </Label>
              <Col sm={9}>
                <Input
                  className={
                    this.state.categories === "" && error ? "error" : ""
                  }
                  value={this.state.categories}
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="select"
                  name="categories"
                  id="Category"
                >
                  <option value="">None</option>
                  {this.props.categories.map(item => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                  <option value="Others">Others</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Product Name
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="productName"
                  value={this.state.productName}
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  id="ProductName"
                  placeholder="Product Name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Describetheproduct" sm={3}>
                Describe the product
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  name="describeTheProduct"
                  value={this.state.describeTheProduct}
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  id="describeTheProduct"
                  placeholder="Usefulness/Benefits/Advantages/Uniqueness.."
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
