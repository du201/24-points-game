import React from "react";


const CountDownPage = (props) => {
  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col my-auto text-center">
          <h1>Final Countdown!</h1>
          <h1>{props.timeInGame}</h1>
        </div>
      </div>
    </div>
  );
}

export default CountDownPage;