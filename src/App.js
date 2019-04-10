import React, { useEffect, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// lazy loading
const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});


const app = (props) => {
    // componentDidMount() {
    //     this.props.onTryAutoSignUp();
    // }
    // render() {
    //     let routes = (
    //         <Switch>
    //             <Route path='/auth' component={asyncAuth} />
    //             <Route path='/' exact component={BurgerBuilder} />
    //             <Redirect to="/" />
    //         </Switch>
    //     );

    //     if (this.props.isAuthenticated) {
    //         routes = (<Switch>
    //             <Route path='/checkout' component={asyncCheckout} />
    //             <Route path='/orders' component={asyncOrders} />
    //             <Route path='/logout' component={Logout} />
    //             <Route path='/auth' component={asyncAuth} />
    //             <Route path='/' exact component={BurgerBuilder} />
    //             <Redirect to="/" />
    //         </Switch>);
    //     }

    //     return (
    //         <Layout>
    //             {/* <BurgerBuilder />
    //           <Checkout /> */}
    //           {routes}
    //         </Layout>
    //     );
    // }
    useEffect(() => {
        props.onTryAutoSignUp();
    }, []);

    let routes = (
        <Switch>
            <Route path='/auth' render={() => <Auth />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (<Switch>
            <Route path='/checkout' render={() => <Checkout />} />
            <Route path='/orders' render={() => <Orders />} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' render={() => <Auth />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>);
    }

    return (
        <Layout>
            {/* <BurgerBuilder />
              <Checkout /> */}
            <Suspense fallback={<p>Loading...</p>}>
                {routes}
            </Suspense>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(app)
);
