import React, {Component} from 'react';
import {getBackgroundImage} from "../../utils/BackgroundUtils";
import moment from "moment";

class NotFound extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
    }

    render() {
        return (
            <div className={"NotFound"}>
                <div id="clouds">
                    <div className="cloud x1"/>
                    <div className="cloud x1_5"/>
                    <div className="cloud x2"/>
                    <div className="cloud x3"/>
                    <div className="cloud x4"/>
                    <div className="cloud x5"/>
                </div>
                <div className='c'>
                    <div className='_404'>PECFEST' 19</div>
                    <hr/>
                    <div className='_1'>Coming</div>
                    <div className='_2'>Soon</div>
                </div>
            </div>
        );
    }
}
export default NotFound;