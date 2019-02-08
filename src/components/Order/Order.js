import React from 'react';

import classes from './Order.module.css';

const order = props => {
    const ingredients = [];
    for(let ingredientsName in props.ingredients) {
        ingredients.push({
            amount: props.ingredients[ingredientsName],
            name: ingredientsName
        });
    }

    const ioutput = ingredients.map(m => (
        <span 
            style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #eee', padding: '3px' }}
            key={m.name}>{m.name} ({m.amount})</span>
    ));
    return <div className={classes.Order}>
        <p>Ingredients: {ioutput}</p>
        <p>
            Price: <strong>{(+props.price).toFixed(2)}</strong>
        </p>
    </div>;
};

export default order;
