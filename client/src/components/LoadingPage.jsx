import React from "react";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingPage = (props) => {
  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col my-auto text-center">
          <h2>The Game is Preparing...</h2>
          <Loader
            type="Oval"
            color="#00BFFF"
            height={300}
            width={300}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;