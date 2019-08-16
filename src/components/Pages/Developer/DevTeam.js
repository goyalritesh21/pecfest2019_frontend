import React, {Component} from 'react';
import anime from 'animejs';
import DevCard from '../../common/DevCard';
import {DevTeam} from '../../../data/DevTeam';

export default class Team extends Component {
    componentWillUnmount() {
        document.body.style.overflow = this.restore;
    }

    componentDidMount() {
        const timeline = anime.timeline();
        timeline.add({
            targets: '.DevTeam-Header, .DevTeam-Divider, .DevTeam-Divider DevTeam-small, .DevTeam-ProfileCard, .DevTeam-ProfileCard-photo, .DevTeam-ProfileCard-details',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: (el, i, l) => i * 200
        });
        this.restore = document.body.style.overflow;
        document.body.style.overflow = 'auto';
    }

    render() {
        return (
            <div className="DevTeam-Team">
                <div className="DevTeam-Header">
                    <h1>Team behind PECFEST website</h1>
                    <div className="DevTeam-DevDivider"/>
                </div>
                <div className="DevTeam-DevApp">
                    {DevTeam.map(member => (
                        <DevCard member={member} key={member.id}/>
                    ))}
                </div>

            </div>
        )
    }
}