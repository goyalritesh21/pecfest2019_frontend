import React, {Component} from 'react';
import {getRandomFloat} from "../../utils/MathUtils";
import {Ease, Expo, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import _ from "lodash";
import {ANIMATION_STATE} from "../../utils/Utils";
import {categoryEvent} from "../../data/Events";
import EventCategory from "../Pages/Events/EventCategory";
import Charming from "react-charming";

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

    render() {
        const {item} = this.props;
        // const {selectedCategory} = this.state;
        //
        // const categories = Object.keys(categoryEvent[item.title]);
        //
        // return (
        //     <div className="eventsinfo-main">
        //         <div className=" demo-4 loading">
        //             <div className="grid">
        //                 {categories.map((category, key) =>
        //                     <EventCategory
        //                         onClick={() => {
        //                             this.setState({
        //                                 selectedCategory: key,
        //                             })
        //                         }}
        //                         key={key}
        //                         name={category}
        //                         isSelected={_.isEqual(selectedCategory, key)}
        //                     />
        //                 )}
        //             </div>
        //             <nav className="menu menu--adsila">
        //                 {categoryEvent[item.title][categories[selectedCategory]].map((event, key) =>
        //                     <div className="menu__item" to="#">
        //                         <span className="menu__item-name" id={key}>{event}</span>
        //                         <span className="menu__item-label">A brief description of the event</span>
        //                     </div>
        //                 )}
        //             </nav>
        //         </div>
        //     </div>
        // );

        // return <Event eventId={1}/>

        return (
            <article className="Events-item Events-item--current">
                <div className="Events-item__img"
                     style={{
                         backgroundImage: `url(${item.coverImage})`,
                     }}/>
                <div className="Events-item__content">
                    <div className="Events-item__content-back hover"
                         onClick={() => {
                             this._startCloseAnimation();
                         }}>back
                    </div>
                    <h2 className="Events-item__content-title"
                        ref={this.contentTitleRef}>
                        <Charming letters={item.title} render={(letters) => (
                            <div ref={this.lettersRef}>{letters}</div>
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