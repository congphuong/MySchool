import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DrawerItems } from 'react-navigation';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { logout } from '../actions/Authenticate';

class DrawerContent extends Component {
    render() {
        return (
            <ScrollView><TouchableOpacity
                onPress={this.props.logout}
                style={{
                    marginTop: 30,
                    padding: 10,
                    backgroundColor: '#3b5998',
                    borderRadius: 5,
                }}
            >
                <Text style={{ color: '#fff' }}>
                    Logout
                    </Text>
            </TouchableOpacity><Text>{(this.props.auth.user) ? this.props.auth.user.userDetail.username : 'khong co'}</Text><DrawerItems {...this.props.menu} /></ScrollView>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(DrawerContent);
