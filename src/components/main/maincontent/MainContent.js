import React, { Component } from 'react';
import { Image, StyleSheet, View, ToolbarAndroid } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './home/Home';
import Group from './group/Group';
import Notifications from './notif/Notifications';

export default class MainContent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }
    openMenu() {
        const { open } = this.props;
        open();
    }
    render() {
        return (
            <View style={style.content}>
                <ToolbarAndroid
                    title="My School"
                    navIcon={require('./img/Menu.png')}
                    onIconClicked={() => { this.openMenu(); }}
                    style={style.toolbar}
                />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        renderIcon={() => <Image source={require('./img/Home_Gray.png')} style={style.icon} />}
                        renderSelectedIcon={() => <Image source={require('./img/Home_Black.png')} style={style.icon} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}
                    >
                        <Home />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'group'}
                        title="Group"
                        renderIcon={() => <Image source={require('./img/Group_Gray.png')} style={style.icon} />}
                        renderSelectedIcon={() => <Image source={require('./img/Group_Black.png')} style={style.icon} />}
                        onPress={() => this.setState({ selectedTab: 'group' })}
                    >
                        <Group />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'notif'}
                        title="Notification"
                        renderIcon={() => <Image source={require('./img/Notif_Gray.png')} style={style.icon} />}
                        renderSelectedIcon={() => <Image source={require('./img/Notif_Black.png')} style={style.icon} />}
                        badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'notif' })}
                    >
                        <Notifications />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}
const style = StyleSheet.create(
    {
        icon: {
            width: 22,
            height: 22
        },
        content: {
            flex: 1
        },
        toolbar: {
            height: 56
        }
    }
);


