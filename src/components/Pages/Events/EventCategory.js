import React, {Component} from 'react';

class EventCategory extends Component {

    render() {
        const {onClick, name, isSelected} = this.props;

        const className_ = isSelected ? 'grid__item underline' : 'grid__item';

        return (
            <div
                className={className_}
                onClick={onClick}
            >
                {name.toUpperCase()}
            </div>
        );
    }
}

export default EventCategory;