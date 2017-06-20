import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import PushController from './components/fcm/PushController';
import AppNavigator from './components/AppNavigator';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: ''
        };
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
                
            </View>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(App);
