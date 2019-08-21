import React, {Component} from 'react';
import {getRandomFloat} from "../../utils/MathUtils";
import {Ease, Expo, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import _ from "lodash";
import {ANIMATION_STATE} from "../../utils/Utils";
import {categoryEvent} from "../../data/Events";
import Charming from "react-charming";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

class ContentItem extends Component {
    constructor(props) {
        super(props);

        this.contentTitleRef = React.createRef();

        this.state = {
            selectedCategory: 0,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.animationState, this.props.animationState)) {
            if (_.isEqual(this.props.animationState, ANIMATION_STATE['OPEN'])) {
                this._startOpenAnimation();
            } else if (_.isEqual(this.props.animationState, ANIMATION_STATE['OPEN'])) {
                this._startCloseAnimation();
            }
        }
    }

    _startOpenAnimation = () => {
        console.log('ContentItem : _startOpenAnimation');

        const {onAnimationComplete} = this.props;

        const duration = 1.2;
        const columnsStagger = 0;
        const columnsTotal = 4;

        const titleLettersDOM = this.contentTitleRef.current.querySelectorAll('span');

        new TimelineMax({
            onComplete: () => {
                onAnimationComplete(ANIMATION_STATE['OPEN']);
            },
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
        const {onBackPress, onAnimationComplete} = this.props;

        const duration = 1;

        const titleLettersDOM = this.contentTitleRef.current.querySelectorAll('span');

        new TimelineMax({
            onComplete: () => {
                onAnimationComplete(ANIMATION_STATE['OPEN']);
                onBackPress();
            },
        }).staggerTo(titleLettersDOM, duration * 0.6, {
            ease: new Ease(BezierEasing(0.775, 0.05, 0.87, 0.465)),
            cycle: {
                y: (i, _) => i % 2 === 0 ? getRandomFloat(-35, -15) : getRandomFloat(15, 35),
                rotation: getRandomFloat(-20, 0)
            },
            opacity: 0
        }, 0.01, 0)
    };

    renderTitleBar = (title) => {
        return (
            <div className="Events-item__content-titlebar hover"
                 onClick={() => {
                     this._startCloseAnimation();
                 }}>
                <div className="Events-item__content-back hover"
                     style={{
                         margin: "auto 12px"
                     }}>
                    <FontAwesomeIcon icon={faArrowLeft} size="3x" className={"hover"}/>
                </div>
                <h2 className="Events-item__content-title hover"
                    style={{color: "white"}}
                    ref={this.contentTitleRef}>
                    <Charming letters={title} render={(letters) => (
                        <div ref={this.lettersRef}>{letters}</div>
                    )}/>
                </h2>
            </div>
        );
    };

    renderCategories = (categories) => {
        const {selectedCategory} = this.state;
        const selectedStyle = {fontSize: "3em"};

        return (
            <div className="Events-item__category Events-item__category-column hover">
                {categories.map((category, key) =>
                    <div key={key}
                         className={"hover"}
                         onClick={() => {
                             this.setState({selectedCategory: key});
                         }}>
                        <h2 className="Events-item__content-title Events-item__category-title"
                            style={_.isEqual(selectedCategory, key) ? selectedStyle : {}}>
                            <Charming letters={category} render={(letters) => (
                                <div className="hover">{letters}</div>
                            )}/>
                        </h2>
                    </div>
                )}
            </div>
        );
    };

    render() {
        const {item} = this.props;
        const {selectedCategory} = this.state;

        const categories = Object.keys(categoryEvent[item.title]);

        return (
            <article className="Events-item Events-item--current">
                <div className="Events-item__img"
                     style={{
                         backgroundImage: `url(${item.coverImage})`,
                     }}>
                    {this.renderTitleBar(item.title)}
                    {this.renderCategories(categories)}
                </div>
                <div className="Events-item__content">
                    <h2 className="Events-item__content-title hover"
                        ref={this.contentTitleRef}>
                        <Charming letters={categories[selectedCategory]} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h2>
                    <h3 className="Events-item__content-subtitle">{item.subtitle}</h3>
                    <div className="Events-item__content-text">
                        {item.content.map((para, index) => {
                            return <p key={index}>{para}</p>
                        })}
                    </div>
                </div>
            </article>
        );
    }
}

export default ContentItem;