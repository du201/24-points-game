import React from "react";
import "./MenuSetting.css";

const MenuSetting = (props) => {
  let showMenuBooleanStyle = props.showMenuBoolean === false ? "none" : "block";
  console.log(showMenuBooleanStyle);
  let display = { display: showMenuBooleanStyle };
  return (
    <div className="jumbotron" style={display}>
      <h1 className="display-4">Game Setting</h1>
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
                  //name={inputName}
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
              <span>Availabel Operator: </span>
              <ul>
                <li>
                  <input type="checkbox" id="checkMultiply" />
                  <label for="checkMultiply">
                    <img src="multiplySign.png" />
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="checkDivide" />
                  <label for="checkDivide">
                    <img src="divideSign.png" />
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="checkAdd" />
                  <label for="checkAdd">
                    <img src="addSign.png" />
                  </label>
                </li>
                <li>
                  <input type="checkbox" id="checkSubtract" />
                  <label for="checkSubtract">
                    <img src="subtractSign.png" />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/*
      <p className="lead">Basic</p>
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
          //name={inputName}
        ></input>
      </div>
      <p className="lead">Advanced</p>
      <hr className="my-4" />
      */}
      <a
        className="btn btn-primary btn-lg mt-2"
        href="#"
        role="button"
        onClick={props.menuCloseHandler}
      >
        Finish
      </a>
    </div>
  );
};

export default MenuSetting;
