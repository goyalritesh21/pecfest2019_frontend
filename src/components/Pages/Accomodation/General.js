import React, {Component} from "react";
import anime from "animejs";

class General extends Component{
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
                For the convenience of the enthusiastic participants of PecFest, we here in the Hospitality
                Department of PecFest take it upon ourselves to provide you with a convenient stay place within
                the institute itself. Owing to the huge scale participation, we have established a set of
                procedural guidelines to help make the process seamless and without glitches.<br/><br/>
                NOTE:<br/>
                <ul style={{listStyle: 'circle'}}>
                    <li>
                        Owing to a large number of requests for accommodation, we are bound to provide it
                        strictly on a shared basis.
                    </li>
                    <li>
                        You will be given accommodation only after it has been confirmed by the Hospitality Core
                        Group members of the festival, through the CL of your college.
                    </li>
                </ul>
            </div>
        );
    }
}

export default General;