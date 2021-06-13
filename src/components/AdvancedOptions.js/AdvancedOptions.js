import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
const AdvancedOptions = ({
  advancedOptions,
  setAdvancedOptions,
  length,
  setLength,
}) => {
  const handleOnRangeChangeMax = (e, option) => {
    const temp = { ...advancedOptions };
    temp[option].max = Number(e.target.value);
    setAdvancedOptions(temp);
  };
  const handleOnRangeChangeMin = (e, option) => {
    const temp = { ...advancedOptions };
    temp[option].min = Number(e.target.value);
    setAdvancedOptions(temp);
  };
  const handleCheck = (option) => {
    const temp = { ...advancedOptions };
    temp[option].isChecked = !temp[option].isChecked;
    setAdvancedOptions(temp);
  };
  const handleLengthClick = (e) => {
    setLength(e.currentTarget.textContent);
  };
  return (
    <Form className="white-div-wrap text-center mt-2">
      <Dropdown className="mt-2">
        <p className="option-label m-0">Number of tracks: </p>
        <Dropdown.Toggle
          variant="custom"
          id="dropdown-basic"
          className="option-length"
        >
          {length}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            5
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            10
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            25
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            50
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            75
          </Dropdown.Item>
          <Dropdown.Item className="option-length" onClick={handleLengthClick}>
            100
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="row mt-1 py-3">
        {Object.keys(advancedOptions).map((option, i) => (
          <Form.Group
            key={i}
            controlId={i}
            className="col-lg-6 col-md-6 col-sm-12 row justify-content-center align-items-center one-advanced-option mx-0 mb-3"
          >
            <div className="col-12 d-flex justify-content-between align-items-center mb-1">
              <div className="option-checkbox d-flex">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    onChange={() => handleCheck(option)}
                    checked={advancedOptions[option].isChecked}
                  />
                  <span className="checkmark"></span>
                </label>

                <div className="w-100"></div>
              </div>

              <Form.Label className="text-capitalize p-0 option-label mb-0">
                {option}
              </Form.Label>
              <div className="w-100"></div>
            </div>
            <div className="col-12 row justify-content-center align-items-center">
              <div className="d-flex p-0 col-12">
                <Form.Label className="option-label mb-0 value-label text-left">
                  Max
                </Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={advancedOptions[option].max}
                  onChange={(e) => handleOnRangeChangeMax(e, option)}
                />
                <Form.Label className="option-label mb-0 value-label text-right">
                  {advancedOptions[option].max}
                </Form.Label>
              </div>
              <div className="d-flex p-0 col-12">
                <Form.Label className="option-label mb-0 value-label text-left">
                  Min
                </Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={advancedOptions[option].min}
                  onChange={(e) => handleOnRangeChangeMin(e, option)}
                />
                <Form.Label className="option-label mb-0 value-label text-right">
                  {advancedOptions[option].min}
                </Form.Label>
              </div>
            </div>
          </Form.Group>
        ))}
      </div>
    </Form>
  );
};

export default AdvancedOptions;
