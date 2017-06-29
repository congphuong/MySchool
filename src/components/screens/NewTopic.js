import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';

class NewTopic extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'New Topic',
        headerRight: <TouchableOpacity style={style.btTao} onPress={()=>navigation.state.params.postTopic1()} ><Text style={{ color: 'blue', fontSize: 18 }}>post</Text></TouchableOpacity>,
    });

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        };
    }

    postTopic = () => {
        fetch(`${this.props.auth.hostname}/topics/createTopic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.user.token
            },
            body: JSON.stringify({
                userID: this.props.auth.user.username,
                idClass: this.props.auth.user.idClass,
                content: this.state.content,
                idTopic: this.props.auth.user.idClass,
                topicName: this.state.title
            })
        }).then(()=>{this.setState({title:''});
            this.props.navigation.dispatch(NavigationActions.back());});
    };
    componentDidMount() {
        this.props.navigation.setParams({ postTopic1: this.postTopic });
    }

    render() {
        return (
            <View style={style.Content}>
                <TextInput
                    style={{ height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                    placeholder='title'
                />
                <TextInput
                    style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 5, fontSize: 16 }}
                    onChangeText={(content) => this.setState({ content })}
                    value={this.state.content}
                    placeholder='content'
                    multiline
                />
            </View>
        );
    }

}
const style = StyleSheet.create(
    {
        Content: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: 7
        },
        btTao: {
            alignItems: 'center',
            marginTop: 0,
            marginRight: 15
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(NewTopic);
