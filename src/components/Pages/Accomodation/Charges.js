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
                Rs. 800 for 3 nights.
            </div>
        );
    }
}

export default Charges;
