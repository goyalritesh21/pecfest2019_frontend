import React, { Component } from 'react';
import Ritesh from "../../images/DevTeam/Ritesh.jpg";

export default class Team extends Component {

    componentDidMount() {

        let em = document.getElementsByClassName("email");
        let phone = document.getElementsByClassName("phone");
        for (let i of em) {
            let txt = i.innerHTML;
            i.innerHTML = "<a href='mailto:" + txt + "' title='" + txt + "'>" + txt + "</a>";
            // console.log(i.innerHTML);
        }
        for (let i of phone) {
            let txt = i.innerHTML;
            i.innerHTML = "<a href='tel:+91" + txt + "' title='+91-" + txt + "'>+91-" + txt + "</a>";
        }

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
                <div className="row heading">
                    <div className="col">
                        <div className="designation">Convenor</div>
                        <div className="Team-card" style={{ backgroundImage: `url(${Ritesh})` }}>
                            <div className="card_inner">
                                <div className="pad"></div>
                                <div className="card_content_top"></div>
                                <div className="card_content_bottom">
                                    <div className="name">Ritesh Goyal</div>
                                    <div className="email">ritesh.goyal@pecfest.in</div>
                                    <div className="phone">9888019027</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="designation">Convenor</div>
                        <div className="Team-card" style={{ backgroundImage: `url(${Ritesh})` }}>
                            <div className="card_inner">
                                <div className="pad"></div>
                                <div className="card_content_top"></div>
                                <div className="card_content_bottom">
                                    <div className="name">Ritesh Goyal</div>
                                    <div className="email">ritesh.goyal@pecfest.in</div>
                                    <div className="phone">9888019027</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}