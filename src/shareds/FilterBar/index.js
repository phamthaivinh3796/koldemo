import React, { PureComponent } from "react";
import Select from "react-select";
import Styles from "./index.style";
import CheckboxGroup from "react-checkbox-group";
import onClickOutside from "react-onclickoutside";

const allAgeRange = [
  {
    value: "none",
    label: "None",
    isFixed: true
  },
  {
    value: "18-24",
    label: "18-24",
    isFixed: true
  },
  {
    value: "25-34",
    label: "25-34",
    isFixed: true
  },
  {
    value: "35-45",
    label: "35-45",
    isFixed: true
  },
  {
    value: "45-54",
    label: "45-54",
    isFixed: true
  },
  {
    value: "55-64",
    label: "55-64",
    isFixed: true
  },
  {
    value: "65+",
    label: "65+",
    isFixed: true
  }
];

const allGender = [
  {
    value: "none",
    label: "None",
    isFixed: true
  },
  {
    value: "male",
    label: "Male",
    isFixed: true
  },
  {
    value: "female",
    label: "Female",
    isFixed: true
  },
  {
    value: "others",
    label: "Others",
    isFixed: true
  }
];

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: styles => {
    return {
      ...styles,
      backgroundColor: "#FFFFFF",
      color: "black",
      ":active": {
        backgroundColor: "#FFFFFF",
        color: "black"
      },
      ":hover": {
        backgroundColor: "#CCCCCC",
        color: "black"
      }
    };
  }
};

