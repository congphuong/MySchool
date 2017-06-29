/**
 * Created by congphuong on 6/24/17.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Avatar extends Component {
    shortName = () => {
        shortName = '';
        if (this.props.name) {
            const name = this.props.name.trim().split(' ');
            name.length === 1 ? shortName = name[0].toString().charAt(0) : shortName = name[name.length - 2].toString().charAt(0).toUpperCase() + name[name.length - 1].toString().charAt(0).toUpperCase();
        }
        return (shortName);
    }

    render() {

        return (
            <View style={styles.wrapter}>
                <Text style={styles.text}>{this.shortName()}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapter: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});