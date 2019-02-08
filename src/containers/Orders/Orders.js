import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios
            .get('/orders.json')
            .then(res => {
                // console.log(res.data);
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
            })
            .catch(e => {
                this.setState({ loading: false });
                console.error(e);
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(o => (
                    <Order key={o.id}
                        ingredients={o.ingredients}
                        price={o.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
