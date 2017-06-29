import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {loginSuccess, update} from '../../actions/Authenticate';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwd: '',
            rusername: '',
            rpasswd: '',
            code: '',
            animating: false,
            error: null,
            toggle: false
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
                        let user = {...responseJson.user, token: responseJson.token};
                        let info = this.loadInfo(user);
                        //this.props.loginSuccess(user);
                    } else {
                        this.setState({error: 'Sai thong tin dang nhap!'});
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
    loadInfo = async (user) => {
        try {
            this.setState({
                animating: true,
                error: null
            });
            let uri = '';
            if (user.chucvu === 'GIAOVIEN') {
                uri = `${this.props.auth.hostname}/teachers/${user.machucvu}`;
            }
            if (user.chucvu === 'PHUHUYNH') {
                uri = `${this.props.auth.hostname}/parents/${user.machucvu}`;
            }
            if (user.chucvu === 'HOCSINH') {
                uri = `${this.props.auth.hostname}/students/${user.machucvu}`;
            }
            //login logic here
            fetch(uri, {
                method: 'GET',
                headers: {
                    'Authorization': user.token
                },
            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.name) {
                        let user1 = {...user, ...responseJson};

                        //let info = this.loadInfo(user);
                        this.props.loginSuccess(user1);
                        if(user.chucvu === 'PHUHUYNH'){
                            const stds = responseJson.students;
                            this.props.update(stds[0])
                        }
                    } else {
                        this.setState({error: 'Sai thong tin dang nhap!'});
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

    onReg = async () => {
        try {
            this.setState({
                animating: true,
                error: null
            });

            fetch(`${this.props.auth.hostname}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: this.state.username,
                    password: this.state.passwd,
                    verifyCode: this.state.code
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson) {
                        this.toggle(false);
                        this.setState({error: 'Dang ky thanh cong!'});
                    } else {
                        this.setState({error: 'Sai thong tin dang nhap!'});
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

    toggle = (tg) => {
        this.setState({toggle: tg});
    }

    render() {
        return (
            <View style={style.wrapter}>
                {(this.state.toggle === false) ?
                    <View>
                        <Text>Login screen</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, marginTop: 20}}
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username}
                            placeholder='Username'
                        />
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 15, padding: 5}}
                            onChangeText={(passwd) => this.setState({passwd})}
                            value={this.state.passwd}
                            secureTextEntry
                            placeholder='Password'
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={this.onLogin}
                                style={{
                                    margin: 10,
                                    padding: 10,
                                    backgroundColor: 'gray',
                                    borderRadius: 5,
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{color: '#fff'}}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.toggle(true)
                                }}
                                style={{
                                    margin: 10,
                                    padding: 10,
                                    backgroundColor: 'gray',
                                    borderRadius: 5,
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{color: '#fff'}}>
                                    Register
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <Text> {this.state.error} </Text>
                    </View> :
                    <View >
                        <Text>Resgister screen</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, marginTop: 20}}
                            onChangeText={(rusername) => this.setState({rusername})}
                            value={this.state.rusername}
                            placeholder='Username'
                        />
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 15, padding: 5}}
                            onChangeText={(rpasswd) => this.setState({rpasswd})}
                            value={this.state.rpasswd}
                            secureTextEntry
                            placeholder='Password'
                        />
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 15, padding: 5}}
                            onChangeText={(code) => this.setState({code})}
                            value={this.state.code}
                            secureTextEntry
                            placeholder='Code'
                        />
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={this.onReg()}
                                style={{
                                    margin: 10,
                                    padding: 10,
                                    backgroundColor: 'gray',
                                    borderRadius: 5,
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{color: '#fff'}}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{this.toggle(false)}}
                                style={{
                                    margin: 10,
                                    padding: 10,
                                    backgroundColor: 'gray',
                                    borderRadius: 5,
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{color: '#fff'}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <Text> {this.state.error} </Text>

                    </View>}
            </View>
        );
    }
}

const style = StyleSheet.create({
    wrapter: {
        flex: 1,
        justifyContent: 'center',
        padding: 20

    }

});

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {loginSuccess, update})(Login);
