import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Notifications from '../screens/Notifications';
import NewNotification from '../screens/NewNotification';

const TabNotif = StackNavigator({
    NotifScreen: {
        screen: Notifications,
        navigationOptions: {
            tabBarLabel: 'Notification',
            tabBarIcon: ({ tintColor }) =>
                <Image
                    source={require('../img/Notif_Black.png')}
                    style={[styles.icon, { tintColor }]}
                />,
        }
    },
    NewNotification: {
        screen: NewNotification,
        navigationOptions: {
            tabBarLabel: 'Notification',
            tabBarIcon: ({ tintColor }) =>
                <Image
                    source={require('../img/Notif_Black.png')}
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
export default TabNotif;
