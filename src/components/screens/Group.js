import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import DrawerButton from './DrawerButton';
import TopicItem from './TopicItem';

class Group extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Group',
        headerLeft: <DrawerButton navigation={navigation} />,
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
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, id } = this.state;
        const url = `http://localhost:8080/topics/getByClass/${id}`;
        this.setState({ loading: true });
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': this.props.auth.user.token
            }, })
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
                        <TopicItem
                            title={`${item.topicName}`}
                            name={item.userID}
                            onpress={() => { navigation.navigate('Comment', { item }); }}
                        />
                    )}
                    keyExtractor={item => item.idTopic}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
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
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Group);
