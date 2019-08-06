import React, {Component} from 'react';

export default class Swipeable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startX: 0,
            startY: 0,
        };
    }

    handleTouchStart = event => {
        const touches = event.touches;

        this.setState({
            startX: touches[0].clientX,
            startY: touches[0].clientY,
            currentX: touches[0].clientX,
            currentY: touches[0].clientY
        });
    };

    handleTouchMove = event => {
        const touches = event.touches;
        this.setState({currentX: touches[0].clientX, currentY: touches[0].clientY});
        return this.props.onSwiping && this.props.onSwiping(touches[0].clientX, touches[0].clientY);
    };

    handleTouchEnd = event => {
        const threshold = this.props.threshold || 50;
        if (this.props.onSwipe) {
            const diffX = this.state.startX - this.state.currentX;
            const diffY = this.state.startY - this.state.currentY;
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > threshold) {
                    this.props.onSwipe('left');
                } else if (diffX < -threshold) {
                    this.props.onSwipe('right');
                } else if (this.props.onCancel) {
                    this.props.onCancel();
                }
            } else if (Math.abs(diffY) > Math.abs(diffX)) {
                if (diffY > threshold) {
                    this.props.onSwipe('up');
                } else if (diffY < -threshold) {
                    this.props.onSwipe('down');
                } else if (this.props.onCancel) {
                    this.props.onCancel();
                }
            } else {
                if (this.props.onCancel)
                    this.props.onCancel();
            }
        }
    };

    handleKeyUp = event => {

    };

    handleScroll = ({target}) => {
        console.log(target);
    };

    render() {
        return (
            <div {...this.props}
                 onTouchStart={this.handleTouchStart}
                 onTouchEnd={this.handleTouchEnd}
                 onTouchMove={this.handleTouchMove}
                 onKeyPress={this.handleKeyUp}
                 onScroll={this.handleScroll}
            >
                {this.props.children}
            </div>
        )
    }
}
