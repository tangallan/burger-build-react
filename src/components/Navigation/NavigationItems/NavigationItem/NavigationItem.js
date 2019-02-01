import React from 'react';

import classes from './NavigationItem.module.css';

const navigationitem = (props) => (
    <li className={classes.Navigationitem}>
        <a href={props.link} 
            className={props.active ? classes.active : null}>
            {props.children}
        </a>
    </li>
);


export default navigationitem