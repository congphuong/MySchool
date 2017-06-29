import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import DrawerButton from './DrawerButton';
import ScoreItem from './ScoreItem';

class Score extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Score',
        headerLeft: <DrawerButton navigation={navigation} />,
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
        };
    }
    componentWillMount() {
        this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
        const { maxid} = this.state;
        let idClass = 0;
        let idStd = 0;
        if(this.props.auth.user.chucvu === 'PHUHUYNH'){
            if(this.props.auth.selectedStudent) {
                idClass = this.props.auth.selectedStudent.idClass;
                idStd = this.props.auth.selectedStudent.idStudent;
            }
        } else {
            idClass = this.props.auth.user.idClass;
            idStd = this.props.auth.user.idClass;
        }
        if(idClass != 0) {
            const url = `${this.props.auth.hostname}/getScoreBoard/${idStd}/${idClass}/1`;
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
                        data: res,
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
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    render() {
        return (
            <View style={style.wrapter}>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <ScoreItem
                        item={item}
                    />
                )}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
            </View>
        );
    }
}

const style = StyleSheet.create(
    {
        wrapter: {
            flex: 1,
            backgroundColor: '#FFFFFF'
        }
    }
);

const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Score);