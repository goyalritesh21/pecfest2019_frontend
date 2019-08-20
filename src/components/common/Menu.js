import React, {Component} from 'react';
import MenuItem from "./MenuItem";
import _ from "lodash";
import {ANIMATION_STATE} from "../../utils/Utils";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: -1,
            animationState: {}
        };

        this.menuRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!_.isEqual(prevProps.items, this.props.items)) {
            const animationState = {};
            this.props.items.forEach(item => {
                animationState[item.id] = ANIMATION_STATE['NO_OPS'];
            });
            this.setState({animationState: animationState});
        }

        if (!_.isEqual(prevProps.animationState, this.props.animationState)) {
            const animationState = {};
            this.props.items.forEach(item => {
                animationState[item.id] = this.props.animationState;
            });
            this.setState({animationState: animationState});
        }
    }

    render() {
        const {selectedItem, animationState} = this.state;
        const {items, activeTilt, onItemSelect, onAnimationComplete} = this.props;

        return (
            <nav className="Events-menu"
                 ref={this.menuRef}>
                {items.map(item => (
                    <MenuItem key={item.id}
                              item={item}
                              animationState={animationState[item.id]}
                              isSelected={_.isEqual(selectedItem, item.id)}
                              onItemSelect={(item) => {
                                  this.setState({
                                      selectedItem: item.id
                                  });
                                  onItemSelect(item);
                              }}
                              onAnimationComplete={() => {
                                  const tmp = animationState;
                                  tmp[item.id] = ANIMATION_STATE['NO_OPS'];
                                  this.setState({
                                      animationState: tmp,
                                  });

                                  if (_.every(Object.keys(tmp), id => {
                                      return _.isEqual(tmp[id], ANIMATION_STATE['NO_OPS']);
                                  })) {
                                      onAnimationComplete(this.props.animationState);
                                  }
                              }}
                              activeTilt={activeTilt}/>
                ))}
            </nav>
        );
    }
}

export default Menu;