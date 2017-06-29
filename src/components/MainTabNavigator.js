import { } from 'react-native';
import { TabNavigator } from 'react-navigation';
import {connect} from 'react-redux';
import TabHome from './navigations/TabHome';
import TabGroup from './navigations/TabGroup';
import TabNotif from './navigations/TabNotif';

const MainTabNavigator = TabNavigator({
    Home: { screen: TabHome },
    Group: { screen: TabGroup },
    Notif: { screen: TabNotif },
}, {
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            showIcon: true,
            style: {
                backgroundColor: 'white',
            },
            tabStyle: {
                
            },
            labelStyle: {
                fontSize: 12,
                margin: 0
            },
            indicatorStyle: {
                backgroundColor: 'white',
                height: 0,
            },
            upperCaseLabel: false,
        },
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false
    });

export default MainTabNavigator;

