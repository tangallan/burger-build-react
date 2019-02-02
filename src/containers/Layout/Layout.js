import React, {Component} from 'react';
import classes from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerOpenHandler = () => {
        
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }

    render() {
        return (
            <>
                <div>
                    <Toolbar drawerToggleClicked={this.sideDrawerOpenHandler} />
                    <SideDrawer 
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler} />
            </div>
                <main className={classes.Content}>{this.props.children}</main>
            </>
        );
    }
}

export default Layout;
