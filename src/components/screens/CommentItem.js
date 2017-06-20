import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class CommentItem extends Component {
    render() {
        const { wrapter, cmt, title, subline } = styles;
        return (
            <TouchableOpacity style={wrapter} >
                <Text style={title} > {this.props.userName} </Text>
                <Text style={cmt}> {this.props.cmt}</Text>
                <View style={subline} >
                    <Text style={cmt}> 22:23 - 24/4 </Text>
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
