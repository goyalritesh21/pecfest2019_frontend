import React, {Component} from 'react';
import Charming from 'react-charming';
import {Ease, Elastic, Expo, Power1, Power4, Sine, TimelineMax, TweenMax} from 'gsap/TweenMax';
import {getRandomFloat, lineEq} from "../../utils/MathUtils";
import _ from "lodash";
import ReactAnimationFrame from "react-animation-frame";
import BezierEasing from "bezier-easing";
import PropTypes from 'prop-types';

class MenuItem extends Component {
    constructor(props) {
        super(props);

        this.itemRef = React.createRef();
        this.lettersRef = React.createRef();
        this.randLetters = [];

        this.state = {
            mousePos: {x: 0, y: 0},
            direction: 'down',
            isAnimating: false
        };
    }

    componentDidMount() {
        const lettersDOM = this.lettersRef.current.querySelectorAll('span');
        this.lettersTotal = lettersDOM.length;

        // Total number of letters that move when hovering and moving the mouse
        this.totalRandomLetters = 3;
        this.totalRandomLetters = this.totalRandomLetters <= this.lettersTotal ? this.totalRandomLetters : this.lettersTotal;
        // The amount that they move (y-axis)
        this.lettersTranslations = Array.from({
            length: this.totalRandomLetters
        }, _ => {
            const tr = getRandomFloat(10, 50);
            return [-tr, tr];
        });
        this.lettersRotations = Array.from({
            length: this.totalRandomLetters
        }, _ => {
            const rr = getRandomFloat(0, 6);
            return [-rr, rr];
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevState.mousePos, this.state.mousePos)) {
            this.setState({
                direction: prevState.mousePos.y - this.state.mousePos.y ? 'up' : 'down'
            })
        }

        if (!_.isEqual(prevProps.selectedItem, this.props.selectedItem)) {
            this.setState({
                isAnimating: true
            });
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

    _onMouseOver = (e) => {
        const lettersDOM = this.lettersRef.current.querySelectorAll('span');
        const shuffled = [...lettersDOM].sort(() => 0.5 - Math.random());
        this.randLetters = shuffled.slice(0, this.totalRandomLetters);
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

    _onMouseOut = (e) => {
        this.resetTilt();
        this.randLetters = [];
    };

    _startOpenAnimation = () => {
        console.log('MenuItem : _startOpenAnimation');

        const {selectedItem, item} = this.props;

        const duration = 1.2;
        const ease = new Ease(BezierEasing(1, 0, 0.735, 0.775));

        const lettersDOM = this.lettersRef.current.querySelectorAll('span');

        if (_.isEqual(selectedItem, item.id)) {
            new TimelineMax({
                onComplete: () => this.setState({isAnimating: false}),
            }).staggerTo(lettersDOM, duration * .7, {
                ease: ease,
                cycle: {
                    y: (i, _) => i % 2 === 0 ? getRandomFloat(-250, -150) : getRandomFloat(150, 250)
                },
                rotation: `+=${getRandomFloat(0, 20)}`,
                opacity: 0
            }, -0.01, 0)
        } else {
            new TimelineMax({
                onComplete: () => this.setState({isAnimating: false}),
            }).to(this.itemRef.current, duration * .5, {
                ease: ease,
                opacity: 0
            }, 0)
        }
    };

    _startCloseAnimation = () => {
        console.log('Events : _startCloseAnimation');

        const duration = 1;
        const ease = Sine.easeOut;

        const lettersDOM = this.lettersRef.current.querySelectorAll('span');

        // Animate menu items in
        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        })
            .to(lettersDOM, duration * .6, {
                ease: Power4.easeOut,
                y: 0,
                opacity: 1,
                rotation: 0
            }, duration)
            .to(this.itemRef.current, duration * .6, {
                ease: ease,
                opacity: 1
            }, duration);
    };

    tilt = () => {
        const {mousePos} = this.state;
        const {activeTilt} = this.props;

        const body = document.body;
        const docEl = document.documentElement;

        if (!activeTilt.letters) {
            return;
        }

        // Document scrolls
        const docScrolls = {
            left: body.scrollLeft + docEl.scrollLeft,
            top: body.scrollTop + docEl.scrollTop
        };

        const bounds = this.itemRef.current.getBoundingClientRect();

        // Mouse position relative to the main element (this.DOM.el)
        const relmousepos = {
            x: mousePos.x - bounds.left - docScrolls.left,
            y: mousePos.y - bounds.top - docScrolls.top
        };

        for (const [index, letter] of this.randLetters.entries()) {
            TweenMax.to(letter, 3, {
                ease: Expo.easeOut,
                y: lineEq(this.lettersTranslations[index][1], this.lettersTranslations[index][0], bounds.height, 0, relmousepos.y),
                rotation: lineEq(this.lettersRotations[index][1], this.lettersRotations[index][0], bounds.height, 0, relmousepos.y),
            });
        }
    };

    resetTilt = () => {
        const {direction} = this.state;
        const {activeTilt} = this.props;

        if (!activeTilt.letters) {
            return;
        }

        new TimelineMax()
            .to(this.randLetters, 0.2, {
                ease: Power1.easeOut,
                y: direction === 'up' ? '-=80%' : '+=80',
                rotation: direction === 'up' ? '-=10' : '+=10',
                opacity: 0,
            }, 0)
            .staggerTo(this.randLetters, getRandomFloat(0.5, 0.7), {
                ease: Elastic.easeOut.config(1, 0.4),
                startAt: {
                    y: direction === 'up' ? '80%' : '-80%',
                    opacity: 0
                },
                y: '0%',
                rotation: 0,
                opacity: 1
            }, 0.02, 0.2);
    };

    render() {
        const {item, onItemSelect} = this.props;

        return (
            <div ref={this.itemRef}
                 onMouseMove={this._onMouseMove}
                 onMouseOver={this._onMouseOver}
                 onMouseOut={this._onMouseOut}
                 onMouseLeave={this._onMouseOut}
                 onClick={() => onItemSelect(item)}
                 className="menu__item">
                <Charming letters={item.title} render={(letters) => (
                    <div ref={this.lettersRef}>{letters}</div>
                )}/>
            </div>
        );
    }
}

MenuItem.propTypes = {
    selectedItem: PropTypes.number.isRequired,
    onItemSelect: PropTypes.func.isRequired,
};

export default ReactAnimationFrame(MenuItem);