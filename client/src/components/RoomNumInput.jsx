import React, { Component } from "react";
import "./RoomNumInput.css";
import $ from "jquery";

class RoomNumInput extends Component {
  componentDidMount = () => {
    $(".inputs").keyup(function () {
      if (this.value.length === this.maxLength) {
        $(this).closest("div").next("div").children('.inputs').focus();
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="col col-2">
          <input className="inputs form-control" type="Number" maxLength="1" id="first" onInput={this.props.setRoomNum} autoFocus />
        </div>
        <div className="col col-2">
          <input className="inputs form-control" type="Number" maxLength="1" id="second" onChange={this.props.setRoomNum} />
        </div>
        <div className="col col-2">
          <input className="inputs form-control" type="Number" maxLength="1" id="third" onChange={this.props.setRoomNum} />
        </div>
        <div className="col col-2">
          <input className="inputs form-control" type="Number" maxLength="1" id="last" onChange={this.props.setRoomNum} />
        </div>
        <div className="col col-2 align-self-center">
          <small>{this.props.roomNumber}<br></br>please use 0 to fill the box if that digit doesn't exist<br></br>i.e. 24 {"=>"} 0024</small>
        </div>
      </React.Fragment >
    );
  }
};

export default RoomNumInput;
