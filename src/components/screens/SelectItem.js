/**
 * Created by congphuong on 6/21/17.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from './checkbox/Checkbox';

export default class SelectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.selected
        };
    }

    render() {
        const {wrapter, name, cmt, title, subline} = styles;
        return (
            <TouchableOpacity style={wrapter} onPress={this.props.onpress}>
                <CheckBox
                    checked={this.state.checked}
                    onChange={(checked) => {
                        this.props.onPressItem(this.props.username);
                    }}
                />
                <View style={{marginLeft: 10}} >
                    <Text style={title}> {this.props.title} </Text>
                    <View style={subline}>
                        <Text style={name}> {this.props.username} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


}

const styles = StyleSheet.create(
    {
        wrapter: {
            padding: 10,
            flexDirection:'row',
            alignItems: 'center',
        },
        title: {
            fontSize: 14,
        },
        subline: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

        },
        name: {fontSize: 10,},
        cmt: {}
    }
);
