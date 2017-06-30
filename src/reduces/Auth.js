import { LOGIN, LOGOUT, UPDATE } from '../actions/Types';

const INITIAL = {
    loggedIn: false,
    user: null,
    hostname: 'http://192.168.42.72:8080'
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case LOGIN:
            return { loggedIn: true, user: action.payload, hostname: 'http://192.168.42.72:8080'};
        case LOGOUT:
            return INITIAL;
        case UPDATE:
            return {...state, selectedStudent: action.payload};
        default:
            return state;
    }
};
