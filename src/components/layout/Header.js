import React, {Component, Fragment} from 'react';
import {HamburgerSpin} from 'react-animated-burgers'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";
import NavBar from './NavBar';

class Header extends Component {
    state = {
        isActive: false,
        width: "100%"
    };
    static propTypes = {
        user: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    toggleButton = () => {
        this.setState(({isActive}) => ({isActive: !isActive}));
    };

    onLogout = () => {
        this.props.logout();
        if(!this.props.isLoading){
            this.setState(({isActive}) => ({isActive: !isActive}));
        }

    };


    render() {
        return (
            <Fragment>
                <div className={"open-wrapper"}>
                    <div className="Navigation-Button">
                        <HamburgerSpin isActive={this.state.isActive}
                                       toggleButton={this.toggleButton}
                                       barColor="white"/>
                    </div>
                </div>
                <div id="myNav" className="overlay" style={{width: this.state.isActive ? this.state.width : "0%"}}>
                    <div className="overlay-content row">
                        {this.state.isActive ?
                            <NavBar toggleButton={this.toggleButton}
                                    onLogout={this.onLogout}/> : ""}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isLoading: state.loaders.logout
});
export default connect(mapStateToProps, {logout})(Header);