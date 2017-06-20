import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Timeline from 'react-native-timeline-listview';


export default class ScheduleTabContent extends Component {
    constructor() {
        super();
        this.data = [
            { time: 'tiết 1', title: 'Toan', description: 'Event 1 Description' },
            { time: 'tiết 2', title: 'Event 2', description: 'Event 2 Description' },
            { time: 'tiết 3', title: 'Vat Li', description: 'Event 3 Description' },
            { time: 'tiết 4', title: 'Van', description: 'Event 4 Description' },
            { time: 'tiết 5', title: 'Sinh hoc', description: 'Event 5 Description' },
            { time: 'tiết 6', title: 'Event 1', description: 'Event 1 Description' },
            { time: 'tiết 7', title: 'Event 2', description: 'Event 2 Description' },
            { time: 'tiết 8', title: 'Event 3', description: 'Event 3 Description' },
            { time: 'tiết 9', title: 'Event 4', description: 'Event 4 Description' },
            { time: 'tiết 10', title: 'Event 5', description: 'Event 5 Description' }
        ];
    }
    render() {
        return (
            <ScrollView style={style.content}>
                <View style={style.card}>
                    <Text> {this.props.day}</Text>
                    
                    <Timeline
                        data={this.data}
                        titleStyle={{ marginTop: -12 }}
                        separator={false}
                        innerCircle={'dot'}
                        circleSize={12}
                    />
                </View>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create(
    {
        content: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        card: {
            padding: 10,
            paddingTop: 20
        },
        title: {
            fontSize: 22,
            marginBottom: 10
        }
    }
);
