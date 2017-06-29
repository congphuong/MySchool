import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from './Avatar';

export default class TopicItem extends Component {
    render() {
        const {wrapter, name, cmt, title, subline} = styles;
        let date = new Date(this.props.time);
        return (
            <TouchableOpacity style={wrapter} onPress={this.props.onpress}>
                <View style={styles.subline}>
                    <Avatar name={this.props.name}/>
                    <View style={{marginLeft:5, paddingTop:4}}>
                        <Text style={name}> {this.props.name} </Text>
                        <Text
                            style={cmt}> {date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' ' + date.getDate() + '/' + date.getMonth()} </Text>
                    </View>
                </View>

                <Text style={title}>{this.props.title} </Text>
                <Text style={{fontSize:12}} numberOfLines={5} >{this.props.content}</Text>
                <View style={[{justifyContent:'space-between', marginTop:5, alignItems:'flex-end'}]}>
                    <Text style={cmt}> {this.props.cmtCount} comment </Text>
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
