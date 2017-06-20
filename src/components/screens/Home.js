import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import DrawerButton from './DrawerButton';


class Home extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerLeft: <DrawerButton navigation={navigation} />,
    });
    constructor() {
        super();
        this.state = {
            data: [
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
            ],
            data2: [
                { time: '09:00', title: 'Toan', description: 'Event 1 Description' },
                { time: '12:00', title: 'Vat Li', description: 'Event 3 Description' },
                { time: '16:30', title: 'Sinh hoc', description: 'Event 5 Description' },
            ]
        };
    }
    render() {
        return (
            <ScrollView style={style.content}>
                <View style={style.card}>
                    <Text style={style.title}>Thời khóa biểu</Text>
                    
                    <Timeline
                        data={this.state.data}
                        titleStyle={{ marginTop: -12 }}
                        separator={false}
                        lineWidth={1}
                        circleSize={8}
                        lineColor={'gray'}
                        circleColor={'gray'}
                    />
                </View>
                <View style={style.card}>
                    <Text style={style.title}>Lịch thi</Text>
                    <Timeline
                        data={this.state.data2}
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
export default Home;
