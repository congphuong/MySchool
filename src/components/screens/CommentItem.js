import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class CommentItem extends Component {
    render() {
        const { wrapter, cmt, title, subline } = styles;
        const date = new Date(this.props.time);
        return (
            <TouchableOpacity style={wrapter} >
                <Text style={title} > {this.props.userName} </Text>
                <Text style={cmt}> {this.props.cmt}</Text>
                <View style={subline} >
                    <Text style={cmt}> {date.getHours() + ':' + date.getMinutes() + '  ' + date.getDate() + '-' + date.getMonth()} </Text>
                </View>
            </TouchableOpacity>
        );
    }  
}

const styles = StyleSheet.create(
    {
        wrapter: {
            padding: 10
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        subline: {
            flexDirection: 'row'
        },
        name: {
            
        },
        cmt: {
            
        }
    }
);
