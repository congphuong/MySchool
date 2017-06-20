import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';

class NewTopic extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'New Topic',
        headerRight: <TouchableOpacity style={style.btTao} onPress={this.newTopic} ><Text style={{ color: 'blue', fontSize: 18 }}>post</Text></TouchableOpacity>,
    });

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        };
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
