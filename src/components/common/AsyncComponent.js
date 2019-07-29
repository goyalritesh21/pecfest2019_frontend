import React, {PureComponent} from 'react';
import Loader from './Loader';

export default class AsyncComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            Component: null
        }
    }

    componentWillMount() {
        if (!this.state.Component) {
            this.props.moduleProvider().then(({Component}) => this.setState({Component}));
        }
    }

    render() {
        const {Component} = this.state;

        //The magic happens here!
        return (
            <div>
                {Component ? <Component/> : <Loader/>}
            </div>
        );
    }
};