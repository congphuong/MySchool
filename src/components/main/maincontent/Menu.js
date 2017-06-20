import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Menu extends Component {
    render() {
        return (
            <View style={style.Content} >
                <Text> Menu Content </Text>
            </View>
        );
    }
}

const style = StyleSheet.create(
    {
        Content: {
            flex: 1,
            backgroundColor: '#85A69C'
        }
    }
);
