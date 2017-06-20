import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DrawerButton from './DrawerButton';

export default class Score extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Score',
        headerLeft: <DrawerButton navigation={navigation} />,
    });
    render() {
        return (
            <View style={style.wrapter} />
        );
    }
}

const style = StyleSheet.create(
    {
        wrapter: {
            flex: 1,
            backgroundColor: '#FFFFFF'
        }
    }
);
