import React, {Component} from 'react';
import {getRandomFloat} from "../../utils/MathUtils";
import {Ease, Expo, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import _ from "lodash";
import {ANIMATION_STATE} from "../../utils/Utils";
import {categoryEvent} from "../../data/Events";
import Charming from "react-charming";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

class ContentItem extends Component {
    constructor(props) {
        super(props);

        this.contentTitleRef = React.createRef();

        this.state = {
            selectedCategory: -1,
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

    animateCharmingEnter = (ref, onComplete) => {
        const duration = 1.2;
        const columnsStagger = 0;
        const columnsTotal = 4;

        const titleLettersDOM = ref.current.querySelectorAll('span');

        new TimelineMax({onComplete})
        // Animate the content item title letters
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

    animateCharmingExit = (ref, onComplete) => {
        const duration = 1;

        const titleLettersDOM = this.contentTitleRef.current.querySelectorAll('span');

        new TimelineMax({onComplete}).staggerTo(titleLettersDOM, duration * 0.6, {
            ease: new Ease(BezierEasing(0.775, 0.05, 0.87, 0.465)),
            cycle: {
                y: (i, _) => i % 2 === 0 ? getRandomFloat(-35, -15) : getRandomFloat(15, 35),
                rotation: getRandomFloat(-20, 0)
            },
            opacity: 0
        }, 0.01, 0)
    };

    _startOpenAnimation = () => {
        console.log('ContentItem : _startOpenAnimation');

        const {onAnimationComplete} = this.props;

        this.animateCharmingEnter(this.contentTitleRef, () => {
            onAnimationComplete(ANIMATION_STATE['OPEN']);
        });
    };

    _startCloseAnimation = () => {
        console.log('ContentItem : _startCloseAnimation');
        const {onBackPress, onAnimationComplete} = this.props;

        this.animateCharmingExit(this.contentTitleRef, () => {
            onAnimationComplete(ANIMATION_STATE['OPEN']);
            onBackPress();
        });
    };

    renderTitleBar = () => {
        const {item} = this.props;
        const categories = Object.keys(categoryEvent[item.title]);
        const {selectedCategory} = this.state;

        return (
            <div className="Events-item__titlebar hover">
                <div className="Events-item__titlebar-back hover"
                     style={{margin: "auto 12px"}}
                     onClick={() => {
                         this.setState({selectedCategory: -1});
                         this._startCloseAnimation();
                     }}>
                    <FontAwesomeIcon icon={faArrowLeft} className="Events-item__titlebar-icon hover"/>
                </div>
                <div onClick={() => {
                    this.setState({selectedCategory: -1});
                }}>
                    <h3 className="Events-item__titlebar-title hover"
                        style={{color: "white"}}
                        ref={this.contentTitleRef}>
                        <Charming letters={item.title} render={(letters) => (
                            <div ref={this.lettersRef}>{letters}</div>
                        )}/>
                    </h3>
                </div>
                <a onClick = {() => {
                        this.setState({selectedCategory:null})
                    }}>
                <h3 className="Events-item__content-title hover"
                    style={{color: "white"}}
                    ref={this.contentTitleRef}>
                    <Charming letters={item.title} render={(letters) => (
                        <div ref={this.lettersRef}>{letters}</div>
                    )}/>
                </h3>
                </a>
                
                {selectedCategory >= 0 && (
                    <div style={{margin: "auto 12px"}}>
                        <FontAwesomeIcon icon={faChevronRight} className="Events-item__titlebar-icon"/>
                    </div>
                )}
                {selectedCategory >= 0 && (
                    <h3 className="Events-item__titlebar-title hover"
                        style={{color: "white"}}>
                        <Charming letters={categories[selectedCategory]} render={(letters) => (
                            <div>{letters}</div>
                        )}/>
                    </h3>
                )}
            </div>
        );
    };

    renderCategories = (categories, item) => {
        const {selectedCategory} = this.state;
        const selectedStyle = {fontSize: "3em"};

        return (
            <div className="Events-item__category Events-item__category-column hover">
                { _.isEqual(selectedCategory, null) ? (categories.map((category, key) =>
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
                )) : (
                <div className="menu menu--adsila">
                    {categoryEvent[item.title][categories[selectedCategory]].map((event, index) => (
                        <div className="menu__item">
                            <span className="menu__item-name" id={index}>{event}</span>
                        </div>
                    ))}
                </div>
                )}
            </div>
        );
    };

    renderContent = () => {
        const {item} = this.props;

        const {selectedCategory} = this.state;

        const categories = Object.keys(categoryEvent[item.title]);

        return (
            <h2 className="Events-item__content-title hover">
                <Charming letters={categories[selectedCategory]} render={(letters) => (
                    <div>{letters}</div>
                )}/>
            </h2>
        )
    };

    render() {
        const {item} = this.props;
        const categories = Object.keys(categoryEvent[item.title]);

        return (
            <article className="Events-item Events-item--current">
                <div className="Events-item__img"
                     style={{
                         backgroundImage: `url(${item.coverImage})`,
                     }}>
                    {this.renderTitleBar()}
                    {this.renderCategories(categories, item)}
                </div>
                <div className="Events-item__content">
                    {this.renderContent()}
                </div>
            </article>
        );
    }
}

export default ContentItem;