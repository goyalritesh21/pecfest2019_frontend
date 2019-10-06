import React, {Component} from "react";
import BackgroundImage from "../../../images/Accommodation.jpg";
import General from "./General";
import Avail from "./Avail";
import Cl from "./Cl";
import Charges from "./Charges";
import Privileges from "./Privileges";
import FAQs from "./FAQs";
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
        label: "ALL ABOUT CL",
        data: <Cl/>
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
            <div >
                <div className="about__t">Accommodation</div>
                <div className="about__a1">
                    <nav>
                        <ul className={"about__ul"}>
                            {
                                data.map((item, index) => (
                                    <li className={"about__li"}><a
                                        ref={(r) => this.myRefs[index] = r}
                                        onClick={() => this.activateLink(index)}
                                    >{item.label}</a></li>
                                ))
                            }
                        </ul>
                    </nav>
                    {
                        this.state.data
                    }

                </div>
            </div>
        );
    }
}

export default Accommodation;