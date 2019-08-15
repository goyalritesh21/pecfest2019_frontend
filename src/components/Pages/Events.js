import React, {Component} from 'react';
import '../../styles/components/pages/_Events.scss';
import Cursor from "../common/Cursor";
import Menu from "../common/Menu";
import ContentItem from "../common/ContentItem";
import _ from "lodash";
import Image1 from "../../assets/images/1.jpg"
import Image2 from "../../assets/images/2.jpg"
import Image3 from "../../assets/images/3.jpg"
import Image4 from "../../assets/images/4.jpg"
import Image5 from "../../assets/images/5.jpg"
import Image6 from "../../assets/images/6.jpg"
import Image7 from "../../assets/images/7.jpg"
import Image8 from "../../assets/images/8.jpg"
import Image9 from "../../assets/images/9.jpg"
import Image10 from "../../assets/images/10.jpg"
import Image11 from "../../assets/images/11.jpg"
import Image12 from "../../assets/images/12.jpg"
import Image13 from "../../assets/images/13.jpg"
import Image14 from "../../assets/images/14.jpg"
import Image15 from "../../assets/images/15.jpg"
import {Ease, Expo, Sine, TimelineMax} from "gsap";
import BezierEasing from "bezier-easing";
import Column from "../common/Column";

const eventItems = [
    {
        id: 0,
        title: 'Technical',
        subtitle: 'Fashion artisans at work',
        content: [
            "Now, when anything attracted his attention he always asked what it meant; and his mother, or more frequently Uncle Maxim, would explain to him the nature of the objects or of the creatures that caused these various sounds.",
            "His mother’s explanations, more lively and graphic, impressed the boy with greater force; but sometimes this impression would be too painful.",
            "Upon the features of the young woman, herself suffering, could be read the expression of her inmost feelings, and in her eyes a silent protest or a look of pain, as she strove to convey to the child an idea of form and color."
        ],
        coverImage: Image3
    },
    {
        id: 1,
        title: 'Cultural',
        subtitle: 'Contemporary makeup art',
        content: [
            "Thus blindness proved no drawback to systematic physical development, while its influence over the moral nature of the child was reduced to its minimum. He was tall for his age and well built; his face was somewhat pale, his features fine and expressive.",
            "His dark hair enhanced the pallid hue of his complexion, while his eyes—large, dark, and almost motionless—gave him a peculiar aspect that at once attracted attention.",
            "A slight wrinkle between his eye-brows, a habit of inclining his head slightly forward, and the expression of sadness that[93] sometimes overcast his handsome face — these were the outward tokens of his blindness."
        ],
        coverImage: Image15
    },
    {
        id: 2,
        title: 'Lectures',
        subtitle: 'Adventures in Moscow',
        content: [
            "The impressions received through the channels of sound outweighed all others in their influence over the life of the blind boy; his ideas shaped themselves according to sounds, his sense of hearing became the centre of his mental activity.",
            "The enchanting melodies of the songs he heard conveyed to him a true sense of the words, coloring them with sadness or joy according to the lights and shades of the melody.",
            "He quickly learned all his mother taught him on the piano, and yet he still loved Joachim’s pipe."
        ],
        coverImage: Image8
    },
    {
        id: 3,
        title: 'Workshops',
        subtitle: 'Vogue Paris',
        content: [
            "Thus the boy’s day was filled; he could not complain of the lack of new impressions.",
            "He seemed to be living as full a life as any child could possibly live; in fact he really seemed unconscious of his blindness.",
            "Nevertheless, a certain premature sadness was still perceptible in his character, which Maxim ascribed to the fact that he had never mingled with other children, and endeavored to atone for this omission."
        ],
        coverImage: Image4
    }
];

const imageColumns = [
    {
        id: 0,
        isBottom: false,
        images: [
            Image2,
            Image6,
            Image13,
            Image14,
            Image5,
            Image6,
            Image7,
            Image8,
            Image9
        ]
    },
    {
        id: 1,
        isBottom: true,
        images: [
            Image3,
            Image11,
            Image1,
            Image15,
            Image14,
            Image13,
            Image12,
            Image3,
            Image15
        ]
    },
    {
        id: 2,
        isBottom: false,
        images: [
            Image7,
            Image4,
            Image9,
            Image11,
            Image5,
            Image3,
            Image2,
            Image1,
            Image5,
            Image14
        ]
    },
    {
        id: 3,
        isBottom: true,
        images: [
            Image1,
            Image2,
            Image3,
            Image7,
            Image4,
            Image6,
            Image5,
            Image8,
            Image10,
        ]
    }
];