class FilterBar extends PureComponent {
  handleClickOutside = evt => {
    this.props.closeSideBar();
  };
  render() {
    let checkAllChanel = false;
    let checkAllGender = false;
    if (this.props.filterOb.chanel.length === 4) {
      checkAllChanel = true;
    }
    if (this.props.filterOb.gender.length === 3) {
      checkAllGender = true;
    }

    const { locations, occupations, categories, audiencesize } = this.props;

    const valueOccupation = occupations.map(item => {
      return {
        value: item.name,
        label: item.name,
        style: { color: "red" },
        isFixed: true
      };
    });
    const valueLocationProfile = locations.map(item => {
      return {
        value: item.name,
        label: item.name,
        style: { color: "red" },
        isFixed: true
      };
    });
    const valueLocation = [
      { label: "None", value: "none" },
      ...locations.map(item => {
        return {
          value: item.name,
          label: item.name,
          style: { color: "red" },
          isFixed: true
        };
      })
    ];

    const valueCategories = categories.map(item => {
      return {
        value: item.name,
        label: item.name,
        style: { color: "red" },
        isFixed: true
      };
    });
    // const valueAudienceSize = [
    //   { label: "None", value: "none" },
    //   ...audiencesize.map(item => {
    //     return {
    //       value: item.name,
    //       label: item.name,
    //       style: { color: "red" },
    //       isFixed: true
    //     };
    //   })
    // ];
    const valueAudienceSize = [
      { label: "None", value: "none" },
      {
        value: "NANO",
        label: "NANO (1k - 5k followers)",
        isFixed: true,
        id: 1
      },
      {
        value: "MICRO",
        label: "MICRO (5k - 25k followers)",
        isFixed: true,
        id: 2
      },
      {
        value: "SMALL",
        label: "SMALL (25k - 100k followers)",
        isFixed: true,
        id: 3
      },
      {
        value: "MEDIUM",
        label: "MEDIUM (100k - 500k followers)",
        isFixed: true,
        id: 4
      },
      {
        value: "MACRO",
        label: "MACRO (500k - 1m followers)",
        isFixed: true,
        id: 5
      },
      { value: "MEGA", label: "MEGA ( > 1m followers)", isFixed: true, id: 6 }
    ];

    return (
      <Styles openSideBar={this.props.openSideBar}>
        <div className="filter-wapper-block">
          <div className="title-filter">By Profile</div>
          <div className="filter-block">
            <div className="block-name">
              <span>Audience Size</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                name="sizeAudience"
                onChange={data =>
                  this.props._handleChangeSelected("sizeAudience", data || [])
                }
                value={this.props.filterOb.sizeAudience}
                options={valueAudienceSize}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>

          <div className="filter-block">
            <div className="block-name">
              <span>Occupation</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                isMulti
                onChange={data =>
                  this.props._handleChangeSelected("occupations", data || [])
                }
                value={this.props.filterOb.occupations}
                name="occupation"
                options={valueOccupation}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Location</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                isMulti
                name="locations"
                onChange={data =>
                  this.props._handleChangeSelected("locations", data || [])
                }
                value={this.props.filterOb.locations}
                options={valueLocationProfile}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Categories</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                isMulti
                name="categories"
                onChange={data =>
                  this.props._handleChangeSelected("categories", data || [])
                }
                value={this.props.filterOb.categories}
                options={valueCategories}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Channel</span>
            </div>
            <div className="block-body margin">
              <div>
                <input
                  type="checkbox"
                  name="All"
                  onChange={this.props._handleCheckAllChanel}
                  checked={checkAllChanel}
                  style={{ marginBottom: "15px" }}
                />
                <span>&nbsp;&nbsp;All</span>
              </div>
              <CheckboxGroup
                name="chanel"
                value={this.props.filterOb.chanel}
                onChange={value =>
                  this.props._handleChangeCheckboxGroup(value, "chanel")
                }
              >
                {Checkbox => (
                  <>
                    <label style={{ display: "block" }}>
                      <Checkbox value="PROFILE" />
                      &nbsp;&nbsp;Profile
                    </label>
                    <label style={{ display: "block" }}>
                      <Checkbox value="FANPAGE" />
                      &nbsp;&nbsp;Fanpage
                    </label>
                    <label style={{ display: "block" }}>
                      <Checkbox value="YOUTUBE" />
                      &nbsp;&nbsp;Youtube
                    </label>
                    <label style={{ display: "block" }}>
                      <Checkbox value="INSTAGRAM" />
                      &nbsp;&nbsp;Instagram
                    </label>
                  </>
                )}
              </CheckboxGroup>
            </div>
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Gender</span>
            </div>
            <div className="block-body margin">
              <div>
                <input
                  type="checkbox"
                  name="All"
                  onChange={this.props._handleCheckAllGender}
                  checked={checkAllGender}
                  style={{ marginBottom: "15px" }}
                />
                <span>&nbsp;&nbsp;All</span>
              </div>
              <CheckboxGroup
                name="gender"
                value={this.props.filterOb.gender}
                onChange={value =>
                  this.props._handleChangeCheckboxGroup(value, "gender")
                }
              >
                {Checkbox => (
                  <>
                    <label style={{ display: "block" }}>
                      <Checkbox value="male" />
                      &nbsp;&nbsp;Male
                    </label>
                    <label style={{ display: "block" }}>
                      <Checkbox value="female" />
                      &nbsp;&nbsp;Female
                    </label>
                    <label style={{ display: "block" }}>
                      <Checkbox value="others" />
                      &nbsp;&nbsp;Others
                    </label>
                    {/* <label style={{ display: "block" }}>
                    <Checkbox value="others" />&nbsp;&nbsp;Others
                  </label> */}
                  </>
                )}
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <div className="filter-wapper-block">
          <div className="title-filter" style={{ width: "125px" }}>
            By Audience
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Age-range</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                name="ageRange"
                onChange={data =>
                  this.props._handleChangeSelectedAudience(
                    "ageRange",
                    data || []
                  )
                }
                value={this.props.filterOb.ageRange}
                options={allAgeRange}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Gender</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                name="genderAudience"
                onChange={data =>
                  this.props._handleChangeSelectedAudience(
                    "genderAudience",
                    data || []
                  )
                }
                value={this.props.filterOb.genderAudience}
                options={allGender}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>
          <div className="filter-block">
            <div className="block-name">
              <span>Location</span>
            </div>
            <div className="block-body">
              <Select
                defaultValue={[]}
                name="locationsAudience"
                onChange={data =>
                  this.props._handleChangeSelectedAudience(
                    "locationsAudience",
                    data || []
                  )
                }
                value={this.props.filterOb.locationsAudience}
                options={valueLocation}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={colourStyles}
              />
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}
export default onClickOutside(FilterBar);
