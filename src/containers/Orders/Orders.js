import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // };

    componentWillMount() {
        
    }

    componentDidMount() {
        this.props.onFetchOrders();
        console.log(this.props);
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading) {
            orders = this.props.orders.map(o => (
                    <Order key={o.id}
                        ingredients={o.ingredients}
                        price={o.price} />
                ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
