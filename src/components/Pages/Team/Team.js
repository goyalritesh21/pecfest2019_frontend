import React, {Component} from 'react';
import {faculty, convenors, pecfestTeam, coco} from '../../../data/PecfestTeam';
import {getBackgroundImage} from "../../../utils/BackgroundUtils";
import moment from "moment";
import TextBox from "../../common/TextBox";
import TeamCard from '../../common/TeamCard';
import _ from 'lodash';


export default class Team extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: "hidden",
            loaded: false
        }
    }
    componentDidMount() {
        document.body.style.backgroundImage = `url(${getBackgroundImage(
            moment().hour()
        )})`;
    }

    _onLoad() {
        this.setState(() => ({loaded: true}))
    }

    render() {
        return (
            <div id="parent_">
                <TextBox text={"TEAM"} large={true}/>
                {
                    _.chunk(faculty, 3).map((group, index) => (
                        <div id={`cards${index}`} key={index} className="Team__mycontainer">
                            {
                                group.map(({post, name, email, photo}, index2) => (
                                    <TeamCard
                                        key={index2}
                                        dataImage={photo}
                                        header={post}
                                        name={name}
                                        email={email}
                                    />
                                ))
                            }
                        </div>
                    ))
                }
                <div className="Team__mycontainer">
                {
                    convenors.map(({post, name, email, photo}, index)=>(
                        <TeamCard
                            dataImage={photo}
                            header={post}
                            name={name}
                            email={email}
                        />
                    ))
                }
                </div>
                {
                    pecfestTeam.map(({committee, members}, index) => (
                        <div id={`cards${index}`} key={index} className="Team__mycontainer">
                            {
                                members.map(({name, email, photo}, index2) => (
                                    <TeamCard
                                        key={index2}
                                        dataImage={photo}
                                        header={committee}
                                        name={name}
                                        email={email}
                                    />
                                ))
                            }
                        </div>
                    ))
                }

            </div>
        )
    }
}