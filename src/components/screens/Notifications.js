import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import DrawerButton from './DrawerButton';
import NotificationItem from './NotificationItem';

class Notification extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Notification',
        headerLeft: <DrawerButton navigation={navigation}/>,
        headerRight: <TouchableOpacity onPress={() => {
            navigation.navigate('NewNotification');
        }} style={style.btTao}><Text style={{color: 'blue', fontSize: 18}}>new</Text></TouchableOpacity>,
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            maxid: 0,
            maxItem: 10,
            id: 1,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `${this.props.auth.hostname}/notifications/receivers/${this.state.maxid}&${this.state.maxItem}`;
        this.setState({loading: true});

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.props.auth.user.token
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: this.state.maxid === 0 ? res : [...this.state.data, ...res],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });

    };

    handleRefresh = () => {
        this.setState(
            {
                maxid: 0,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    handleLoadMore = () => {

            const id = this.state.data[this.state.data.length - 1].id;

        this.setState(
            {
                maxid: id,
                loading: true
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
        const {navigation} = this.props;
        return (
            <View style={style.Content}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <NotificationItem
                            title={`${item.title}`}
                            noti={item.noti}
                            sender={item.id}
                        />
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.2}
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
