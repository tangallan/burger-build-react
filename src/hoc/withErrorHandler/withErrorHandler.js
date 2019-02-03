import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        

        errorDismissHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorDismissHandler}>
                        {this.state.error
                            ? this.state.error.message
                            : `Something didn't go as plan! Try again!`}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    };
};

// FORWARD REF?
export default withErrorHandler;
