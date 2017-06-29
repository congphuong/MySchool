import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import DrawerButton from './DrawerButton';
import TopicItem from './TopicItem';

class Group extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Group',
        headerLeft: <DrawerButton navigation={navigation} />,
        headerRight: <TouchableOpacity onPress={() => { navigation.navigate('NewTopic'); }} style={style.btTao} ><Text style={{ color: 'blue', fontSize: 18 }}>new</Text></TouchableOpacity>,
    });
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            maxid: 0,
            error: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    newTopic = () => {
        console.log('Newtopic');
        this.props.navigation.navigate('NewTopic');
        console.log('Newtopic');
    }

    makeRemoteRequest = () => {
        const { maxid} = this.state;
        let idClass = 0;
        if(this.props.auth.user.chucvu === 'PHUHUYNH'){
            (this.props.auth.selectedStudent)?
            idClass = this.props.auth.selectedStudent.idClass : 0;
        } else {
            idClass = this.props.auth.user.idClass
        }
        if(idClass != 0) {
            const url = `${this.props.auth.hostname}/topics/getByClass/${idClass}/${maxid}/10`;
            this.setState({loading: true});
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.props.auth.user.token
                },
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        data: maxid === 0 ? res : [...this.state.data, ...res],
                        error: res.error || null,
                        loading: false,
                        refreshing: false
                    });
                })
                .catch(error => {
                    this.setState({error, loading: false});
                });
        }else {
            this.setState({refreshing: false})
        }
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
        let id = 0;
        if(this.state.data[this.state.data.length - 1]) {
            id = this.state.data[this.state.data.length - 1].idTopic;
        }
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
                    height: 0.5,
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
                            cmtCount={item.numCMT}
                            time={item.time}
                            content={item.content}
                            onpress={() => { navigation.navigate('Comment', { item }); }}
                        />
                    )}
                    keyExtractor={item => item.idTopic}
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
            alignItems: 'center',
            marginTop: 0,
            marginRight: 15
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Group);
