import { CREATE_MESSAGE } from '../actions/types';

const initialState = {
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload);
        default:
            return state;
    }
}