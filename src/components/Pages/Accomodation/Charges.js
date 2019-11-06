import React, {Component} from "react";
import anime from "animejs";

class Charges extends Component {
    componentDidMount() {
        const timeline = anime.timeline();
        timeline.add({
            targets: ".about__a2",
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 700,
            easing: "easeOutElastic",
            delay: (el, i, l) => i * 200
        });
    }

    render() {
        return (
            <div className="about__a2">
                <ul style={{listStyle: 'circle', textAlign: "left"}}>
                    <li>
                        Rs. 800/- per participant. Payment can be made on spot or online to Adhitya Venugopal on <span
                        style={{textDecoration: "underline"}}>9592468729</span>.
                    </li>
                    <li>
                        Stay will be provided for maximum of 3 days i.e from 8th November 2019-10th November 2019.
                    </li>
                    <li>
                        Food is not included. However, it can be availed on a paying basis from the respective hostel
                        mess.
                    </li>
                </ul>
            </div>
        );
    }
}

export default Charges;
