import React from 'react';
import { } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import ExamSchedule from './navigations/ExamSchedule';
import Schedule from './navigations/Schedule';
import Score from './navigations/Score';
import MainTabNavigator from './MainTabNavigator';
import DrawerContent from './DrawerContent';

const AppDrawer = DrawerNavigator({
    MainTabNavigator: {
        screen: MainTabNavigator,
        navigationOptions: {
            title: 'Home',
        }
    },
    Schedule: {
        screen: Schedule,
    },
    ExamSchedule: {
        screen: ExamSchedule,
    },
    Score: {
        screen: Score,
    },
}, {
        contentOptions: {
            activeTintColor: '#e91e63',
            style: { paddingTop: 16 }
        },
        contentComponent: props => <DrawerContent menu={props} />
    });

export default AppDrawer;
