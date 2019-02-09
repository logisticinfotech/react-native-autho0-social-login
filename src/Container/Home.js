import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'logisticinfotech.auth0.com', clientId: 'uCJxL2pjCA0vaD5PXIyIUuXT4vAQVsUc' });
import * as constant from '../Helper/Constants'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        };

    }
    componentDidMount() {
        AsyncStorage.getItem("userData").then(value => {
            this.setState({ userName: value })
        })
    }
    onPressLogout = () => {
        auth0.webAuth
            .clearSession()
            .then(res => {
                AsyncStorage.removeItem('userData')
                constant.commonConstant.emitter.emit("logout", "ok");
            })
            .catch(err => {
                console.log("error clearing session: ", err);
            });

    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
                <Text style={{ fontSize: 18 }}> Welcome {this.state.userName} </Text>
                <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={this.onPressLogout}>
                        <Text style={styles.titleText}> Logout </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    viewBtn: {
        backgroundColor: 'white',
        shadowColor: 'rgb(92,130,212)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        marginHorizontal: 25,
        marginTop: 25,
    },
    titleText: {
        color: "rgb(92,130,212)",
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
        paddingHorizontal: 16,
    },
});
