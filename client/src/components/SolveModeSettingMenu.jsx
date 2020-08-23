import React from 'react';
import "./MenuSetting.css";
import Slider from "./common/Slider";
import OperatorSettingButton from "./common/OperatorSettingButton";
import SettingWrapper from "./common/SettingWrapper";
import Button from "./common/Button";
import ToggleSwitch from './common/ToggleSwitch';

const TIMES = "×";
const DIVIDES = "÷";
const PLUS = "+";
const MINUS = "-";
const SolveModeSettingMenu = ({ slotNum,
  targetNum,
  availableOperator,
  showAllAnswers,
  handleTargetNumChange,
  handleSlotNumChange,
  handleAvailableOperatorCheckbox,
  handleShowAllAnswers,
  backToDefaultSettings }) => {
  return (
    <React.Fragment>
      <div style={{ marginTop: "5rem" }}>
        <SettingWrapper>
          <Slider
            min="12"
            max="36"
            value={targetNum}
            id="targetNum"
            onChange={handleTargetNumChange}
            labelText="Target Number"
            labelData={targetNum}
          />
        </SettingWrapper>
      </div>
      <SettingWrapper>
        <Slider
          min="2"
          max="6"
          value={slotNum}
          id="slots"
          onChange={handleSlotNumChange}
          labelText="Number of slots"
          labelData={slotNum}
        />
      </SettingWrapper>


      {/*Checkbox for available operators */}
      <SettingWrapper>
        <span className="fnt-bold grey-text">Available operators<br /></span>

        <OperatorSettingButton
          id="checkAdd"
          value={PLUS}
          onChange={handleAvailableOperatorCheckbox}
          checked={availableOperator.includes(PLUS)}
          img={{ src: "addSign.png", alt: "add" }}
        />

        <OperatorSettingButton
          id="checkSubtract"
          value={MINUS}
          onChange={handleAvailableOperatorCheckbox}
          checked={availableOperator.includes(MINUS)}
          img={{ src: "subtractSign.png", alt: "subtract" }}
        />

        <OperatorSettingButton
          id="checkMultiply"
          value={TIMES}
          onChange={handleAvailableOperatorCheckbox}
          checked={availableOperator.includes(TIMES)}
          img={{ src: "multiplySign.png", alt: "multiply" }}
        />

        <OperatorSettingButton
          id="checkDivide"
          value={DIVIDES}
          onChange={handleAvailableOperatorCheckbox}
          checked={availableOperator.includes(DIVIDES)}
          img={{ src: "divideSign.png", alt: "divide" }}
        />

      </SettingWrapper>

      <SettingWrapper>
        <span className="fnt-bold grey-text">Show all answers<br /></span>
        <div style={{ marginTop: "1.4rem" }}></div>
        <ToggleSwitch
          showAllAnswers={showAllAnswers}
          handleShowAllAnswers={handleShowAllAnswers} />
      </SettingWrapper>

      <div id="default-button" className="row justify-content-center" style={{ marginBottom: "2rem" }}>
        {/* <div id="default-button"> */}
        <Button
          onClick={backToDefaultSettings}
          display="Default"
          style={1}
        />
      </div>

    </React.Fragment>
  );
}

export default SolveModeSettingMenu;