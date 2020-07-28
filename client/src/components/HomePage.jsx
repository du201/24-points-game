import React from "react";
import "./CustomBootstrap.css";

const HomePage = (props) => {

  return (
    <div className="container h-100">
      <div className="row" style={{ height: "15%" }}>
        <div className="col text-center my-auto">
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <h1 className="title-homepage">24</h1>
        </div>
      </div>
      <div className="row h-25">
        <div className="col text-center my-auto">
          <div className="d-inline-flex flex-column">
            <button
              className="btn-outline grey-text btn mb-2"
              onClick={props.pressSolveModeButton}
            >
              Solve Mode
                </button>
            <button
              className="btn-outline grey-text btn mb-2"
              onClick={props.pressGameModeButton}
            >
              Multiplayer
                </button>
            <button
              className="btn-outline grey-text btn mb-2"
              onClick={props.pressSinglePlayModeButton}
            >
              Singleplayer
                </button>
          </div>
        </div>
      </div>
      <div className="row h-25"></div>
      <div className="row" style={{ height: "10%" }}>
        <div className="col text-center my-auto">
          <div className="d-inline-flex flex-md-row flex-column">
            <a href="#" className="grey-text no-underline mx-3">ABOUT</a>
            <a href="#" className="grey-text no-underline mx-3">SHARE</a>
            <a href="#" className="grey-text no-underline mx-3">SOURCE</a>
            <a href="#" className="grey-text no-underline mx-3">BUG REPORT</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;