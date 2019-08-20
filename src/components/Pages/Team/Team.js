import React, {Component} from 'react';
import Ritesh from "../../../images/DevTeam/Ritesh.jpg";
import anime from 'animejs';

export default class Team extends Component {

    componentDidMount() {

        let em = document.getElementsByClassName("email");
        let phone = document.getElementsByClassName("phone");
        for (let i of em) {
            let txt = i.innerHTML;
            i.innerHTML = "<a href='mailto:" + txt + "' title='" + txt + "'>" + txt + "</a>";
        }
        for (let i of phone) {
            let txt = i.innerHTML;
            i.innerHTML = "<a href='tel:+91" + txt + "' title='+91-" + txt + "'>+91-" + txt + "</a>";
        }
        const timeline = anime.timeline();
        timeline.add({
            targets: '.Team-Header, .Team-designation, .Team-col, .Team-name, .Team-email, .Team-phone',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: (el, i, l) => i * 200
        });

        this.restore = document.body.style.overflow;
        document.body.style.overflow = 'auto';

    }

    componentWillUnmount() {
        document.body.style.overflow = this.restore;

    }

    render() {
        return (
            <div id="parent_">
                <div className="Team-header">
                    <h1>Team</h1>
                </div>
                <div className="row Team-heading">
                    <div className="Team-col">
                        <div className="Team-designation">Convenor</div>
                        <div className="Team-card" style={{backgroundImage: `url(${Ritesh})`}}>
                            <div className="Team-card_inner">
                                <div className="Team-pad"/>
                                <div className="Team-card_content_top"/>
                                <div className="Team-card_content_bottom">
                                    <div className="Team-name">Ritesh Goyal</div>
                                    <div className="Team-email">ritesh.goyal@pecfest.in</div>
                                    <div className="Team-phone">9888019027</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Team-col">
                        <div className="Team-designation">Convenor</div>
                        <div className="Team-card" style={{backgroundImage: `url(${Ritesh})`}}>
                            <div className="Team-card_inner">
                                <div className="Team-pad"/>
                                <div className="Team-card_content_top"/>
                                <div className="Team-card_content_bottom">
                                    <div className="Team-name">Ritesh Goyal</div>
                                    <div className="Team-email">ritesh.goyal@pecfest.in</div>
                                    <div className="Team-phone">9888019027</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}