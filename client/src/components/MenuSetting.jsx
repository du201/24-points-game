import React from "react";

import "./MenuSetting.css";
import Slider from "./common/Slider";
import OperatorSettingButton from "./common/OperatorSettingButton";
const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";

const MenuSetting = (props) => {
  let showMenuBooleanStyle = props.showMenuBoolean === false ? "none" : "block";
  let display = { display: showMenuBooleanStyle };
  return (
    <div className="jumbotron setting-menu" style={display}>
      <h1 className="display-4">Game Settings</h1>
      {/*Basic part of the setting menu */}
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Basic
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <form>
                <div className="form-group row align-items-center">
                  <Slider
                    min="2"
                    max="6"
                    value={props.slotNum}
                    id="slots"
                    onChange={props.handleSlotNumChange}
                    labelText="Number of slots"
                    labelData={props.slotNum}
                  />
                </div>
                <div className="form-group row align-items-center">
                  <Slider
                    min="12"
                    max="36"
                    value={props.targetNum}
                    id="targetNum"
                    onChange={props.handleTargetNumChange}
                    labelText="Target Number"
                    labelData={props.targetNum}
                  />
                </div>
              </form>
            </div>
          </div>
        </div >
        {/*Advanced part of the setting menu */}
        < div className="card" >
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Advanced
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            {/*Checkbox for available operators */}
            <div className="card-body">
              <ul className="lead">
                <span className="operator-title-shift col-form-label-sm">Available Operators: </span>
                <li>
                  <OperatorSettingButton
                    id="checkMultiply"
                    value={TIMES}
                    onChange={props.handleAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(TIMES)}
                    img={{ src: "multiplySign.png", alt: "multiply" }}
                  />
                </li>
                <li>
                  <OperatorSettingButton
                    id="checkDivide"
                    value={DIVIDES}
                    onChange={props.handleAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(DIVIDES)}
                    img={{ src: "divideSign.png", alt: "divide" }}
                  />
                </li>
                <li>
                  <OperatorSettingButton
                    id="checkAdd"
                    value={PLUS}
                    onChange={props.handleAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(PLUS)}
                    img={{ src: "addSign.png", alt: "add" }}
                  />
                </li>
                <li>
                  <OperatorSettingButton
                    id="checkSubtract"
                    value={MINUS}
                    onChange={props.handleAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(MINUS)}
                    img={{ src: "subtractSign.png", alt: "subtract" }}
                  />
                </li>
              </ul>

              {/*The container for the advanced setting  */}
              <div className="container my-container lead">
                {/*This row is the range of available number */}
                <div className="row my-row align-items-center">
                  <label className="col-form-label-sm">Range of Available Numbers</label>
                  <div className="col-4 my-col">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      id="lower-bound"
                      onChange={props.handleRangeOfAvailableNumberLowBoundInput}
                      value={props.rangeOfAvailableNumberLowBound}
                      placeholder="Lower Bound"
                    ></input>
                  </div>
                  <div className="col-4 my-col">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      id="higher-bound"
                      onChange={props.handleRangeOfAvailableNumberHighBoundInput}
                      value={props.rangeOfAvailableNumberHighBound}
                      placeholder="Upper Bound"
                    ></input>
                  </div>
                </div>
                <div className="row my-row mb-2">
                  <form className="form-inline">
                    <div className="form-group">
                      <label htmlFor="maxRepeatNum" className="col-form-label col-form-label-sm">Maximum Number of Repeated Number: {props.maxRepeatNum} </label>
                      <input
                        id="maxRepeatNum"
                        type="range"
                        min="1"
                        max="4"
                        onChange={props.handleMaxRepeatNumInput}
                        value={props.maxRepeatNum}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="row my-row mb-2">
                  <form className="form-inline">
                    <div className="form-group">
                      <label htmlFor="roundDuration" className="col-form-label col-form-label-sm">Each Round's Duration (s): {props.roundDuration} </label>
                      <input
                        id="roundDuration"
                        type="range"
                        min="20"
                        max="120"
                        onChange={props.handleRoundDurationInput}
                        value={props.roundDuration}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="row my-row">
                  <span className="col-form-label col-form-label-sm mr-2">Number of Rounds: {props.numOfRound} </span>
                  <input
                    type="range"
                    min="10"
                    max="20"
                    value={props.numOfRound}
                    onChange={props.handleNumOfRoundInput}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
      <button
        className="btn btn-primary btn-lg mt-2"
        onClick={props.pressMenuCloseButton}
      >
        Apply
      </button>
      <button
        className="btn btn-info btn-lg mt-2 ml-2"
        onClick={props.backToDefaultSettings}
      >
        Back to Default Settings
      </button>
    </div >
  );
};

export default MenuSetting;
