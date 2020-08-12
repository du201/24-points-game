import React from "react";
import BackButton from "./common/BackButton";
import NameInputUI from "./common/NameInputUI";
import { useTranslation } from 'react-i18next';
import Button from './common/Button';
import './SelectPage.css';

const SelectPage = (props) => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row" style={{ height: "10%" }}>
        <div className="col my-auto">
          <BackButton
            handleBack={props.handleBack}
            prevPage="homePage"
          ></BackButton>
        </div>
      </div>
      <div className="row" style={{ height: "90%" }}>
        <div className="col align-self-start text-center">
          <div className="col text-center my-auto" id="title-selectpage">
            <h1 className="fnt-bold">
              {t('Create or join a room')}
            </h1>
          </div>

          <div className="col text-center my-auto">
            <h3 id="text-selectpage" className="fnt-medium">
              Please enter a nickname
            </h3>

            <div id="input-selectpage">
              <NameInputUI
                onChange={props.setStateName}
                placeHolder="No more than 15 characters"
              />
            </div>

            <div id="btn-selectpage-left" className="force-inline fnt-medium">
              <Button
                onClick={props.pressCreateRoomButton}
                display={"Create"}
                style={0}
              />
            </div>

            <div id="btn-selectpage-right" className="force-inline fnt-medium">
              <Button
                onClick={props.pressJoinRoomButton}
                display={"Join"}
                style={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectPage;
