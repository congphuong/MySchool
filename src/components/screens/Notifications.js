import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import DrawerButton from './DrawerButton';
import NotificationItem from './NotificationItem';

class Notification extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Notification',
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <TouchableOpacity onPress={() => { navigation.navigate('NewNotification'); }} style={style.btTao} ><Text style={{ color: 'blue', fontSize: 18 }}>new</Text></TouchableOpacity>,
    });
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            id: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        //this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, maxItem } = this.state;
        const url = 'http://192.168.42.72:8080/notifications/receivers';
        this.setState({ loading: true });
        setTimeout(() => {
            fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.props.auth.user.token
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res : [...this.state.data, ...res],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
        }, 1500); 
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: '#CED0CE',
                    marginLeft: 10,
                    marginRight: 10
                }}
            />
        );
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={style.Content} >
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <NotificationItem
                            title={`${item.title}`}
                            noti={item.noti}
                            sender={item.sender}
                        />
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}
                />
            </View>
        );
    }


}

const style = StyleSheet.create(
    {
        Content: {
            flex: 1,
            backgroundColor: '#FFFFFF'
        },
        btTao: {
            marginRight: 15
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Notification);
