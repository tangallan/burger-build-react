import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = props => {
    let transformedIngredients = [];
    if (props.ingredients && Object.keys(props.ingredients).length > 0) {
        transformedIngredients = Object.keys(props.ingredients)
            .map(igKey => {
                // [,]ç
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredient
                        key={igKey + i}
                        type={igKey}
                    />
                });
            })
            .reduce((arr, i) => {
                return arr.concat(i);
            });
    }

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return <div className={classes.Burger}>
            {/* <BurgerIngredient type='bread-top' />
            <BurgerIngredient type='meat' />
            <BurgerIngredient type='cheese' />
            <BurgerIngredient type='bread-bottom' /> */}
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>;
};

export default burger;
