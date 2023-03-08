import React from 'react';


function RaiseHandButton(props) {
  return (
    <button onClick={props.onClick}>
      {props.raised ? 'Lower Hand' : 'Raise Hand'}
    </button>
  );
}

export default RaiseHandButton;