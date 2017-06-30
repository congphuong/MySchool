import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DrawerItems} from 'react-navigation';
import {StyleSheet, Text, ScrollView, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {logout, update} from '../actions/Authenticate';

class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }
    toggle = () => {
        const tg = this.state.toggle;
        this.setState({toggle: !tg});
    }

    render() {

        return (
            <View style={{flex:1}}>
                <View style={style.banner}>
                    <Image source={require('./img/avatar.png')} style={style.avatar}/>
                    <Text
                        style={{color: '#fff'}}>{(this.props.auth.user) ? this.props.auth.user.name : 'khong co'}</Text>
                    <TouchableOpacity
                        onPress={this.props.logout}
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            padding: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            backgroundColor: '#c3c7c7',
                            borderRadius: 5,
                        }}>
                        <Text style={{color: 'gray'}}>Logout</Text>
                    </TouchableOpacity>
                    {(this.props.auth.user)?(this.props.auth.user.chucvu === 'PHUHUYNH')?<TouchableOpacity
                        onPress={()=>{this.toggle()}}
                        style={{
                            marginTop: 10,
                            marginBottom: 10,
                            padding: 10,
                            paddingTop: 5,
                            paddingBottom: 5,
                            backgroundColor: '#c3c7c7',
                            borderRadius: 5,
                        }}>
                        <Image source={require('./img/arrow.png')} style={{width:16, height:16}} />
                    </TouchableOpacity>:null:null}
                </View>
                <View/>
                {(this.state.toggle === false) ? <DrawerItems {...this.props.menu} /> : <ScrollView style={{flex:1, padding:10}}>
                    {(this.props.auth.user)?(this.props.auth.user.students)?this.renderStudent(this.props.auth.user.students):null:null}

                </ScrollView>}

            </View>
        );
    }

    renderStudent = (students) => {
        let obj = [];
        for (let std of students){
            obj.push(<TouchableOpacity onPress={() =>{this._onPress(std)}}><Text>{std.name}</Text></TouchableOpacity>)
        }
        return(obj);
    }
    _onPress = (std) => {
            this.props.update(std);
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
        avatar: {
            width: 80,
            height: 80,
            marginTop: 25,
            marginBottom: 10
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {logout, update})(DrawerContent);
