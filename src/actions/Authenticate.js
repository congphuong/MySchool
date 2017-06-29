import { NavigationActions } from 'react-navigation';
import { LOGIN, LOGOUT, UPDATE} from './Types';

export const loginSuccess = (user) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN,
            payload: user
        });
        const resetNavigator = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Main',
                })
            ],
        });
        dispatch(resetNavigator);
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
        });
        const navigateAction = NavigationActions.navigate({ routeName: 'Login1' });
        dispatch(navigateAction);
        const resetNavigator = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Login1',
                })
            ],
        });
        dispatch(resetNavigator);
    };
};

export const update = (user) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE,
            payload: user
        });
    };
};
