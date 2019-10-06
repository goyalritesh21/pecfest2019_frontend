import React, {Component} from "react";
import anime from "animejs";

class Privileges extends Component{
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
                Privileges
            </div>
        );
    }
}

export default Privileges;