import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 1
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }

    componentDidMount() {
        console.log(process.env);
        axios
            .get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(m => {
                return ingredients[m];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const updatedCounted = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        // alert('You continue');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Allan Tang',
                address: {
                    street: 'Test Street 1',
                    zipCode: '12323',
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios
            .post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
                console.error(error);
            });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </>
            );

            orderSummary = (
                <OrderSummary
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseContinued={this.purchaseContinueHandler}
                    purchasedCanceled={this.purchaseCancelHandler}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
