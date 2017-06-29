import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from './Avatar';

export default class CommentItem extends Component {
    render() {
        const { wrapter, cmt, title, subline, name } = styles;
        const date = new Date(this.props.time);
        return (
                <View style={wrapter}>
                    <Avatar name={this.props.userName}/>
                    <View style={{flex:1, padding:10, paddingTop:2}}>
                    <Text style={cmt}><Text style={name} >{this.props.userName} </Text> {this.props.cmt}</Text>
                    <View style={subline} >
                        <Text style={cmt}>{date.getHours() + ':' + date.getMinutes() + '  ' + date.getDate() + '-' + date.getMonth()} </Text>
                    </View>
                    </View>
                </View>
        );
    }  
}

const styles = StyleSheet.create(
    {
        wrapter: {
            padding: 10,
            flexDirection:'row'
        },
        title: {
            fontSize: 14,
        },
        subline: {
            flexDirection: 'row',
             marginTop: 5
        },
        name: {
            fontWeight:'bold'
        },
        cmt: {
            fontSize: 14,
        }
    }
);
