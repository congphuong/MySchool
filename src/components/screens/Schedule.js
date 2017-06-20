import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DrawerButton from './DrawerButton';
import TabContent from './ScheduleTabContent';

export default class Schedule extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Schedule',
        headerLeft: <DrawerButton navigation={navigation} />,
        headerStyle: { elevation: 0 }
    });
    render() {
        return (
            <ScheduleTab />
        );
    }
}

const ScheduleTab = TabNavigator({
    Thu2: {
        screen: props => <TabContent {...props} day={2} />,
        navigationOptions: {
            tabBarLabel: 'Thứ 2',
        }
    },
    Thu3: {
        screen: props => <TabContent {...props} day={3} />,
        navigationOptions: {
            tabBarLabel: 'Thứ 3',
        }
    },
    Thu4: {
        screen: props => <TabContent {...props} day={4} />,
        navigationOptions: {
            tabBarLabel: 'Thứ 4',
        }
    },
    Thu5: {
        screen: props => <TabContent {...props} day={5} />,
        navigationOptions: {
            tabBarLabel: 'Thứ 5',
        }
    },
    Thu6: {
        screen: props => <TabContent {...props} day={6} />,
        navigationOptions: {
            tabBarLabel: 'Thứ 6',
        }
    },
    Thu7: {
        screen: props => <TabContent {...props} day={7} />,
        navigationOptions: {
            tabBarLabel: 'Thứ 7',
        }
    },
}, {
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
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
                backgroundColor: 'black',
                height: 1,
            },
            upperCaseLabel: false,
        },
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true
    });


const style = StyleSheet.create(
    {
        wrapter: {
            flex: 1,
            backgroundColor: '#FFFFFF'
        }
    }
);
