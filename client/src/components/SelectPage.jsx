import React from "react";
import BackButton from "./common/BackButton";
import NameInputUI from "./common/NameInputUI";
import { useTranslation } from 'react-i18next';
import Button from './common/Button';

const SelectPage = (props) => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row h-25">
        <div className="col my-auto">
          <BackButton
            handleBack={props.handleBack}
            prevPage="homePage"
          ></BackButton>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1>
            {t('3rd Page (Create Room or Enter Room)')}
          </h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <p>Enter your nickname</p>
          <NameInputUI
            onChange={props.setStateName}
            placeHolder="Char Length <= 15"
          />
          <Button
            onClick={props.pressCreateRoomButton}
            display={"New Room"}
            style={1}
          />
          <Button
            onClick={props.pressJoinRoomButton}
            display={"Join Room"}
            style={0}
          />
        </div>
      </div>
      <div className="row h-25">
      </div>
    </div>
  );
}

export default SelectPage;