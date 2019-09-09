import {combineReducers} from "redux";
import errors from './errors';
import messages from './messages';
import auth from './auth';
import home from './home';
import events from './events';
import event from './event';
import loaders from './loaders';

export default combineReducers({
    errors,
    messages,
    auth,
    home,
    events,
    event,
    loaders
});