import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({ loading: true });
        // alert('You continue');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            deliveryMethod: 'fastest'
        };

        axios
            .post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.replace('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                console.error(error);
            });
    };

    inputChangedHandler = (evt, inputIdentifier) => {
        const updateOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updateOrderForm[inputIdentifier] };
        updatedFormElement.value = evt.target.value;
        updateOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({
            orderForm: updateOrderForm
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form >
                {/* <Input
                    inputtype='input'
                    type='text'
                    name='name'
                    placeholder='Your Name'
                />
                <Input
                    inputtype='input'
                    type='email'
                    name='email'
                    placeholder='Your Email'
                />
                <Input
                    inputtype='input'
                    type='text'
                    name='street'
                    placeholder='Street'
                />
                <Input
                    inputtype='input'
                    type='text'
                    name='postalCode'
                    placeholder='Postal Code'
                /> */}
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                {formElementsArray.map(fe => (
                    <Input
                        key={fe.id}
                        elementType={fe.config.elementType}
                        elementConfig={fe.config.elementConfig}
                        value={fe.config.value}
                        changed={(evt) => this.inputChangedHandler(evt, fe.id)}
                    />
                ))}
                <Button btnType='Success' clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
