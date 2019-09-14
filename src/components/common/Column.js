import React, {Component} from 'react';
import {getRandomFloat, lerp, lineEq} from "../../utils/MathUtils";
import {Ease, Sine, TimelineMax, TweenMax} from "gsap";
import ReactAnimationFrame from "react-animation-frame";
import BezierEasing from "bezier-easing";
import _ from "lodash";
import {ANIMATION_STATE} from "../../utils/Utils";

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
            translationVals: {
                tx: 0,
                ty: 0,
            },
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
        if (!_.isEqual(prevProps.animationState, this.props.animationState)) {
            if (_.isEqual(this.props.animationState, ANIMATION_STATE['OPEN'])) {
                this._startOpenAnimation();
            } else if (_.isEqual(this.props.animationState, ANIMATION_STATE['CLOSE'])) {
                this._startCloseAnimation();
            }
        }

        if (!_.isEqual(prevState.translationVals, this.state.translationVals)) {
            TweenMax.set(this.columnRef.current, {
                x: this.state.translationVals.tx,
                y: this.state.translationVals.ty,
                rotation: 0.01
            });
        }
    }

    onAnimationFrame() {
        this.tilt();
    }

    _startOpenAnimation = () => {
        const {windowSize} = this.state;
        const {column, onAnimationComplete} = this.props;

        const duration = 1.2;
        const ease = new Ease(BezierEasing(1, 0, 0.735, 0.775));

        const rect = this.columnRef.current.getBoundingClientRect();

        new TimelineMax({
            onComplete: () => {
                onAnimationComplete(ANIMATION_STATE['OPEN']);
            },
        }).to(this.columnRef.current, duration, {
            ease: ease,
            y: column.isBottom ? rect.height + windowSize.height * .2 : -1 * rect.height - windowSize.height * .2,
            opacity: 0
        }, 0)
    };

    _startCloseAnimation = () => {
        console.log('Column : _startCloseAnimation');

        const {onAnimationComplete} = this.props;

        const duration = 1;
        const ease = Sine.easeOut;

        // Animate columns in
        new TimelineMax({
            onComplete: () => {
                onAnimationComplete(ANIMATION_STATE['CLOSE']);
            },
        }).to(this.columnRef.current, duration, {
            ease: ease,
            y: 0,
            x: 0,
            //scaleX: 1,
            opacity: 1
        }, 0.02, duration * 0.6)
    };

    tilt = () => {
        const {windowSize, mousePos, translationVals} = this.state;
        const {activeTilt, column} = this.props;

        const randX = getRandomFloat(5, 20);
        const rY1 = column.isBottom ? getRandomFloat(10, 30) : getRandomFloat(30, 80);
        const rY2 = column.isBottom ? getRandomFloat(30, 80) : getRandomFloat(10, 30);

        if (activeTilt.columns) {
            this.setState({
                translationVals: {
                    tx: lerp(translationVals.tx, lineEq(-randX, randX, windowSize.width, 0, mousePos.x), 0.03),
                    ty: lerp(translationVals.ty, lineEq(column.isBottom ? -rY1 : rY2, column.isBottom ? rY2 : -rY1, windowSize.height, 0, mousePos.y), 0.03)
                }
            });
        } else {
            this.setState({
                translationVals: {
                    tx: 0,
                    ty: 0
                }
            });
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

        const columnClassName = column.isBottom ? "Events-column Events-column--bottom" : "Events-column";

        return (
            <div className={columnClassName}
                 ref={this.columnRef}>
                {column.images.map((image, index) => (
                    <div className="Events-column__img"
                         key={index}
                         style={{backgroundImage: `url(${image})`}}/>
                ))}
            </div>
        );
    }
}

export default ReactAnimationFrame(Column);