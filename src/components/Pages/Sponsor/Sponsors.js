import React, {Component} from 'react';
import Fluid from '../../layout/Fluid';
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";

class Sponsors extends Component {
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
    }

    render() {
        return (
            <div>
                <Fluid title="Sponsor's Page"/>
            </div>
        );
    }
}

export default Sponsors;