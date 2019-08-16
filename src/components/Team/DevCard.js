import React, {Component} from 'react';
import PropTypes from "prop-types"

class DevCard extends Component {
    render() {
        const style = {
            backgroundImage: `url(${this.props.member.photo})`,
            borderRadius: '5px',
            height: '350px',
        };

        if (this.props.member.color) {
            style.boxShadow = `0 10px 30px ${this.props.member.color}`;
        } else {
            style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.2)`
        }

        return (
            <div className="DevTeam-ProfileCard">
                <div className="DevTeam-ProfileCard-photo"
                     style={{style}}/>
                <div className="DevTeam-ProfileCard-details">
                    <div className="DevTeam-Name">
                        {this.props.member.name}
                    </div>
                    <div className="DevTeam-Desc">
                        <small>{this.props.member.work}</small>
                    </div>
                </div>
            </div>
        )
    }
}

DevCard.propTypes = {
    member: PropTypes.object.isRequired,
};

export default DevCard;