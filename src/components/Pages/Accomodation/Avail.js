import React, {Component} from "react";
import anime from "animejs";
import {AccoTeam, convenors} from "../../../data/PecfestTeam";
import AccoCard from "../../common/AccoCard";

class Avail extends Component {
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
                    Everyone willing to avail accommodation during PECFEST has to report at the campus and contact the
                    below mentioned people.
                </p>
                <div className="Team__mycontainer">
                    {
                        AccoTeam.map(({contact, name, email, photo}, index)=>(
                            <AccoCard
                                dataImage={photo}
                                name={name}
                                contact={contact}
                                email={email}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Avail;