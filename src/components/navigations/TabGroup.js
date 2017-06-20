import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Group from '../screens/Group';
import NewTopic from '../screens/NewTopic';

const TabGroup = StackNavigator({
    GroupScreen: {
        screen: Group,
        navigationOptions: {
            tabBarLabel: 'Group',
            tabBarIcon: ({ tintColor }) =>
                <Image
                    source={require('../img/Group_Black.png')}
                    style={[styles.icon, { tintColor }]}
                />,
        }
    },
    NewTopic: {
        screen: NewTopic,
        navigationOptions: {
            tabBarLabel: 'Group',
            tabBarIcon: ({ tintColor }) =>
                <Image
                    source={require('../img/Group_Black.png')}
                    style={[styles.icon, { tintColor }]}
                />,
        }
    },
});
const styles = {
    icon: {
        width: 24,
        height: 24
    }
};
export default TabGroup;
