import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Modal,
    TouchableHighlight,
    Picker,
    Dimensions,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import CheckBox from './checkbox/Checkbox';
import SelectItem from './SelectItem';
import {NavigationActions} from 'react-navigation';

class NewNotification extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'New Notification',
        headerRight: <TouchableOpacity onPress={() => navigation.state.params.sendNoti()} style={style.btTao}><Text
            style={{color: 'blue', fontSize: 18}}>post</Text></TouchableOpacity>,
    });

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            modalVisible: false,
            modalPicker: false,
            checked: false,
            idClass: 0,
            btToggle: true,
            loading: false,
            data1: [],
            data2: [],
            data3: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            selected: (new Map(): Map<string, boolean>)
        };
    }

    sendNotification = () => {
        let reciever = [];
        for (var key of this.state.selected.keys()) {
            reciever.push(key)
        }
        fetch(`${this.props.auth.hostname}/notification/group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.props.auth.user.token
            },
            body: JSON.stringify({
                sender: this.props.auth.user.username,
                receiver: reciever,
                title: this.state.title,
                noti: this.state.content
            })
        }).then(() => {
                this.setState({title: ''});
                this.props.navigation.dispatch(NavigationActions.back());
            }
        );
    };
    onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            if (selected.get(id)) {
                selected.delete(id);
            } else {
                selected.set(id, !selected.get(id)); // toggle
            }
            return {selected};
        });
    };
    renderItem = ({item}) => (
        <SelectItem
            title={item.name}
            username={item.username}
            onPressItem={this.onPressItem}
            selected={!!this.state.selected.get(item.username)}
        />
    );

    componentDidMount() {
        this.props.navigation.setParams({sendNoti: this.sendNotification});
        this.makeClassRequest();
        this.makeStudentRequest();
        this.makeParentRequest();
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setModalPicker(visible) {
        this.setState({modalPicker: visible});
        this.makeStudentRequest();
        this.makeParentRequest();
    }

    setBtToggle(sel) {
        this.setState({btToggle: sel});
    }

    render() {
        const deviceWidth = Dimensions.get('window').width;
        return (
            <View style={style.Content}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                >
                    <View style={{marginTop: 22, flex: 1}}>
                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableHighlight underlayColor='rgba(80,94,104,0.7)' onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }} style={{
                                    marginRight: 20,
                                    marginTop: 7,
                                    padding: 10,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: 'gray'
                                }}>
                                    <Text>Xong</Text>
                                </TouchableHighlight>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 20
                            }}>
                                <TouchableOpacity onPress={() => {
                                    this.setModalPicker(true);
                                }}><Text>Chọn lớp</Text></TouchableOpacity>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableHighlight onPress={() => {
                                        this.setBtToggle(true)
                                    }} style={{
                                        padding: 5,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        backgroundColor: this.state.btToggle ? 'gray' : 'white',
                                        borderWidth: 1,
                                        borderColor: 'gray',

                                    }}>
                                        <Text style={{color: this.state.btToggle ? 'white' : 'gray',}}>Hoc sinh</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => {
                                        this.setBtToggle(false)
                                    }} style={{
                                        padding: 5,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        backgroundColor: this.state.btToggle ? 'white' : 'gray',
                                        borderWidth: 1,
                                        borderColor: 'gray',

                                    }}>
                                        <Text style={{color: this.state.btToggle ? 'gray' : 'white',}}>Phu huynh</Text>
                                    </TouchableHighlight>
                                </View>
                                {}
                            </View>

                            {this.state.btToggle ? <FlatList
                                data={this.state.data1}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.username}
                            /> : <FlatList
                                data={this.state.data2}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.username}
                            />}

                            <Modal
                                animationType={"fade"}
                                transparent={true}
                                visible={this.state.modalPicker}
                                onRequestClose={() => {
                                    alert("Modal has been closed.")
                                }}
                            >
                                <View style={style.modelPickerContainer}>
                                    <View style={{width: deviceWidth - 40, height: 300, backgroundColor: 'white'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                            <TouchableHighlight onPress={() => {
                                                this.setModalPicker(!this.state.modalPicker)
                                            }} style={{width: 100}}>
                                                <Text>Xong</Text>
                                            </TouchableHighlight>
                                        </View>

                                        <Picker
                                            selectedValue={this.state.idClass}
                                            onValueChange={(itemValue, itemIndex) => this.setState({idClass: itemValue})}>
                                            { this.renderClass() }
                                        </Picker>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => {
                    this.setModalVisible(true);
                }} style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginBottom: 15}}><Text>Người
                    nhận ({this.state.selected.size})</Text></TouchableOpacity>
                <TextInput
                    style={{height: 40, borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5}}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    placeholder='title'
                />
                <TextInput
                    style={{flex: 1, borderWidth: 1, borderColor: 'gray', padding: 5, fontSize: 16}}
                    onChangeText={(content) => this.setState({content})}
                    value={this.state.content}
                    placeholder='content'
                    multiline
                />

            </View>
        );
    }

    renderClass = () => {
        let obj = [];
        for (let item of this.state.data3) {
            obj.push(<Picker.Item label={item.nameClass} value={item.idClass}/>)
        }
        return (obj);
    }

    makeStudentRequest = () => {
        const {page, seed} = this.state;
        if (this.state.idClass != 0) {
            const url = `${this.props.auth.hostname}/studentsbyclass/${this.state.idClass}`;
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
                        data1: res,
                        error: res.error || null,
                        loading: false,
                        refreshing: false
                    });
                })
                .catch(error => {
                    this.setState({error, loading: false});
                });
        }
    };
    makeParentRequest = () => {
        const {page, seed} = this.state;
        if (this.state.idClass != 0) {
            const url = `${this.props.auth.hostname}/viewListParents/${this.state.idClass}`;
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
                        data2: res,
                        error: res.error || null,
                        loading: false,
                        refreshing: false
                    });
                })
                .catch(error => {
                    this.setState({error, loading: false});
                });
        }
    };
    makeClassRequest = () => {
        const {page, seed} = this.state;
        const url = `${this.props.auth.hostname}/getClassTeach/${this.props.auth.user.machucvu}`;
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
                    data3: res,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };


}
const style = StyleSheet.create(
    {
        Content: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: 7
        },
        btTao: {
            alignItems: 'center',
            marginTop: 0,
            marginRight: 15,
        },
        modelPickerContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)'
        }
    }
);
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(NewNotification);
