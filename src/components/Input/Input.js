import React from 'react'

import './Input.css';

const input = (props) => (
    <div className="Input">
        <label className="Label">{props.label}</label>
        <input className="InputElement" {...props} ref={props.refel} />
    </div>
);

export default input