import React, {Component} from "react";
import ReactDom from "react-dom";
import * as PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown, faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";


class Theme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state1: ''
        };
    }

    componentDidMount() {
        const slideElements = ['.Theme__back__slide', '.Theme__card__slide', '.Theme__content__slide'];
        let inProgress = false;
        const node = ReactDom.findDOMNode(this);

        const goToSlide = (slideElements, index) => {
            if (!inProgress) {
                inProgress = true;

                // card slide
                node.querySelector('.Theme__active').classList.add('Theme__exit');
                node.querySelector('.Theme__active').classList.remove('Theme__active');

                // content slide
                node.querySelector('.Theme__active').classList.add('Theme__exit');
                node.querySelector('.Theme__active').classList.remove('Theme__active');

                // back slide
                node.querySelector('.Theme__active').classList.add('Theme__exit');
                node.querySelector('.Theme__active').classList.remove('Theme__active');


                slideElements.forEach(elem => {
                    node.querySelector(`${elem}:nth-child(${index})`).classList.add('Theme__active');
                });

                const evenSlide = index % 2 === 0;
                if (evenSlide)
                    node.querySelector('.Theme__content__ping').classList.add('Theme__content__ping--right');
                else
                    node.querySelector('.Theme__content__ping').classList.remove('Theme__content__ping--right');

                var selection = node.querySelector('.Theme__content__ping--noanimation') !== null;
                // console.log("selection " + selection + " " + (selection === true));
                if (selection === true) {
                    node.querySelector('.Theme__content__ping--noanimation').classList.remove('Theme__content__ping--noanimation');
                }

                setTimeout(() => node.querySelector('.Theme__exit').classList.remove('Theme__exit'), 1000);
                setTimeout(() => inProgress = false, 2000);
            }
        };

        node.querySelector('.Theme__content__slide:nth-child(1) .Theme__button').addEventListener('click', () => goToSlide(slideElements, 2));
        node.querySelector('.Theme__content__slide:nth-child(2) .Theme__button').addEventListener('click', () => goToSlide(slideElements, 1));
        // setTimeout( () => goToSlide(slideElements, 2), 2000 );
        // setTimeout( () => goToSlide(slideElements, 1), 6000 );
    }


    render() {
        const {content, title, direction} = this.props;
        return (
            <div className="Theme__wrap">
                <div className="Theme__back">
                    <div className="Theme__back__slide Theme__active">
                        <div className="Theme__progress"/>
                    </div>
                    <div className="Theme__back__slide">
                        <div className="Theme__progress"/>
                        {/*<div className="Theme__back-front-image"></div>*/}
                    </div>
                </div>
                <div className="Theme__card">
                    <div className="Theme__card__slide Theme__active">
                        {/*<div className="Theme__image"></div>*/}
                        <span className="Theme__number"/>
                    </div>
                    <div className="Theme__card__slide">
                        <div className="Theme__back-image"/>
                        {/*<div className="Theme__image"></div>*/}
                        <span className="Theme__number"/>
                    </div>

                    <div className="Theme__content">
                        <div className="Theme__content__slide Theme__exit Theme__active">
                            <h2 className="Theme__title">
                            <span className="Theme__title__line">
                                <span className="Theme__title__inner"/>
                            </span>
                                <span className="Theme__title__line">
                                    <span className="Theme__title__inner">{title}</span>
                                </span>
                            </h2>
                            <p className="Theme__desc">
                                {
                                    content.first
                                }
                            </p>
                            <div className="Theme__button-wrap">
                                <button className="Theme__button">Learn More &nbsp;
									<FontAwesomeIcon icon={faArrowRight}
													 size={"sm"}

									/>
                                    <span className="Theme__button__hover"/>
                                </button>
                            </div>
                        </div>
                        <div className="Theme__content__slide">
                            <h2 className="Theme__title">
                            <span className="Theme__title__line">
                                <span className="Theme__title__inner"/>
                            </span>
                                <span className="Theme__title__line">
                                <span className="Theme__title__inner">{title}</span>
                            </span>
                            </h2>
                            <p className="Theme__desc">
                                {
                                    content.second
                                }
                            </p>
                            <div className="Theme__button-wrap">
                                <button className="Theme__button">
                                    <FontAwesomeIcon icon={faArrowLeft}
                                                     size={"sm"}

									/>&nbsp; Back
                                    <span className="Theme__button__hover"/>
                                </button>
                            </div>
                        </div>
                        <div className="Theme__content__ping Theme__content__ping--noanimation"/>
                    </div>
                </div>
                <div className={"flex-center__icon"} onClick={this.props.onScrollIntoView}>
                    <FontAwesomeIcon icon={direction === "up" ? faChevronUp : faChevronDown}
                                     size={"3x"}
                                     style={{color: "white", cursor: "pointer"}}
                    />
                </div>
            </div>
        );
    }
}

Theme.propTypes = {
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    onScrollIntoView: PropTypes.func.isRequired
};

export default Theme;