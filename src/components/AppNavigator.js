import { StackNavigator } from 'react-navigation';
import Login from './screens/Login';
import AppDrawer from './AppDrawer';
import GroupView from './screens/GroupView';

const AppNavigator = StackNavigator({
  Login1: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen: AppDrawer,
    navigationOptions: {
      header: null
    }
  },
  Comment: { screen: GroupView }
}, {
    headerMode: 'float',
  });

export default AppNavigator;

