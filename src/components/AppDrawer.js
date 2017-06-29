import React from 'react';
import { Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import ExamSchedule from './navigations/ExamSchedule';
import Schedule from './navigations/Schedule';
import Score from './navigations/Score';
import MainTabNavigator from './MainTabNavigator';
import DrawerContent from './DrawerContent';

const AppDrawer = DrawerNavigator({
    MainTabNavigator: {
        screen: MainTabNavigator ,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('./img/home_icon.png')}
                    style={[{tintColor: tintColor}]}
                />
            ),
        }
    },
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            title: 'Schedule',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('./img/calendar.png')}
                    style={[{tintColor: tintColor}]}
                />
            ),
        }
    },
    ExamSchedule: {
        screen: ExamSchedule,
        navigationOptions: {
            title: 'ExamSchedule',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('./img/clock.png')}
                    style={[{tintColor: tintColor}]}
                />
            ),
        }
    },
    Score: {
        screen: Score,
        navigationOptions: {
            title: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('./img/score_icon.png')}
                    style={[{tintColor: tintColor}]}
                />
            ),
        }
    },
}, {
        contentOptions: {
            activeTintColor: '#e91e63',
            style: { paddingTop: 16 }
        },
        contentComponent: props => <DrawerContent menu={props} />
    });

export default AppDrawer;
