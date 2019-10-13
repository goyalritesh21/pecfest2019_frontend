import React, {Component} from "react";
import _ from "lodash";
import * as PropTypes from "prop-types";

export default class TeamCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            mouseX: 0,
            mouseY: 0,
            hidden: "hidden",
            loaded: false
        };
        this.mouseLeaveDelay = null;
    }

    show = () => (this.setState(() => ({
        hidden: null
    })));

    componentWillMount() {
        let that = this;
        setTimeout(() => (that.show()), 2000);
    }

    componentDidMount() {
        const width = this.card.offsetWidth;
        const height = this.card.offsetHeight;
        this.setState(() => ({width, height}));
    }

    _onMouseMove(e) {
        if (!_.isEmpty(e)) {
            const mouseX = (e.screenX - this.card.offsetLeft - this.state.width / 2) % 50;
            const mouseY = (e.screenY - this.card.offsetTop - this.state.height / 2) % 50;
            this.setState(() => ({mouseX, mouseY}));
        }
    }

    handleMouseEnter() {
        clearTimeout(this.mouseLeaveDelay);
    }

    handleMouseLeave() {
        this.mouseLeaveDelay = setTimeout(() => (this.setState(() => ({mouseX: 0, mouseY: 0}))), 1000);
    }

    _onLoad = () => (this.setState(() => ({loaded: true})));

    render() {
        const {header, name, email, dataImage} = this.props;
        const rX = (this.state.mouseX / this.state.width) * 30;
        const rY = (this.state.mouseY / this.state.height) * (-30);
        const tX = (this.state.mouseX / this.state.width) * -40;
        const tY = (this.mouseY / this.height) * -40;

        return (
            <div
                className={"Team__card-wrap"}
                ref={(r) => (this.card = r)}

            >
                <div className={"Team__card"}
                     onMouseMove={this._onMouseMove.bind(this)}
                     onMouseEnter={this.handleMouseEnter.bind(this)}
                     onMouseLeave={this.handleMouseLeave.bind(this)}
                     style={{
                         transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
                     }}
                >
                    <div
                        ref={(r) => (this.cardBg = r)}
                        style={{
                            backgroundImage: `url(${dataImage})`,
                            width: "260px",
                            height: "350px",
                        }}
                        className={"Team__card-bg"}
                    >
                    </div>
                    <div className="Team__card-info">
                        <h3>{header}</h3>
                        <p>{name}</p>
                        <p><a className={"Team__a"} href={`mailto:${email}`} title={email}>{email}</a></p>
                    </div>
                </div>

            </div>
        );
    }

}

TeamCard.propTypes = {
    header: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    dataImage: PropTypes.any
};