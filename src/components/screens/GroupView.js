import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CommentItem from './CommentItem';

class GroupView extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.item.topicName
    });
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            maxItem: 10,
            error: null,
            refreshing: false,
            txtCmt: '',
        };
    }
    componentDidMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        const { page, maxItem } = this.state;
        const url = `http://192.168.42.72:8080/comments/getCommentByTopic/${this.props.navigation.state.params.item.idTopic}/${this.state.page}/${maxItem}`;
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
        if (!this.state.loading) {
            this.setState(
                {
                    page: this.state.page + 1,
                    loading: true
                },
                () => {
                    this.makeRemoteRequest();
                }
            );
        }
    };

    sendComment = () => {
        fetch('http://192.168.42.72:8080/comments/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.user.token
            },
            body: JSON.stringify({
                content: this.state.txtCmt,
                time: 1497694444000,
                userID: 'HS001',
                idTopic: this.props.navigation.state.params.item.idTopic
            })
        }).then(this.setState({ txtCmt: '' }));
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
        return (
            <View style={style.content} >
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <CommentItem
                            userName={item.userID}
                            cmt={item.content}
                        />
                    )}
                    keyExtractor={item => item.idCmt}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={-0.1}
                />
                <View style={style.cmtview}>
                    <TextInput
                        style={{ height: 40, flex: 1, borderTopWidth: 1, borderColor: 'gray' }}
                        onChangeText={(txtCmt) => this.setState({ txtCmt })}
                        value={this.state.txtCmt}
                        placeholder='Nhap noi dung comment!'
                    />
                    <TouchableOpacity
                        onPress={this.sendComment}
                        style={{
                            height: 40,
                            width: 45,
                            padding: 10,
                            backgroundColor: '#3b5998'
                        }}
                    >
                        <Text style={{ color: '#fff' }}>
                            Gui
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create(
    {
        content: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        cmtview: {
            flexDirection: 'row'
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(GroupView);
