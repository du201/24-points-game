import KeyboardEventHandler from 'react-keyboard-event-handler';
import React from "react";

const KeyboardEvent = (props) => (<React.Fragment>
  <KeyboardEventHandler
    handleKeys={["enter"]}
    onKeyEvent={(key, e) => props.eventKey()} />
</React.Fragment>);

export default KeyboardEvent;