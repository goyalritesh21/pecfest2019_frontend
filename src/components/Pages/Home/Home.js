import React, {Component} from 'react';
import Footer from '../../layout/Footer';
import BackgroundImage from "../../../images/sides.png"
import * as PropTypes from 'prop-types'
import {connect} from "react-redux";
import {fetchBrochure} from "../../../actions/home";
import _ from 'lodash';

class Home extends Component {

    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
        this.props.fetchBrochure();
    }

    render() {
        return (
            <div>
                <svg className="Home-text" viewBox="0 0 600 150">
                    <symbol id="s-text">
                        <text textAnchor="middle" x={"50%"} y={"30%"} dy={".35em"}>
                            PECFEST' 19
                        </text>
                    </symbol>
                    <use className="Home-text" xlinkHref="#s-text"/>
                    <use className="Home-text" xlinkHref="#s-text"/>
                    <use className="Home-text" xlinkHref="#s-text"/>
                    <use className="Home-text" xlinkHref="#s-text"/>
                    <use className="Home-text" xlinkHref="#s-text"/>
                </svg>

                <div className={"flexButtons"}>
                    <div class="btn1" onClick={() => {
                        if (!_.isEmpty(this.props.brochures)) {
                            window.open(this.props.brochures[0].brochurePDF, '_blank');
                            window.focus();
                        }
                    }}>
                        <span>Brochure</span>
                    </div>
                    <div class="btn1">
                        <span>Register</span>

                    </div>
                    <div class="btn1">
                        <span>Ambassador</span>

                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    brochures: state.home.brochures,
});

Home.propTypes = {
    brochures: PropTypes.array.isRequired,

    fetchBrochure: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    fetchBrochure,
})(Home);
;