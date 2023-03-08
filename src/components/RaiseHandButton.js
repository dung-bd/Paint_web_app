import React from 'react';
import { raiseHand } from '../utils/request';

function RaiseHandButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.raised ? 'Lower Hand' : 'Raise Hand'}
    </button>
  );
}

export default RaiseHandButton;