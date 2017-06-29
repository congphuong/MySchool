/**
 * Created by congphuong on 6/29/17.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';

export default class ScoreItem extends Component {
    render() {
        const {wrapter, name, cmt, title, subline} = styles;
        return (
            <View style={wrapter}>
                <Text>{this.props.item.nameSubject}</Text>
                <Text>Miệng: {this.props.item.mieng}</Text>
                <Text>15 phút: {this.props.item.mlphut}</Text>
                <Text>1 tiết: {this.props.item.mtiet}</Text>
                <Text>Cuối kỳ: {this.props.item.cuoiky}</Text>
                <Text>Tổng kết: {this.props.item.tongket}</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create(
    {
        wrapter: {
            padding: 10
        },
        title: {
            fontSize: 14,
            marginBottom: 5,
            fontWeight: 'bold'
        },
        subline: {
            flexDirection: 'row',
            marginBottom: 10
        },
        name: {
            fontSize: 14,
            fontWeight: 'bold'
        },
        cmt: {
            fontSize: 12,
        }
    }
);
