import React, {Component} from 'react';
import Charming from 'react-charming';
import _ from "lodash";
import PropTypes from 'prop-types';
import {getRandomFloat} from "../../utils/MathUtils";
import {Ease, Expo, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing"

class ContentItem extends Component {
    constructor(props) {
        super(props);

        this.contentTitleRef = React.createRef();

        this.state = {
            isAnimating: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.selectedItem, this.props.selectedItem)) {
            console.log('selectedItem = ', this.props.selectedItem);
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

    _startOpenAnimation = () => {
        console.log('ContentItem : _startOpenAnimation');

        const duration = 1.2;
        const columnsStagger = 0;
        const columnsTotal = 4;

        const titleLettersDOM = this.contentTitleRef.current.querySelectorAll('span');

        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        })  // Animate the content item title letters
            .set(titleLettersDOM, {
                opacity: 0
            }, duration + duration * columnsStagger * columnsTotal)
            .staggerTo(titleLettersDOM, duration, {
                ease: Expo.easeOut,
                startAt: {
                    cycle: {
                        y: (i, _) => i % 2 === 0 ? getRandomFloat(-35, -15) : getRandomFloat(15, 35),
                        rotation: getRandomFloat(-20, 0)
                    }
                },
                y: 0,
                rotation: 0,
                opacity: 1
            }, -0.01, duration + duration * columnsStagger * columnsTotal);
    };

    _startCloseAnimation = () => {
        console.log('ContentItem : _startCloseAnimation');

        const duration = 1;

        const titleLettersDOM = this.contentTitleRef.current.querySelectorAll('span');

        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        }).staggerTo(titleLettersDOM, duration * 0.6, {
            ease: new Ease(BezierEasing(0.775, 0.05, 0.87, 0.465)),
            cycle: {
                y: (i, _) => i % 2 === 0 ? getRandomFloat(-35, -15) : getRandomFloat(15, 35),
                rotation: getRandomFloat(-20, 0)
            },
            opacity: 0
        }, 0.01, 0)
    };

    render() {
        const {item, selectedItem, onBackPress} = this.props;

        const articleClassName = _.isEqual(selectedItem, item.id) ? "item item--current" : "item";

        return (
            <article className={articleClassName}>
                <div className="item__img"
                     style={{
                         backgroundImage: `url(${item.coverImage})`,
                     }}/>
                <div className="item__content">
                    <div className="item__content-back hover"
                         onClick={() => {
                             this._startCloseAnimation();
                             onBackPress();
                         }}>back
                    </div>
                    <h2 className="item__content-title"
                        ref={this.contentTitleRef}>
                        <Charming letters={item.title} render={(letters) => (
                            <div ref={this.lettersRef}>{letters}</div>
                        )}/>
                    </h2>
                    <h3 className="item__content-subtitle">{item.subtitle}</h3>
                    <div className="item__content-text">
                        {item.content.map((para, index) => {
                            return <p key={index}>{para}</p>
                        })}
                    </div>
                </div>
            </article>
        );
    }
}

ContentItem.propTypes = {
    selectedItem: PropTypes.number.isRequired,
};

export default ContentItem;