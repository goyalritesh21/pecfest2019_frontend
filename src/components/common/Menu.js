import React, {Component} from 'react';
import MenuItem from "./MenuItem";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.menuRef = React.createRef();
    }

    render() {
        const {items, activeTilt, selectedItem, onItemSelect} = this.props;

        return (
            <nav className="menu"
                 ref={this.menuRef}>
                {items.map(item => (
                    <MenuItem key={item.id}
                              item={item}
                              onItemSelect={onItemSelect}
                              selectedItem={selectedItem}
                              activeTilt={activeTilt}/>
                ))}
            </nav>
        );
    }
}

export default Menu;