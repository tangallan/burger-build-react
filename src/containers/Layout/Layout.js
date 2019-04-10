import React, { useState } from 'react';
import classes from './Layout.module.css';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


const layout = props => {
    // state = {
    //     showSideDrawer : false
    // }
    const [showSideDrawerIsVisible, setShowSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        // this.setState({
        //     showSideDrawer: false
        // })
        setShowSideDrawerIsVisible(false);
    }

    const sideDrawerOpenHandler = () => {
        
        // this.setState((prevState) => {
        //     return { showSideDrawer: !prevState.showSideDrawer };
        // });
        setShowSideDrawerIsVisible(!showSideDrawerIsVisible);
    }

    // render() {
    return (
        <>
            <div>
                <Toolbar 
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerOpenHandler} />
                <SideDrawer 
                    isAuth={props.isAuthenticated}
                    open={showSideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} />
        </div>
            <main className={classes.Content}>{props.children}</main>
        </>
    );
    // }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(layout);
