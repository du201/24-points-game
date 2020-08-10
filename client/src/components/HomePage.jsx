import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

function HomePage(props) {
  const { t, i18n } = useTranslation();
  const changeLang = () => {
    if (props.lang === 'en') {
      i18n.changeLanguage('chi');
      props.langChange('chi');
    } else if (props.lang === 'chi') {
      i18n.changeLanguage('en');
      props.langChange('en');
    }
  };

  return (
    <div className="container h-100">
      <div className="row" style={{ height: "15%" }}>
        <div className="col my-auto">
          <button
            className="btn grey-text btn-outline-light"
            onClick={() => changeLang()}
          >
            <FontAwesomeIcon icon={faLanguage} size='3x' />
          </button>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1 className="title-homepage">24</h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col align-self-start text-center">
          <div className="d-inline-flex flex-column">
            <button
              className="btn-outline grey-text btn mb-2"
              onClick={props.pressSolveModeButton}
            >
              {t("Solve Mode")}
            </button>
            <button
              className="btn-outline grey-text btn mb-2"
              onClick={props.pressGameModeButton}
            >
              {t("Multiplayer")}
            </button>
            <button
              className="btn-outline grey-text btn mb-2"
              onClick={props.pressSinglePlayModeButton}
            >
              {t("Singleplayer")}
            </button>
          </div>
        </div>
      </div>
      <div className="row h-25"></div>
      <div className="row" style={{ height: "10%" }}>
        <div className="col text-center my-auto">
          <div className="d-inline-flex flex-row">
            <a href="#" className="grey-text no-underline mx-3">{t("ABOUT")}</a>
            <a href="#" className="grey-text no-underline mx-3">{t("SHARE")}</a>
            <a href="#" className="grey-text no-underline mx-3">{t("SOURCE")}</a>
            <a href="#" className="grey-text no-underline mx-3">{t("BUG REPORT")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;