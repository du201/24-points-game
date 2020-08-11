import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

import HomePageButton from './common/HomePageButton';

function HomePage(props) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(props.lang);
  }, []);
  // i18n.changeLanguage(props.lang);
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
        <div className="my-auto">
          <a id="change-lang"
            onClick={() => changeLang()}
          >
            <FontAwesomeIcon icon={faLanguage} size='3x' />
          </a>
        </div>
      </div>

      <div className="row" style={{ height: "75%" }}>
        <div className="col align-self-start text-center">
          <div className="title-homepage">
            24
          </div>
          <div className="d-inline-flex flex-column">
            <HomePageButton
              onClick={props.pressSolveModeButton}
              display={t("Solver")}
            />
            <HomePageButton
              onClick={props.pressSinglePlayModeButton}
              display={t("Singleplayer")}
            />
            <HomePageButton
              onClick={props.pressGameModeButton}
              display={t("Multiplayer")}
            />
          </div>
        </div>
      </div>

      <div className="row" style={{ height: "10%" }}>
        <div className="col text-center my-auto">
          <div className="d-inline-flex flex-row">
            <a href="#" className="grey-text no-underline mx-4 home-page-link">{t("ABOUT")}</a>
            <a href="#" className="grey-text no-underline mx-4 home-page-link">{t("SHARE")}</a>
            <a href="#" className="grey-text no-underline mx-4 home-page-link">{t("SOURCE")}</a>
            <a href="#" className="grey-text no-underline mx-4 home-page-link">{t("BUG REPORT")}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