class Events extends Component {
    constructor(props) {
        super(props);

        this.dummyItem = 0;

        this.contentFirstRef = React.createRef();
        this.contentSecondRef = React.createRef();
        this.contentMoveRef = React.createRef();
        this.columnWrapperRef = React.createRef();

        this.state = {
            windowSize: {
                width: 0,
                height: 0,
            },
            activeTilt: {
                columns: true,
                letters: true,
            },
            selectedItem: -1,
            isAnimating: false,
        };
    }

    componentDidMount() {
        this.calcWindowSize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevState.isAnimating, this.state.isAnimating) &&
            this.state.isAnimating) {
            if (this.state.selectedItem >= 0) {
                this._startOpenAnimation();
            } else {
                this._startCloseAnimation();
            }
        }
    }

    _startOpenAnimation = () => {
        console.log('Events : _startOpenAnimation');

        const duration = 1.2;
        const ease = new Ease(BezierEasing(1, 0, 0.735, 0.775));
        const columnsStagger = 0;

        const columnsTotal = 4;

        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        })  // Animate columns out
            .to(this.columnWrapperRef.current, duration, {
                ease: ease,
                rotation: -2
            }, 0)

            // Animate content.first and contentMove (unreveal effect: both move in different directions)
            .to(this.contentFirstRef.current, duration * 0.8, {
                ease: Expo.easeOut,
                y: '100%'
            }, duration + duration * columnsStagger * columnsTotal)
            .to(this.contentMoveRef.current, duration * 0.8, {
                ease: Expo.easeOut,
                y: '-100%'
            }, duration + duration * columnsStagger * columnsTotal)
    };

    _startCloseAnimation = () => {
        console.log('Events : _startCloseAnimation');

        const duration = 1;
        const ease = Sine.easeOut;

        new TimelineMax({
            onComplete: () => this.setState({isAnimating: false}),
        })  // Animate content.first and contentMove (unreveal effect: both move in different directions)
            .to([this.contentFirstRef.current, this.contentMoveRef.current], duration * 0.6, {
                ease: new Ease(BezierEasing(0.775, 0.05, 0.87, 0.465)),
                y: '0%',
            }, 0.2)

            // Animate columns in
            .to(this.columnWrapperRef.current, duration, {
                ease: ease,
                rotation: 0
            }, duration * 0.6)
    };

    calcWindowSize = () => {
        this.setState({
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    };

    openItem = (item) => {
        this.setState({
            selectedItem: item.id,
            isAnimating: true,
            activeTilt: {
                columns: false,
                letters: false,
            },
        })
    };

    closeItem = () => {
        this.setState({
            selectedItem: -1,
            isAnimating: true,
            activeTilt: {
                columns: true,
                letters: true,
            },
        })
    };

    render() {
        const {selectedItem, activeTilt} = this.state;

        this.dummyItem = selectedItem < 0 ? this.dummyItem : selectedItem;

        return (
            <div>
                <main>
                    <div className="content content--second"
                         ref={this.contentSecondRef}>
                        {<ContentItem item={eventItems[this.dummyItem]}
                                      selectedItem={this.dummyItem}
                                      onBackPress={this.closeItem}/>
                        }
                    </div>
                    <div className="content content--first"
                         ref={this.contentFirstRef}>
                        <div className="content__move"
                             ref={this.contentMoveRef}>
                            <div className="columns"
                                 ref={this.columnWrapperRef}>
                                {imageColumns.map(column => (
                                    <Column column={column}
                                            key={column.id}
                                            selectedItem={selectedItem}
                                            activeTilt={activeTilt}/>
                                ))}
                            </div>
                            <Menu items={eventItems}
                                  selectedItem={selectedItem}
                                  activeTilt={activeTilt}
                                  onItemSelect={this.openItem}/>
                        </div>
                    </div>
                </main>
                <Cursor/>
            </div>
        );
    }
}

export default Events;