import React, {Component} from 'react';
import Footer from '../../layout/Footer';
import BackgroundImage from "../../../images/sides.png"

class Home extends Component {

    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
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
                    <div class="btn1 ">
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

export default Home;