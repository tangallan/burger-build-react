import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // this could be a functional component, doesn't have to be a class
    componentWillUpdate() {
        console.log('[Order Summary] will update.');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {igKey}
                    </span>: {this.props.ingredients[igKey]}
                </li>;
            });
        return <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <h4>Total Price: <strong>{this.props.price.toFixed(2)}</strong></h4>
            <p>
                Continue to Checkout?
            </p>
            <Button btnType="Danger" clicked={this.props.purchasedCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </>;
    }
}

export default OrderSummary;