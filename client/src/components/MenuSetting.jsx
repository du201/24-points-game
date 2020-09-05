import React, { useState } from "react";

import "./MenuSetting.css";
import Slider from "./common/Slider";
import OperatorSettingButton from "./common/OperatorSettingButton";
import RangeNumberInput from "./common/RangeNumberInput";
import MenuExpand from "./common/MenuExpand";
import SettingWrapper from "./common/SettingWrapper";
import Button from "./common/Button";
const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";

const MenuSetting = (props) => {
  // let showMenuBooleanStyle = props.showMenuBoolean === false ? "none" : "block";
  // let display = { display: showMenuBooleanStyle };
  const [menuExpanded, setMenuExpanded] = useState(false);
  const adjustMenu = () => {
    if (menuExpanded === false) {
      setMenuExpanded(true);
    } else {
      setMenuExpanded(false);
    }
  };
  return (
    <React.Fragment>
      {/*Basic part of the setting menu */}
      <div style={{ marginTop: "5rem" }}>
        <SettingWrapper>
          <Slider
            min="12"
            max="36"
            value={props.targetNum}
            id="targetNum"
            onChange={props.handleTargetNumChange}
            labelText="Target Number"
            labelData={props.targetNum}
          />
        </SettingWrapper>
      </div>
      <SettingWrapper>
        <Slider
          min="2"
          max="6"
          value={props.slotNum}
          id="slots"
          onChange={props.handleSlotNumChange}
          labelText="Number of slots"
          labelData={props.slotNum}
        />
      </SettingWrapper>
      {/*Advanced part of the setting menu */}

      <div
        id="collapseAdvanced"
        className="collapse"
      >
        {/*Checkbox for available operators */}
        <SettingWrapper>
          <span className="fnt-bold grey-text">Available operators<br /></span>

          <OperatorSettingButton
            id="checkAdd"
            value={PLUS}
            onChange={props.handleAvailableOperatorCheckbox}
            checked={props.availableOperator.includes(PLUS)}
            img={{ src: "addSign.png", alt: "add" }}
          />

          <OperatorSettingButton
            id="checkSubtract"
            value={MINUS}
            onChange={props.handleAvailableOperatorCheckbox}
            checked={props.availableOperator.includes(MINUS)}
            img={{ src: "subtractSign.png", alt: "subtract" }}
          />

          <OperatorSettingButton
            id="checkMultiply"
            value={TIMES}
            onChange={props.handleAvailableOperatorCheckbox}
            checked={props.availableOperator.includes(TIMES)}
            img={{ src: "multiplySign.png", alt: "multiply" }}
          />

          <OperatorSettingButton
            id="checkDivide"
            value={DIVIDES}
            onChange={props.handleAvailableOperatorCheckbox}
            checked={props.availableOperator.includes(DIVIDES)}
            img={{ src: "divideSign.png", alt: "divide" }}
          />

        </SettingWrapper>
        {/*This row is the range of available number */}
        <SettingWrapper>
          <p className="fnt-bold grey-text">Range of available numbers</p>
          <RangeNumberInput
            id="lower-bound"
            onChange={props.handleRangeOfAvailableNumberLowBoundInput}
            value={props.rangeOfAvailableNumberLowBound}
            placeholder="Lower Bound"
          />
          <span className="d-inline-block text-center" style={{ width: "16%" }}>
            to
            </span>
          <RangeNumberInput
            id="higher-bound"
            onChange={props.handleRangeOfAvailableNumberHighBoundInput}
            value={props.rangeOfAvailableNumberHighBound}
            placeholder="Upper Bound"
          />
        </SettingWrapper>
        {/*Maximum number of repeats */}
        <SettingWrapper>
          <Slider
            min="1"
            max="4"
            value={props.maxRepeatNum}
            id="maxRepeatNum"
            onChange={props.handleMaxRepeatNumInput}
            labelText="Maximum number of repeats"
            labelData={props.maxRepeatNum}
          />
        </SettingWrapper>
        {/*Round breaks */}
        <SettingWrapper>

          <Slider
            min="20"
            max="120"
            value={props.roundDuration}
            id="roundDuration"
            onChange={props.handleRoundDurationInput}
            labelText="Round duration"
            labelData={props.roundDuration + " seconds"}
          />

        </SettingWrapper>
        {/*Number of rounds */}
        <SettingWrapper>
          <Slider
            min="10"
            max="20"
            value={props.numOfRound}
            id="roundNum"
            onChange={props.handleNumOfRoundInput}
            labelText="Number of rounds"
            labelData={props.numOfRound}
          />
        </SettingWrapper>
      </div>
      <SettingWrapper>
        <MenuExpand
          onClick={adjustMenu}
          text={menuExpanded === true ? "Hide" : "Advanced"}
        />
      </SettingWrapper>
      {/* <button
         className="btn btn-primary btn-lg mt-2"
         onClick={props.pressMenuCloseButton}
   >
         <img style={{ width: "100px" }} src="multiplySign.png"></img>
       </button> */}
      <div id="default-button" className="row justify-content-center" style={{ marginBottom: "2rem" }}>
        {/* <div id="default-button"> */}
        <Button
          onClick={props.backToDefaultSettings}
          display="Default"
          style={1}
        />
      </div>

    </React.Fragment>
  );
};

export default MenuSetting;