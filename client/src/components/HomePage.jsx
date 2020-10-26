import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { TwitterShareButton, TwitterIcon, WeiboShareButton, FacebookShareButton, FacebookIcon } from "react-share";
import HomePageButton from './common/HomePageButton';
import $ from "jquery";
import './HomePage.css'

function HomePage(props) {
  //const elem = "<FacebookShareButton url='https://github.com/du201/24-points-game' quote='This is such a great game!' hashtag='#24points'><FacebookIcon size={32} round={true} /></FacebookShareButton>";

  const { t, i18n } = useTranslation();
  useEffect(() => {
    let storedLang = localStorage.getItem('lang');
    if (storedLang) {
      i18n.changeLanguage(storedLang);
      props.langChange(storedLang);
    }
  }, []);
  // i18n.changeLanguage(props.lang);
  const changeLang = () => {
    if (props.lang === 'en') {
      i18n.changeLanguage('zh');
      props.langChange('zh');
      localStorage.setItem('lang', 'zh');
    } else if (props.lang === 'zh') {
      i18n.changeLanguage('en');
      props.langChange('en');
      localStorage.setItem('lang', 'en');
    }
  };



  return (
    <div className="container-fluid h-100">
      <div className="row" style={{ height: "10%" }}>
        <div className="my-auto">
          {/* <a id="change-lang"
            onClick={() => changeLang()}
          >
            <FontAwesomeIcon icon={faLanguage} size='3x' />
          </a> */}
        </div>
      </div>

      <div className="row" style={{ height: "80%" }}>
        <div className="col align-self-start text-center">
          <div className="title-homepage fnt-bold">
            24
          </div>
          <div className="d-inline-flex flex-column">
            <div className="btn-homepage fnt-bold">
              <HomePageButton
                onClick={props.pressSolveModeButton}
                display={t("Solver")}
              />
            </div>
            <div className="btn-homepage fnt-bold">
              <HomePageButton
                onClick={props.pressSinglePlayModeButton}
                display={t("Singleplayer")}
              />
            </div>
            <div className="btn-homepage fnt-bold">
              <HomePageButton
                onClick={props.pressGameModeButton}
                display={t("Multiplayer")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ height: "10%" }}>
        <div className="col text-center my-auto">
          <div className="d-inline-flex flex-direction">
            <a href="https://en.wikipedia.org/wiki/24_Game" target="_blank" className="grey-text no-underline mx-4 link-homepage fnt-bold">{t("ABOUT")}</a>
            <FacebookShareButton url='https://github.com/du201/24-points-game' quote='This is such a great game!' hashtag='#24points'><span className="grey-text no-underline mx-4 link-homepage fnt-bold">{t("SHARE")}</span></FacebookShareButton>
            {/* <a href="#" className="grey-text no-underline mx-4 link-homepage fnt-bold" data-toggle="popover" title="User Info">{t("SHARE")}</a> */}
            <a href="https://github.com/du201/24-points-game" target="_blank" className="grey-text no-underline mx-4 link-homepage fnt-bold">{t("SOURCE")}</a>
            <a href="https://docs.google.com/forms/d/1vYDJRUM6xLBfvnsbjfksZvX-IoMUqDuAxNrbHu7diQI/edit?usp=sharing" className="grey-text no-underline mx-4 link-homepage fnt-bold">{t("FEEDBACK")}</a>
          </div>
        </div>
      </div>
    </div>

  );
}

export default HomePage;
