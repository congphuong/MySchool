import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class TopicItem extends Component {
    render() {
        const { wrapter, name, cmt, title, subline } = styles;
        return (
            <TouchableOpacity style={wrapter} onPress={this.props.onpress} >
                <Text style={title} > {this.props.title} </Text>
                <View style={subline} >
                    <Text style={name}> {this.props.name} </Text>
                    <Text style={cmt}> 22:23 - 24/4 </Text>
                    <Text style={cmt}> 10 cmt </Text>
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
