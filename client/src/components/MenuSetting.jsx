import React from "react";
import "./MenuSetting.css";
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
                  <label htmlFor="slot" className="col-4 col-form-label col-form-label-sm lead">Number of slots: {props.slotNum}</label>
                  <div className="col-4">
                    <input
                      className="form-control-range"
                      type="range"
                      min="2"
                      max="6"
                      value={props.slotNum}
                      id="slots"
                      onChange={props.slotNumChangeHandler}
                    ></input>
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label htmlFor="targetNum" className="col-4 col-form-label col-form-label-sm lead">Target Number: {props.targetNum}</label>
                  <div className="col-4">
                    <input
                      className="form-control"
                      type="number"
                      id="targetNum"
                      min="12"
                      max="36"
                      onChange={props.targetNumChangeHandler}
                      value={props.targetNum}
                    ></input>
                  </div>
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
                  <input
                    type="checkbox"
                    id="checkMultiply"
                    value={TIMES}
                    className="small-checkbox"
                    onChange={props.onAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(TIMES)}
                  />
                  <label htmlFor="checkMultiply">
                    <img src="multiplySign.png" alt="multiply" />
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkDivide"
                    value={DIVIDES}
                    onChange={props.onAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(DIVIDES)}
                  />
                  <label htmlFor="checkDivide">
                    <img src="divideSign.png" alt="divide" />
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkAdd"
                    value={PLUS}
                    onChange={props.onAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(PLUS)}
                  />
                  <label htmlFor="checkAdd">
                    <img src="addSign.png" alt="add" />
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkSubtract"
                    value={MINUS}
                    onChange={props.onAvailableOperatorCheckbox}
                    checked={props.availableOperator.includes(MINUS)}
                  />
                  <label htmlFor="checkSubtract">
                    <img src="subtractSign.png" alt="subtract" />
                  </label>
                </li>
              </ul>

              {/*The container for the advanced setting  */}
              <div className="container my-container lead">
                {/*This row is the range of available number */}
                <div className="row my-row align-items-center">
                  <label className="col-form-label-sm">Range of Available Number</label>
                  <div className="col-4 my-col">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      id="lower-bound"
                      onChange={props.onRangeOfAvailableNumberLowBoundInput}
                      value={props.rangeOfAvailableNumberLowBound}
                      placeholder="Lower Bound"
                    ></input>
                  </div>
                  <div className="col-4 my-col">
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      id="higher-bound"
                      onChange={props.onRangeOfAvailableNumberHighBoundInput}
                      value={props.rangeOfAvailableNumberHighBound}
                      placeholder="Upper Bound"
                    ></input>
                  </div>
                </div>
                <div className="row my-row mb-2">
                  <form className="form-inline">
                    <div className="form-group">
                      <label htmlFor="maxRepeatNum" className="col-form-label col-form-label-sm">Maximum Number of Repeated Number</label>
                      <input
                        id="maxRepeatNum"
                        className="form-control form-control-sm ml-2"
                        type="number"
                        onChange={props.onMaxRepeatNumInput}
                        value={props.maxRepeatNum}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="row my-row mb-2">
                  <form className="form-inline">
                    <div className="form-group">
                      <label htmlFor="timeBetweenRound" className="col-form-label col-form-label-sm">Time (ms) Between Each Round</label>
                      <input
                        id="timeBetweenRound"
                        className="form-control form-control-sm ml-2"
                        type="number"
                        onChange={props.onTimeBetweenRoundInput}
                        value={props.timeBetweenRound}
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
                    onChange={props.onNumOfRoundInput}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
      <button
        className="btn btn-primary btn-lg mt-2"
        onClick={props.menuCloseHandler}
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
