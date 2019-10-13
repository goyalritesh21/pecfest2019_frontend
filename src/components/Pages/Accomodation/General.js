import React, {Component} from "react";
import anime from "animejs";

class General extends Component {
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
                <p>
                    Convenience of the participants matters the most for a successful event. So, the Hospitality
                    department at PECFEST is here to provide you with comfortable stay within the institute.</p>
                <p>
                    Due to large participation from various colleges all over India, we have implemented procedural
                    guidelines to make your stay and the fest a memorable one.
                </p><br/><br/>
                <em>NOTE:</em><br/>
                <ul style={{listStyle: 'circle', textAlign: "left"}}>
                    <li>
                        The stay will be strictly on first come first serve basis.
                    </li>
                    <li>
                        Owing to large participation, the accommodation will be provided on sharing basis.
                    </li>
                </ul>
            </div>
        );
    }
}

export default General;