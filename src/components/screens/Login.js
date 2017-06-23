import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { loginSuccess } from '../../actions/Authenticate';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwd: '',
            animating: false,
            error: null
        };
    }

    onLogin = async () => {
        try {
            this.setState({
                animating: true,
                error: null
            });

            //login logic here
            fetch(`${this.props.auth.hostname}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.passwd,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson.token) {
                        const user = { userDetail: responseJson.user, token: responseJson.token };
                        this.props.loginSuccess(user);
                    } else {
                        this.setState({ error: 'Sai thong tin dang nhap!'});
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            this.setState({
                animating: false,
                error: null
            });
            //console.log(user.username);
            //this.props.loginSuccess(user);
        } catch (error) {
            this.setState({
                animating: false,
                error: error.message
            });
        }
    }

    render() {
        return (
            <View style={style.wrapter}>
                <Text> Login screen </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, marginTop: 20 }}
                    onChangeText={(username) => this.setState({ username })}
                    value={this.state.username}
                    placeholder='Username'
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 15, padding: 5 }}
                    onChangeText={(passwd) => this.setState({ passwd })}
                    value={this.state.passwd}
                    secureTextEntry
                    placeholder='Password'
                />
                <TouchableOpacity
                    onPress={this.onLogin}
                    style={{
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: '#3b5998',
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#fff' }}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text> {this.state.error} </Text>

            </View>
        );
    }
}

const style = StyleSheet.create({
    wrapter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20

    }

});

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { loginSuccess })(Login);
