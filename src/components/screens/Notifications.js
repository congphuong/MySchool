import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Image, LayoutAnimation} from 'react-native';
import {connect} from 'react-redux';
import DrawerButton from './DrawerButton';
import NotificationItem from './NotificationItem';
import ActionButton from 'react-native-action-button';

class Notification extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Notification',
        headerLeft: <DrawerButton navigation={navigation}/>,
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
            chucvu: this.props.auth.user.chucvu === 'GIAOVIEN',
            isActionButtonVisible: true
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
                    onScroll={this.onScroll}
                />
                {this.state.isActionButtonVisible && this.state.chucvu ? <ActionButton hideShadow buttonColor="#3498db"
                                                                  onPress={() => navigation.navigate('NewNotification')}/> : null}
            </View>
        );
    }

    _listViewOffset = 0;
    onScroll = (event) => {
        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
            duration: 100,
            create: {type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity},
            update: {type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity},
            delete: {type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity}
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up'
        // If the user is scrolling down (and the action-button is still visible) hide it
        const isActionButtonVisible = direction === 'up'
        if (isActionButtonVisible !== this.state.isActionButtonVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({isActionButtonVisible})
        }
        // Update your scroll position
        this._listViewOffset = currentOffset
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
        },
        actionButtonIcon: {
            fontSize: 20,
            height: 22,
            color: 'white',
        },
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Notification);
