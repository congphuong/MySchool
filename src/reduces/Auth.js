import { LOGIN, LOGOUT } from '../actions/Types';

const INITIAL = {
    loggedIn: false,
    user: null,
    hostname: 'http://localhost:8080'
};

export default (state = INITIAL, action) => {
    switch (action.type) {
        case LOGIN:
            return { loggedIn: true, user: action.payload, hostname: 'http://localhost:8080'};
        case LOGOUT:
            return INITIAL;
        default:
            return state;
    }
};
