import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
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
            data: [],
            data2: [],
            user: {}
        };
    }

    componentWillMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const day = new Date(Date.now());
        let idClass = 0;
        if(this.props.auth.user.chucvu === 'PHUHUYNH'){
            (this.props.auth.selectedStudent)?
                idClass = this.props.auth.selectedStudent.idClass : 0;
        } else {
            idClass = this.props.auth.user.idClass
        }
        const url = `${this.props.auth.hostname}/viewSchedule/${idClass}/1/${day.getDay()+1}`;
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

    componentDidMount() {

    }

    render() {
        const day = new Date(Date.now());
        return (
            <ScrollView style={style.content}>
                <View style={style.card}>
                    <Text style={style.title}>Thời khóa biểu thứ {day.getDay()+1}</Text>
                    
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

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Home);
