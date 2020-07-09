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
    <div className="jumbotron" style={display}>
      <h1 className="display-4">Game Settings</h1>
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
              <div>
                Number of slots: {props.slotNum}
                <br></br>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={props.slotNum}
                  id="slots"
                  onChange={props.slotNumChangeHandler}
                ></input>
              </div>
              <div>
                Target Number: {props.targetNum}
                <br></br>
                <input
                  type="number"
                  onChange={props.targetNumChangeHandler}
                  value={props.targetNum}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
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
            <div className="card-body">
              <span>Available Operators: </span>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    id="checkMultiply"
                    value={TIMES}
                    onChange={props.onAvailableOperatorCheckbox}
                    defaultChecked={props.availableOperator.includes(TIMES)}
                  />
                  <label htmlFor="checkMultiply">
                    <img src="multiplySign.png" />
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkDivide"
                    value={DIVIDES}
                    onChange={props.onAvailableOperatorCheckbox}
                    defaultChecked={props.availableOperator.includes(DIVIDES)}
                  />
                  <label htmlFor="checkDivide">
                    <img src="divideSign.png" />
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkAdd"
                    value={PLUS}
                    onChange={props.onAvailableOperatorCheckbox}
                    defaultChecked={props.availableOperator.includes(PLUS)}
                  />
                  <label htmlFor="checkAdd">
                    <img src="addSign.png" />
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="checkSubtract"
                    value={MINUS}
                    onChange={props.onAvailableOperatorCheckbox}
                    defaultChecked={props.availableOperator.includes(MINUS)}
                  />
                  <label htmlFor="checkSubtract">
                    <img src="subtractSign.png" />
                  </label>
                </li>
              </ul>

              {/*Radio button determines one or more answers to be shown */}
              <p>Answer Shown</p>
              <div className="container my-container">
                <div className="row my-row">
                  <div className="col my-col">
                    <form>
                      <div className="form-check">
                        <label>
                          <input
                            type="radio"
                            name="oneOrAllAnswers"
                            value="one"
                            onChange={props.onOneOrAllAnswerRadioButton}
                            defaultChecked={props.oneOrAllAnswerShown === "one"}
                            className="form-check-input"
                          />
                          One
                        </label>
                      </div>

                      <div className="form-check">
                        <label>
                          <input
                            type="radio"
                            name="oneOrAllAnswers"
                            value="all"
                            onChange={props.onOneOrAllAnswerRadioButton}
                            defaultChecked={props.oneOrAllAnswerShown === "all"}
                            className="form-check-input"
                          />
                          All
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                Range of Available Number
                <div className="row my-row justify-content-center">
                  <div className="col-4 my-col">
                    Lower Bound
                    <input
                      className="small-input-size"
                      type="number"
                      onChange={props.onRangeOfAvailableNumberLowBoundInput}
                      value={props.rangeOfAvailableNumberLowBound}
                    ></input>
                  </div>
                  <div className="col-4 my-col">
                    Upper Bound
                    <input
                      className="small-input-size"
                      type="number"
                      onChange={props.onRangeOfAvailableNumberHighBoundInput}
                      value={props.rangeOfAvailableNumberHighBound}
                    ></input>
                  </div>
                </div>
                <div className="row my-row">
                  <div className="col my-col">
                    Maximum Number of Repeated Number
                    <input
                      className="small-input-size ml-2"
                      type="number"
                      onChange={props.onMaxRepeatNumInput}
                      value={props.maxRepeatNum}
                    ></input>
                  </div>
                </div>
                <div className="row my-row">
                  <div className="col my-col">
                    Time (ms) Between Each Round
                    <input
                      className="ml-2"
                      type="number"
                      onChange={props.onTimeBetweenRoundInput}
                      value={props.timeBetweenRound}
                    ></input>
                  </div>
                </div>
                <div className="row my-row">
                  <div className="col my-col">
                    <span>Number of Rounds: {props.numOfRound} </span>
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
          </div>
        </div>
      </div>
      <a
        className="btn btn-primary btn-lg mt-2"
        href="#"
        role="button"
        onClick={props.menuCloseHandler}
      >
        Apply
      </a>
    </div>
  );
};

export default MenuSetting;
