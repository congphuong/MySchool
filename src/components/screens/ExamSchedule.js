import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import {connect} from 'react-redux';
import Timeline from 'react-native-timeline-listview';

import DrawerButton from './DrawerButton';

class ExamSchedule extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'ExamSchedule',
        headerLeft: <DrawerButton navigation={navigation} />,
    });
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
        let idClass = 0;
        let url = '';
        if(this.props.auth.user.chucvu === 'PHUHUYNH'){
            (this.props.auth.selectedStudent)?
                idClass = this.props.auth.selectedStudent.idClass : 0;
            url = `${this.props.auth.hostname}/viewTestSchedule/1/${idClass}`;
        }
        if(this.props.auth.user.chucvu === 'GIAOVIEN'){
            url = `${this.props.auth.hostname}/viewTestSchedule/1/${this.props.auth.machucvu}`;
        }
        if(this.props.auth.user.chucvu === 'HOCSINH'){
            idClass = this.props.auth.user.idClass;
            url = `${this.props.auth.hostname}/viewTestSchedule/1/${idClass}`;
        }

        if(url !== '') {
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
                    this.setState((state) => {
                        res.forEach(function (item, index, array) {
                            const date = new Date(item.testDay);
                            data.push({
                                time: 'ngày ' + date.getDate() + '/' + date.getMonth(),
                                title: item.nameSubject,
                                description: 'tiết ' + item.startLesson + ' thời gian: ' + item.testTime + ' tại lớp: ' + item.nameClass
                            });
                        });
                        return {data}
                    });
                })
                .catch(error => {
                    this.setState({error, loading: false});
                });
        }
    };
    render() {
        return (
            <ScrollView style={style.content}>
                <View style={style.card}>
                    <Text style={style.title}>Lịch thi</Text>
                    <Timeline
                        data={this.state.data}
                        titleStyle={{ marginTop: -12 }}
                        separator={false}
                        circleSize={10}
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
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(ExamSchedule);