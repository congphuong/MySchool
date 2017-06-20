import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class HomeCheduleItem extends Component {
    render() {
        return (
            <View>
                <Text style={styles.wrapter}> text </Text>
                <TouchableOpacity>
                    <Text> text </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        wrapter: {
            flexDirection: 'column',
            flex: 1,
        },

    }
);
