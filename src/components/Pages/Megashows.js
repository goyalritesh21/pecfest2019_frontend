import React, {Component} from 'react';
import {spring, TransitionMotion} from 'react-motion';
import MegaShow from './MegaShow';
import Swipeable from '../../components/common/Swipeable'
import Slide from '../../components/common/Slide'
import megaShowList from '../megashows/megashow_list'

class MegaShows extends Component {
    constructor(props) {
        super(props);
        this.megaShowRef = {};

        this.state = {
            activeIndex: 0,
        }
    }

    handlePrev = () => {
        this.setState((state, props) => {
            return {activeIndex: (megaShowList.length + state.activeIndex - 1) % megaShowList.length};
        });
    };

    handleNext = () => {
        this.setState((state, props) => {
            return {activeIndex: (state.activeIndex + 1) % megaShowList.length};
        });
    };

    handleSwipe = (direction) => {
        if (direction === 'left') {
            this.handlePrev();
        } else if (direction === 'right') {
            this.handleNext();
        }
    };

    render() {
        const {activeIndex} = this.state;

        return (
            <TransitionMotion willEnter={this.willEnter}
                              willLeave={this.willLeave}
                              defaultStyles={[{
                                  key: activeIndex,
                                  style: {
                                      x: -100
                                  }
                              }]}
                              styles={[{
                                  key: activeIndex,
                                  style: {
                                      x: spring(0)
                                  }
                              }]}>
                {styles => (
                    <Swipeable className="MegaShows"
                               onSwipe={this.handleSwipe}>
                        {
                            styles.map(style => (
                                <Slide key={style.key}
                                       style={style.style}
                                       onNext={this.handleNext}
                                       onPrev={this.handlePrev}
                                       current={parseInt(style.key)}>
                                    <MegaShow show={megaShowList[activeIndex]}/>
                                </Slide>
                            ))
                        }
                    </Swipeable>
                )}
            </TransitionMotion>
        );
    }
}

export default MegaShows;