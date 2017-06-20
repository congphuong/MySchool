import { combineReducers } from 'redux';

import Auth from './Auth';
import Navigation from './Navigation';

export default combineReducers({
    auth: Auth,
    nav: Navigation
});
