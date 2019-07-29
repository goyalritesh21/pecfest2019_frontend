import React, {Component} from 'react';
import Category from '../events/Category';
import EventInfo from '../events/EventInfo';
import { categories } from '../../data/events';


class Events extends Component {

    render() {
        return (
            <div className={"row overlay-2"}>
                {
                 categories.map(({id, name}, index) => (
                <Category key={index} category={name} id={id}/>
                 ))
                 }
                
    
                {/* <EventInfo startDate={new Date(2019, 5, 11)} name="hello"/> */}
            </div>
        );
    }
}

export default Events;