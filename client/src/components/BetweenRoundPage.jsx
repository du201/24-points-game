import React, { useEffect } from "react";
import SolutionsRank from "./SolutionsRank";
import ScoresRank from "./ScoresRank";
import { useWindowSize } from './common/useWindowSize.js';
import GameSideBar from "./GameSideBar";
import './BetweenRoundPage.css';
import { shortenName } from './common/shortenName.js'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination]);

const BetweenRoundPage = (props) => {
  let screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth > 1200 && props.gameModeScoresMenuOpen === true) {
      props.setGameModeScoresMenuOpenFalse();
    }
  });

  const slides = [];

  if (props.scoreRanking[0] !== undefined) {
    var firstPlayerName = props.scoreRanking[0].name;
    var firstPlayerScore = props.scoreRanking[0].totalScore;
  }
  if (props.scoreRanking[1] !== undefined) {
    var secondPlayerName = props.scoreRanking[1].name;
    var secondPlayerScore = props.scoreRanking[1].totalScore;
  }
  if (props.scoreRanking[2] !== undefined) {
    var thirdPlayerName = props.scoreRanking[2].name;
    var thirdPlayerScore = props.scoreRanking[2].totalScore;
  }



  // let secondPlayerName = props.playerRanking[1].name;
  // let thirdPlayerName = props.playerRanking[2].name;

  // let secondPlayerScore = props.playerRanking[1].totalScore;
  // let thirdPlayerScore = props.playerRanking[2].totalScore;

  slides.push(
    <React.Fragment>
      <div className="solution-box">
        <div className="d-flex flex-column align-items-center h-100">
          <h2 className="fnt-bold" style={{ color: "#FF5F5F", marginBottom: "3rem" }}>Incorrect!</h2>
          <h3 className="fnt-regular">
            Your solution
          </h3>
          <h2 style={{ marginBottom: "1rem" }}>1x2x3x4</h2>
          <h3>Here's our solution</h3>
          <h2>1x2x3x4</h2>

          <hr style={{ width: "100%", marginBottom: "1rem", marginTop: "1rem" }}></hr>
          <h3 className="fnt-regular">
            Top solutions
          </h3>
          {/* <div style={{ marginTop: "1rem" }}></div> */}
          <table className="table-answer" style={{ backgroundColor: "", width: "100%", margin: "auto" }}>
            <tr>
              <td><span className="blue-dot"></span>  {shortenName("不知道叫啥好")}</td>
              <td><h2 style={{ textAlign: "right" }}>1x2x3x4</h2></td>
            </tr>
            <div style={{ marginTop: "0.8rem" }}></div>
            <tr>
              <td><span className="red-dot"></span>  Dave</td>
              <td><h2 style={{ textAlign: "right" }}>1x2x3x4</h2></td>
            </tr>
            <div style={{ marginTop: "0.8rem" }}></div>
            <tr>
              <td><span className="yellow-dot"></span>  Harry</td>
              <td><h2 style={{ textAlign: "right" }}>1x2x3x4</h2></td>
            </tr>
          </table>
          <h6 className="mt-auto">{(props.isLastRound === true ?
            "The summary page will appear in " :
            "Next round will begin in ")}
            6 seconds
          </h6>
        </div>
      </div>
    </React.Fragment >
  );


  slides.push(
    <React.Fragment>
      <div className="ranking-box">
        <div className="d-flex flex-column align-items-center h-100">
          <div style={{ marginTop: "10rem" }}><h3 className="text-center">You currently rank No.1</h3></div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 82.837 115.842">
              <g id="award-fill" transform="translate(0.535 0.563)">
                <path id="Path_10" data-name="Path 10" d="M43.177,0,55.135,6.19,68.447,8.211,74.48,20.248l9.579,9.458L81.867,42.989,84.06,56.273,74.48,65.731,68.447,77.768l-13.312,2.02-11.958,6.19-11.958-6.19-13.312-2.02L11.873,65.731,2.294,56.273,4.486,42.989,2.294,29.706l9.579-9.458L17.906,8.211,31.219,6.19Z" transform="translate(-2.294)" fill="gold" stroke="#707070" stroke-width="1" />
                <path id="Path_11" data-name="Path 11" d="M4,11.794V41.93l28.66-7.165,28.66,7.165V11.794L46.86,13.986l-14.2,7.351-14.2-7.351Z" transform="translate(8.223 72.709)" fill="gold" stroke="#707070" stroke-width="1" />
              </g>
              <text id="_1" data-name="1" transform="translate(25.535 65.563)" fill="#fff" font-size="60" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">1</tspan></text>
            </svg>
            <h2 className="d-inline-block ranking-name">Harry<br />100</h2>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 82.837 116.279">
              <g id="award-fill" transform="translate(0.535 1)">
                <path id="Path_10" data-name="Path 10" d="M43.177,0,55.135,6.19,68.447,8.211,74.48,20.248l9.579,9.458L81.867,42.989,84.06,56.273,74.48,65.731,68.447,77.768l-13.312,2.02-11.958,6.19-11.958-6.19-13.312-2.02L11.873,65.731,2.294,56.273,4.486,42.989,2.294,29.706l9.579-9.458L17.906,8.211,31.219,6.19Z" transform="translate(-2.294)" fill="silver" stroke="#707070" stroke-width="1" />
                <path id="Path_11" data-name="Path 11" d="M4,11.794V41.93l28.66-7.165,28.66,7.165V11.794L46.86,13.986l-14.2,7.351-14.2-7.351Z" transform="translate(8.223 72.709)" fill="silver" stroke="#707070" stroke-width="1" />
              </g>
              <text id="_2" data-name="2" transform="translate(42.535 65)" fill="#fff" font-size="60" font-family="SegoeUI, Segoe UI"><tspan x="-16.172" y="0">2</tspan></text>
            </svg>
            <h2 className="d-inline-block ranking-name">Xin<br />90</h2>
          </div>

          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 82.837 115.842">
              <g id="award-fill" transform="translate(0.535 0.563)">
                <path id="Path_10" data-name="Path 10" d="M43.177,0,55.135,6.19,68.447,8.211,74.48,20.248l9.579,9.458L81.867,42.989,84.06,56.273,74.48,65.731,68.447,77.768l-13.312,2.02-11.958,6.19-11.958-6.19-13.312-2.02L11.873,65.731,2.294,56.273,4.486,42.989,2.294,29.706l9.579-9.458L17.906,8.211,31.219,6.19Z" transform="translate(-2.294)" fill="#cd8032" stroke="#707070" stroke-width="1" />
                <path id="Path_11" data-name="Path 11" d="M4,11.794V41.93l28.66-7.165,28.66,7.165V11.794L46.86,13.986l-14.2,7.351-14.2-7.351Z" transform="translate(8.223 72.709)" fill="#cd8032" stroke="#707070" stroke-width="1" />
              </g>
              <text id="_3" data-name="3" transform="translate(41.535 65.563)" fill="#fff" font-size="60" font-family="SegoeUI, Segoe UI"><tspan x="-16.172" y="0">3</tspan></text>
            </svg>

            <h2 className="d-inline-block ranking-name">Duck<br />80</h2>
          </div>
          <h6 className="mt-auto">{(props.isLastRound === true ?
            "The summary page will appear in " :
            "Next round will begin in ")}
            6 seconds
          </h6>
        </div>
      </div>
    </React.Fragment >
  );

  return (
    <div className="container-fluid h-100">
      <div className={props.gameModeScoresMenuOpen === false ? "row h-100 " : "row h-100 grey-content"}>
        {/* A fixed width column */}
        <GameSideBar
          exitRoomButtonPress={props.exitRoomButtonPress}
          switchScoresMenu={props.switchScoresMenu}
          gameModeScoresMenuOpen={props.gameModeScoresMenuOpen}
          whichRound={props.whichRound}
          numOfRound={props.numOfRound}
          multiplayerTotalScore={props.multiplayerTotalScore}
          playerRoster={props.playerRoster}
          playerSolved={props.playerSolved}
          pageController={props.pageController}
          playerColor={props.playerColor}
        />
        {/* The game board area */}
        <div className={props.gameModeScoresMenuOpen === false ? "col w-100 h-100 col-content" : "display-none"}>
          <div id="rightside-hostpage" className="d-flex flex-column align-items-center h-100 w-100">
            {screenWidth < 1200 ?
              <Swiper className="swiper-container" pagination>{slides.map((slide) => <SwiperSlide>{slide}</SwiperSlide>)}</Swiper> :
              <React.Fragment>
                <div style={{ marginTop: "8rem" }}></div>
                <div className={props.answerCorrect === true ? "solution-box answer-correct-bg-color" : "solution-box answer-incorrect-bg-color"}>
                  <div className="container">
                    <div className="row justify-content-center" style={{ height: "4rem" }}>
                      <div className="col">
                        {props.answerCorrect === true ?
                          <h2 className="fnt-bold text-center" style={{ color: "#76EF8D" }}>Correct!</h2> :
                          <h2 className="fnt-bold text-center" style={{ color: "#FF5F5F" }}>Incorrect!</h2>}
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col">
                        <h3 className="fnt-regular text-center">
                          Your solution<br /><br />
                          <h2>{(props.expressionInput === null || props.expressionInput === "" ? "No solution" : props.expressionInput)}</h2><br />
                          Here's our solution<br /><br />
                          <h2>{props.solution}</h2>
                        </h3>
                      </div>
                      <div className="col">
                        <h3 className="fnt-regular text-center">
                          Top solutions
                        </h3>
                        <div style={{ marginTop: "1rem" }}></div>
                        <table style={{ backgroundColor: "", width: "70%", margin: "auto" }}>
                          {props.playerSolutions.map((eachPlayer, index) => {
                            return <React.Fragment>
                              <tr>
                                <td>
                                  <span className={index === 0 ? "blue-dot" : index === 1 ? "red-dot" : index === 2 ? "yellow-dot" : ""} />
                                  <span className="solution-player-name">{" " + shortenName(eachPlayer.name)}</span>
                                </td>
                                <td><h2 className="text-align-right" style={{ textAlign: "right" }}>{eachPlayer.solution === null || eachPlayer.solution === "" ? "" : eachPlayer.solution}</h2></td>
                              </tr>
                              <div style={{ marginTop: "0.8rem" }}></div>
                            </React.Fragment>
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}></div>
                <div className="ranking-box">
                  <div className="container">
                    <div className="row" style={{ height: "4rem" }}>
                      <div className="col"><h3 className="text-center">You currently rank No.{props.playerRanking}</h3></div>
                    </div>
                    <div className="row">
                      <div className="col text-center" style={{ position: "relative", top: "1rem" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="116.279" viewBox="0 0 82.837 116.279">
                          <g id="award-fill" transform="translate(0.535 1)">
                            <path id="Path_10" data-name="Path 10" d="M43.177,0,55.135,6.19,68.447,8.211,74.48,20.248l9.579,9.458L81.867,42.989,84.06,56.273,74.48,65.731,68.447,77.768l-13.312,2.02-11.958,6.19-11.958-6.19-13.312-2.02L11.873,65.731,2.294,56.273,4.486,42.989,2.294,29.706l9.579-9.458L17.906,8.211,31.219,6.19Z" transform="translate(-2.294)" fill="silver" stroke="#707070" stroke-width="1" />
                            <path id="Path_11" data-name="Path 11" d="M4,11.794V41.93l28.66-7.165,28.66,7.165V11.794L46.86,13.986l-14.2,7.351-14.2-7.351Z" transform="translate(8.223 72.709)" fill="silver" stroke="#707070" stroke-width="1" />
                          </g>
                          <text id="_2" data-name="2" transform="translate(42.535 65)" fill="#fff" font-size="60" font-family="SegoeUI, Segoe UI"><tspan x="-16.172" y="0">2</tspan></text>
                        </svg>

                        <h2 className="d-inline-block ranking-name">{secondPlayerName}<br />{secondPlayerScore}</h2>
                      </div>
                      <div className="col text-center" style={{ position: "relative", top: "-2rem" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="115.842" viewBox="0 0 82.837 115.842">
                          <g id="award-fill" transform="translate(0.535 0.563)">
                            <path id="Path_10" data-name="Path 10" d="M43.177,0,55.135,6.19,68.447,8.211,74.48,20.248l9.579,9.458L81.867,42.989,84.06,56.273,74.48,65.731,68.447,77.768l-13.312,2.02-11.958,6.19-11.958-6.19-13.312-2.02L11.873,65.731,2.294,56.273,4.486,42.989,2.294,29.706l9.579-9.458L17.906,8.211,31.219,6.19Z" transform="translate(-2.294)" fill="gold" stroke="#707070" stroke-width="1" />
                            <path id="Path_11" data-name="Path 11" d="M4,11.794V41.93l28.66-7.165,28.66,7.165V11.794L46.86,13.986l-14.2,7.351-14.2-7.351Z" transform="translate(8.223 72.709)" fill="gold" stroke="#707070" stroke-width="1" />
                          </g>
                          <text id="_1" data-name="1" transform="translate(25.535 65.563)" fill="#fff" font-size="60" font-family="SegoeUI, Segoe UI"><tspan x="0" y="0">1</tspan></text>
                        </svg>

                        <h2 className="d-inline-block ranking-name">{firstPlayerName}<br />{firstPlayerScore}</h2>
                      </div>
                      <div className="col text-center" style={{ position: "relative", top: "1rem" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="115.842" viewBox="0 0 82.837 115.842">
                          <g id="award-fill" transform="translate(0.535 0.563)">
                            <path id="Path_10" data-name="Path 10" d="M43.177,0,55.135,6.19,68.447,8.211,74.48,20.248l9.579,9.458L81.867,42.989,84.06,56.273,74.48,65.731,68.447,77.768l-13.312,2.02-11.958,6.19-11.958-6.19-13.312-2.02L11.873,65.731,2.294,56.273,4.486,42.989,2.294,29.706l9.579-9.458L17.906,8.211,31.219,6.19Z" transform="translate(-2.294)" fill="#cd8032" stroke="#707070" stroke-width="1" />
                            <path id="Path_11" data-name="Path 11" d="M4,11.794V41.93l28.66-7.165,28.66,7.165V11.794L46.86,13.986l-14.2,7.351-14.2-7.351Z" transform="translate(8.223 72.709)" fill="#cd8032" stroke="#707070" stroke-width="1" />
                          </g>
                          <text id="_3" data-name="3" transform="translate(41.535 65.563)" fill="#fff" font-size="60" font-family="SegoeUI, Segoe UI"><tspan x="-16.172" y="0">3</tspan></text>
                        </svg>

                        <h2 className="d-inline-block ranking-name">{thirdPlayerName}<br />{thirdPlayerScore}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}></div>
                <h6>{(props.isLastRound === true ?
                  "The summary page will appear in " :
                  "Next round will begin in ")}
                  <span className="h3">{props.timeInGame + " "}</span>
                  seconds
                </h6>
              </React.Fragment>}
            {/* <div style={{ marginTop: "1rem" }}></div> */}
            {/* <h2 id="game-top-text" className="fnt-bold">
              <h1>Round {props.whichRound}</h1>
              <h1>Result</h1>
              <h1>System Solution (random one)</h1>
              <h1>{props.solution}</h1>
              <div className="col h-100 text-center overflow-auto">
                <h1>Player Solutions (the top three)</h1>
                <SolutionsRank
                  playerSolutions={props.playerSolutions}>

                </SolutionsRank>
              </div>

            </h2>
            <h3>Your Ranking in the Room is</h3>
            <h3>number {props.playerRanking}</h3>
            <h3>Player Scores (the top three)</h3>
            <ScoresRank
              scoreRanking={props.scoreRanking}>
            </ScoresRank> */}
            {/* <h6>{(props.isLastRound === true ?
              "The summary page will appear in " :
              "Next round will begin in ")}
              <span className="h3">6 </span>
              seconds
            </h6> */}
          </div>
        </div>
      </div>
    </div >

  );
}

export default BetweenRoundPage;