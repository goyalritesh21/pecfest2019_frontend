import React, {Component} from "react";
// import BackgroundImage from "../../../images/Accommodation.jpg";
import BackgroundImage from "../../../assets/images/Accommodation/Acco.jpg"
import General from "./General";
import Avail from "./Avail";
import Charges from "./Charges";
import Privileges from "./Privileges";
import FAQs from "./FAQs";
import anime from "animejs";

const data = [
    {
        label: "GENERAL",
        data: <General/>
    },
    {
        label: "HOW TO AVAIL",
        data: <Avail/>
    },
    {
        label: "CHARGES",
        data: <Charges/>
    },
    {
        label: "PRIVILEGES",
        data: <Privileges/>
    },
    {
        label: "FAQs",
        data: <FAQs/>
    },
];

class Accommodation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data[0].data,
        };
        this.myRefs = [];
    }

    componentDidMount() {
        document.body.style.backgroundImage = `url(${BackgroundImage})`;
        this.activateLink(0);
        const timeline = anime.timeline();
        timeline.add({
            targets: ".about__t, .about__li, .about__content",
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 500,
            easing: "easeOutElastic",
            delay: (el, i, l) => i * 200
        });
    }

    activateLink = (index) => {
        this.myRefs.forEach((item) => (item.classList.remove('active')));
        this.myRefs[index].classList.add('active');
        this.setState(() => ({
            data: data[index].data
        }));
    };


    render() {
        return (
            <div style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))", height: "100vh", width: "100vw", position: "fixed", top: "0", left:"0"}}>
                <div className="about__t">Accommodation</div>
                <div className="about__a1">
                    <div className={"about__ul"}>
                        {
                            data.map((item, index) => (
                                <div
                                    key={index}
                                    className={"about__li"}
                                ><button
                                    className={"Accommodation__button"}
                                    ref={(r) => this.myRefs[index] = r}
                                    onClick={() => this.activateLink(index)}
                                >{item.label}</button></div>
                            ))
                        }
                    </div>
                    <div className={"about__content"}>
                        {
                            this.state.data
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Accommodation;