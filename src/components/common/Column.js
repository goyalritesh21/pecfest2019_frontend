import React, {Component} from 'react';
import {getRandomFloat, lerp, lineEq} from "../../utils/MathUtils";
import {Ease, Sine, TimelineMax, TweenMax} from "gsap";
import ReactAnimationFrame from "react-animation-frame";
import BezierEasing from "bezier-easing";
import _ from "lodash";
import PropTypes from "prop-types";

class Column extends Component {
    constructor(props) {
        super(props);

        this.columnRef = React.createRef();

        this.state = {
            mousePos: {x: 0, y: 0},
            windowSize: {
                width: 0,
                height: 0,
            },
            isAnimating: false,
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', ev => this._onMouseMove(ev));

        this.setState({
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this._onMouseMove);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.selectedItem, this.props.selectedItem)) {
            this.setState({isAnimating: true});
        }

        if (!_.isEqual(prevState.isAnimating, this.state.isAnimating) &&
            this.state.isAnimating === true) {
            if (this.props.selectedItem >= 0) {
                this._startOpenAnimation();
            } else {
                this._startCloseAnimation();
            }
        }
    }

    onAnimationFrame() {
        this.tilt();
    }

    _startOpenAnimation = () => {
        console.log('Column : _startOpenAnimation');

        const {windowSize} = this.state;
        const {column} = this.props;

        const duration = 1.2;
        const ease = new Ease(BezierEasing(1, 0, 0.735, 0.775));

        const rect = this.columnRef.current.getBoundingClientRect();

        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        }).to(this.columnRef.current, duration, {
            ease: ease,
            y: column.isBottom ? rect.height + windowSize.height * .2 : -1 * rect.height - windowSize.height * .2,
            opacity: 0
        }, 0)
    };

    _startCloseAnimation = () => {
        console.log('Column : _startCloseAnimation');

        const duration = 1;
        const ease = Sine.easeOut;

        // Animate columns in
        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        }).to(this.columnRef.current, duration, {
            ease: ease,
            y: 0,
            x: 0,
            //scaleX: 1,
            opacity: 1
        }, 0.02, duration * 0.6)
    };

    tilt = () => {
        const {windowSize, mousePos} = this.state;
        const {activeTilt, column} = this.props;

        const translationVals = {
            tx: 0,
            ty: 0
        };

        const randX = getRandomFloat(5, 20);
        const rY1 = column.isBottom ? getRandomFloat(10, 30) : getRandomFloat(30, 80);
        const rY2 = column.isBottom ? getRandomFloat(30, 80) : getRandomFloat(10, 30);

        if (activeTilt.columns) {
            translationVals.tx = lerp(translationVals.tx, lineEq(-randX, randX, windowSize.width, 0, mousePos.x), 0.03);
            translationVals.ty = lerp(translationVals.ty, lineEq(column.isBottom ? -rY1 : rY2, column.isBottom ? rY2 : -rY1, windowSize.height, 0, mousePos.y), 0.03);
            TweenMax.set(this.columnRef.current, {
                x: translationVals.tx,
                y: translationVals.ty,
                rotation: 0.01
            });
        } else {
            translationVals.tx = 0;
            translationVals.ty = 0;
        }
    };

    _onMouseMove = (e) => {
        let posX = 0;
        let posY = 0;

        if (e.pageX || e.pageY) {
            posX = e.pageX;
            posY = e.pageY;
        }

        this.setState({
            mousePos: {x: posX, y: posY}
        });
    };

    render() {
        const {column} = this.props;

        const columnClassName = column.isBottom ? "column column--bottom" : "column";

        return (
            <div className={columnClassName}
                 ref={this.columnRef}>
                {column.images.map((image, index) => (
                    <div className="column__img"
                         key={index}
                         style={{backgroundImage: `url(${image})`}}/>
                ))}
            </div>
        );
    }
}

Column.propTypes = {
    selectedItem: PropTypes.number.isRequired,
};

export default ReactAnimationFrame(Column);