import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { StatusBar, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import AppNavigator from './components/AppNavigator';
import PushController from './components/fcm/PushController';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: ''
        };
    }
    componentDidMount() {
        this.sendToken();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="dark-content"
                />
                <AppNavigator
                    navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav
                    })}
                />
                {(Platform.OS === 'android')?<PushController onChangeToken={token => this._onChangeToken(token) }/>:null}
            </View>
        );
    }
    _onChangeToken = (token) => {
        this.setState({ token: token || '' });
        this.sendToken();
    }
    sendToken = () => {
        if(this.props.auth.user.username && this.state.token !== '') {
            fetch(`${this.props.auth.hostname}/updateToken`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.props.auth.user.username,
                    token: this.state.token
                })
            }).then();
        }
    };
}

const mapStateToProps = state => ({
    nav: state.nav,
    auth: state.auth
});

export default connect(mapStateToProps)(App);
