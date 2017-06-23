import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {connect} from 'react-redux';
import Timeline from 'react-native-timeline-listview';


class ScheduleTabContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            id: 1,
            error: null,
            refreshing: false,
        };
    }
    componentDidMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        const url = `${this.props.auth.hostname}/viewSchedule/1/1/${this.props.day}`;
        this.setState({loading: true});

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.props.auth.user.token
            }
        })
            .then(res => res.json())
            .then(res => {
                const data = [];
                this.setState((state)=>{
                    res.forEach(function(item, index, array) {
                        data.push({time: 'tiết ' + item.lesson, title: item.nameSubject, description: item.idTeacher});
                    });
                    return {data}
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });

    };
    render() {
        return (
            <ScrollView style={style.content}>
                <View style={style.card}>
                    <Timeline
                        data={this.state.data}
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
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ScheduleTabContent);