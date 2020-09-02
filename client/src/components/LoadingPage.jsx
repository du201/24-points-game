import React from "react";
import Loader from 'react-loader-spinner';
import ExitRoomButton from "./common/ExitRoomButton";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingPage = (props) => {
  return (
    <React.Fragment>
      <div style={{ marginTop: "1.5rem" }}>
        <ExitRoomButton
          onCancel={props.exitRoomButtonPress}
        />
      </div>
      <div className="center-horizontal" style={{ marginTop: "18rem" }}>
        <Loader
          type="Oval"
          color="#4194F8"
          height={100}
          width={100}
        />
      </div>
      <h3 className="center-horizontal" style={{ marginTop: "1rem" }}>Loading...</h3>
    </React.Fragment>
  );
}

export default LoadingPage;