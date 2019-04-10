import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
    // return class extends Component {
        // state = {
        //     error: null
        // };
        const [error, setError] = useState(null);

        // componentWillMount() {
        //     this.reqInterceptor = axios.interceptors.request.use(req => {
        //         this.setState({ error: null });
        //         return req;
        //     });
        //     this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        //         this.setState({ error: error });
        //     });
        // }
        const reqInterceptor = axios.interceptors.request.use(req => {
            // this.setState({ error: null });
            setError(null);
            return req;
        });
        
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            // this.setState({ error: error });
            setError(err);
        });

        // componentWillUnmount() {
        //     axios.interceptors.request.eject(this.reqInterceptor);
        //     axios.interceptors.response.eject(this.resInterceptor);
        // }
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]); // if we return a () it will run during unmount
        // cleans up when these ^^^ changes
        

        const errorDismissHandler = () => {
            // this.setState({ error: null });
            setError(null);
        }

        // render() {
        return (
            <>
                <Modal
                    show={error}
                    modalClosed={errorDismissHandler}>
                    {error ? error.message : `Something didn't go as plan! Try again!`}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
        // }
    };
};

// FORWARD REF?
export default withErrorHandler;
