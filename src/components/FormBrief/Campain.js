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
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment";

const Campaigns = [
  {
    value: "1",
    label: "Tăng nhận thức/ niềm tin về thương hiệu"
  },
  {
    value: "2",
    label: "Thúc đẩy doanh số"
  },
  {
    value: "3",
    label: "Tăng lượng truy cập website"
  },
  {
    value: "4",
    label: "Tăng lượt cài đặt ứng dụng"
  },
  {
    value: "5",
    label: "Khác"
  }
];

const Channels = [
  {
    value: "1",
    label: "Profile"
  },
  {
    value: "2",
    label: "Fanpage"
  },
  {
    value: "3",
    label: "Instagram"
  },
  {
    value: "4",
    label: "Youtube"
  },
  {
    value: "5",
    label: "Offline"
  }
];

const Formats = [
  {
    value: "1",
    label: "Photo"
  },
  {
    value: "2",
    label: "Video"
  },
  {
    value: "3",
    label: "Livestream"
  },
  {
    value: "4",
    label: "Share Information"
  },
  {
    value: "5",
    label: "Others"
  }
];

export default class Campain extends Component {
  state = {
    campaignName: this.props.formData ? this.props.formData.campaignName : "",
    timelineFrom: this.props.formData
      ? this.props.formData.timelineFrom
      : moment(),
    timelineTo: this.props.formData ? this.props.formData.timelineTo : moment(),
    campaignTargeting: this.props.formData
      ? this.props.formData.campaignTargeting
      : null,
    channels: this.props.formData ? this.props.formData.channels : null,
    contentBy: this.props.formData ? this.props.formData.contentBy : "Brand",
    hashTag: this.props.formData ? this.props.formData.hashTag : "",
    keywords: this.props.formData ? this.props.formData.keywords : "",
    link: this.props.formData ? this.props.formData.link : "",
    format: this.props.formData ? this.props.formData.format : null,
    brief: this.props.formData ? this.props.formData.brief : "",
    error: null
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  handleEvent = (event, picker) => {
    this.setState({
      timelineFrom: picker.startDate,
      timelineTo: picker.endDate
    });
  };

  updateInfo = (name, data) => {
    this.setState({
      [name]: data
    });
  };

  submitForm = () => {
    if (
      this.state.campaignName === "" ||
      this.state.channels === null ||
      this.state.contentBy === "" ||
      this.state.timelineFrom === "" ||
      this.state.timelineTo === "" ||
      this.state.keywords === "" ||
      this.state.format === null
    ) {
      this.setState({
        error: "Please fill al required fields!"
      });
    } else {
      const { error, ...dataSend } = this.state;
      this.props.setActiveStep(3);
      this.props.setFormData("form3", dataSend);
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
              <Label for="exampleEmail" sm={3}>
                Campaign Name *
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  name="campaignName"
                  id="CampaignName"
                  value={this.state.campaignName}
                  className={
                    this.state.campaignName === "" && error ? "error" : ""
                  }
                  placeholder="Campaign Name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Timeline" sm={3}>
                Timeline *
              </Label>
              <Col sm={9}>
                <DateRangePicker
                  onEvent={this.handleEvent}
                  startDate={
                    this.state.timelineFrom !== ""
                      ? moment(this.state.timelineFrom).format("MM/DD/YYYY")
                      : moment().format("MM/DD/YYYY")
                  }
                  endDate={
                    this.state.timelineTo !== ""
                      ? moment(this.state.timelineTo).format("MM/DD/YYYY")
                      : moment().format("MM/DD/YYYY")
                  }
                >
                  <button
                    type="button"
                    className={
                      this.state.timelineFrom === "" && error
                        ? "btn-date error"
                        : "btn-date"
                    }
                  >
                    {`${moment(this.state.timelineFrom).format(
                      "DD/MM/YYYY"
                    )} - ${moment(this.state.timelineTo).format("DD/MM/YYYY")}`}
                  </button>
                </DateRangePicker>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelectMulti" sm={3}>
                Campaign Targeting
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue={
                    this.state.campaignTargeting
                      ? this.state.campaignTargeting
                      : []
                  }
                  isMulti
                  onChange={data => this.updateInfo("campaignTargeting", data)}
                  name="colors"
                  options={Campaigns}
                  classNamePrefix="select"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelectMulti" sm={3}>
                Channel *
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue={this.state.channels ? this.state.channels : []}
                  isMulti
                  name="colors"
                  options={Channels}
                  onChange={data => this.updateInfo("channels", data)}
                  className={
                    this.state.channels === null && error
                      ? "basic-multi-select error"
                      : "basic-multi-select"
                  }
                  classNamePrefix="select"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Format" sm={3}>
                Format *
              </Label>
              <Col sm={9}>
                <Select
                  defaultValue={this.state.format ? this.state.format : []}
                  isMulti
                  onChange={data => this.updateInfo("format", data)}
                  name="colors"
                  options={Formats}
                  className={
                    this.state.format === null && error
                      ? "basic-multi-select error"
                      : "basic-multi-select"
                  }
                  classNamePrefix="select"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleSelect" sm={3}>
                Content Created By *
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="select"
                  name="contentBy"
                  value={this.state.contentBy}
                  className={
                    this.state.contentBy === "" && error ? "error" : ""
                  }
                  id="exampleSelect"
                >
                  <option value="Brand">Brand</option>
                  <option value="Influencer">Influencer</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Hashtag
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="text"
                  name="hashTag"
                  value={this.state.hashTag}
                  id="Hashtag"
                  placeholder="Hashtag"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Keywords" sm={3}>
                Keywords *
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="text"
                  name="keywords"
                  value={this.state.keywords}
                  className={this.state.keywords === "" && error ? "error" : ""}
                  id="Keywords"
                  placeholder="Keywords"
                />
              </Col>
            </FormGroup>
            {/* <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Internal/External Link
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="text"
                  name="link"
                  id="Link"
                  value={this.state.link}
                  placeholder="Internal/External Link"
                />
              </Col>
            </FormGroup>
             */}
            <FormGroup row>
              <Label for="exampleText" sm={3}>
                Other Notes
              </Label>
              <Col sm={9}>
                <Input
                  onChange={e => this.updateInfo(e.target.name, e.target.value)}
                  type="textarea"
                  name="brief"
                  value={this.state.brief}
                  id="Content"
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
