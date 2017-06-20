import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';

import DrawerButton from './DrawerButton';

export default class ExamSchedule extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'ExamSchedule',
        headerLeft: <DrawerButton navigation={navigation} />,
    });
    constructor() {
        super();
        this.data = [
            { time: '09:00', title: 'Toan', description: 'Event 1 Description' },
            { time: '12:00', title: 'Vat Li', description: 'Event 3 Description' },
            { time: '16:30', title: 'Sinh hoc', description: 'Event 5 Description' },
        ];
    }
    render() {
        return (
            <ScrollView style={style.content}>
                <View style={style.card}>
                    <Text style={style.title}>Lịch thi</Text>
                    <Timeline
                        data={this.data}
                        titleStyle={{ marginTop: -12 }}
                        separator={false}
                        innerCircle={'dot'}
                        circleSize={12}
                        lineColor={'red'}
                        circleColor={'red'}
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
            backgroundColor: '#fafafa',
            margin: 10,
            marginBottom: 0,
            padding: 10,
            shadowColor: '#2E272B',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2
        },
        title: {
            fontSize: 22,
            marginBottom: 10
        }
    }
);
