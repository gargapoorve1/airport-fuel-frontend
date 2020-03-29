import React from 'react'

import './Button.css';

const button = (props) => (
    <button className="Button"
        onClick={props.clicked} type="button">{props.children}</button>
);

export default button