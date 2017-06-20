import React from 'react';
import { Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';

const TabHome = StackNavigator({
    HomeScreen: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) =>
                <Image
                    source={require('../img/Home_Black.png')}
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
export default TabHome;
