import React, {Component} from 'react';
import Footer from '../layout/Footer';
import BackgroundImage from "../../images/sides.png"

class Home extends Component {

    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
    }

    render() {
        return (
            <div>
                <svg id={"pecfestTitle"} viewBox="0 0 600 150">
                    <symbol id="s-text">
                        <text textAnchor="middle" x={"50%"} y={"30%"} dy={".35em"}>PECFEST' 19</text>
                    </symbol>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                    <use className="text" xlinkHref="#s-text"/>
                </svg>
                <Footer/>
            </div>
        );
    }
}

export default Home;