import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DrawerItems} from 'react-navigation';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {logout} from '../actions/Authenticate';

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {

        return (
            <View>
                <View style={style.banner}>
                    <Image source={require('./img/avatar.png')} style={style.avatar}/>
                    <Text style={{color: '#fff'}}>{(this.props.auth.user) ? this.props.auth.user.userDetail.username : 'khong co'}</Text>
                <TouchableOpacity
                onPress={this.props.logout}
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 10,
                    paddingTop:5,
                    paddingBottom: 5,
                    backgroundColor: '#c3c7c7',
                    borderRadius: 5,
                }}>
                <Text style={{color: 'gray'}}>Logout</Text>
                </TouchableOpacity>
                </View>
                <View/>
                <DrawerItems {...this.props.menu} />
            </View>
        );
    }
}
const deviceHeight = Dimensions.get('window').height;
const style = StyleSheet.create(
    {
        Content: {
            flex: 1,
            backgroundColor: '#FFFFFF'
        },
        btTao: {
            alignItems: 'center',
            marginTop: 0,
            marginRight: 15
        },
        banner: {
            backgroundColor: 'gray',
            alignItems: 'center'
        },
        avatar:{
            width:80,
            height:80,
            marginTop: 25,
            marginBottom: 10
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {logout})(DrawerContent);
