import React, { Component } from "react";
import "./RoomNumInput.css";
import $ from "jquery";

// Key codes
const DIGIT_ZERO = 48;
const DIGIT_NINE = 57;
const NUMPAD_ZERO = 96;
const NUMPAD_NINE = 105;
const BACKSPACE = 8;


class RoomNumInput extends Component {
  componentDidMount = () => {
    $(".inputs").keydown(function (e) {
      if (e.keyCode === BACKSPACE && this.value.length === 0) {
        $(this).closest("div").prev("div").children('.inputs').select();
      }
    }).keyup(function (e) {
      if (((e.keyCode >= DIGIT_ZERO && e.keyCode <= DIGIT_NINE) ||
          (e.keyCode >= NUMPAD_ZERO && e.keyCode <= NUMPAD_NINE)) &&
          this.value.length === this.maxLength) {
        $(this).closest("div").next("div").children('.inputs').select();
      }
      // Extra safty measure, adapted from https://stackoverflow.com/a/39292545
      $(this).val($(this).val().replace(/[^0-9]/g, ''));
    }).click(function() {
      $(this).select();
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="force-inline fnt-thin">
          <input className="input-roomNum form-control inputs" type="Number" maxLength="1" id="first" onChange={this.props.setRoomNum} autoFocus/>
        </div>
        <div className="force-inline fnt-thin">
          <input className="input-roomNum form-control inputs" type="Number" maxLength="1" id="second" onChange={this.props.setRoomNum}/>
        </div>
        <div className="force-inline fnt-thin">
          <input className="input-roomNum form-control inputs" type="Number" maxLength="1" id="third" onChange={this.props.setRoomNum}/>
        </div>
        <div className="force-inline fnt-thin">
          <input className="input-roomNum form-control inputs" type="Number" maxLength="1" id="last" onChange={this.props.setRoomNum}/>
        </div>
      </React.Fragment >
    );
  }
};

export default RoomNumInput;
