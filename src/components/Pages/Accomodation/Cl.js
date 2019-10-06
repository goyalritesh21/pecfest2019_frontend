import React, {Component} from "react";
import anime from "animejs";

class Cl extends Component{
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
                Benefits for Campus Lead
            </div>
        );
    }
}

export default Cl;