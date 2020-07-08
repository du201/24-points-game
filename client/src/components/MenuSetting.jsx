import React from "react";
import "./MenuSetting.css";

const MenuSetting = (props) => {
  let showMenuBooleanStyle = props.showMenuBoolean === false ? "none" : "block";
  console.log(showMenuBooleanStyle);
  let display = { display: showMenuBooleanStyle };
  return (
    <div className="jumbotron" style={display}>
      <h1 className="display-4">Game Setting</h1>
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Basic
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            className="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              <div>
                Number of slots: {props.slotNum}
                <br></br>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={props.slotNum}
                  id="slots"
                  onChange={props.slotNumChangeHandler}
                ></input>
              </div>
              <div>
                Target Number: {props.targetNum}
                <br></br>
                <input
                  type="number"
                  onChange={props.targetNumChangeHandler}
                  value={props.targetNum}
                  //name={inputName}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header" id="headingTwo">
            <h2 className="mb-0">
              <button
                className="btn btn-link btn-block text-left collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Advanced
              </button>
            </h2>
          </div>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionExample"
          >
            <div className="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them
              accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div>
      {/*
      <p className="lead">Basic</p>
      <div>
        Number of slots: {props.slotNum}
        <br></br>
        <input
          type="range"
          min="2"
          max="6"
          value={props.slotNum}
          id="slots"
          onChange={props.slotNumChangeHandler}
        ></input>
      </div>
      <div>
        Target Number: {props.targetNum}
        <br></br>
        <input
          type="number"
          onChange={props.targetNumChangeHandler}
          value={props.targetNum}
          //name={inputName}
        ></input>
      </div>
      <p className="lead">Advanced</p>
      <hr className="my-4" />
      */}
      <a
        className="btn btn-primary btn-lg mt-2"
        href="#"
        role="button"
        onClick={props.menuCloseHandler}
      >
        Finish
      </a>
    </div>
  );
};

export default MenuSetting;
