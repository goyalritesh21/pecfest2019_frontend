import { combineReducers } from "redux";
import errors from './errors';
import messages from './messages';
import auth from './auth';
import events from './events';
import individualEvent from './individualEvent';
export default combineReducers({
    errors,
    messages,
    auth,
    events,
    individualEvent
});