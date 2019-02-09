/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Auth0 from 'react-native-auth0';
import * as constant from '../Helper/Constants'

const auth0 = new Auth0({ domain: 'logisticinfotech.auth0.com', clientId: 'uCJxL2pjCA0vaD5PXIyIUuXT4vAQVsUc' });

export default class Login extends Component {
    onPressLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                audience: 'https://logisticinfotech.auth0.com/userinfo',
                connection: 'linkedin', //
            })
            .then(
                credentials => {
                    console.log('Auth0 Credential :==> \n', JSON.stringify(credentials));
                    let idToken = credentials.accessToken;
                    auth0.auth
                        .userInfo({ token: idToken })
                        .then(userData => {
                            console.log('User Data From Auth0 :===> \n', JSON.stringify(userData.name));
                            AsyncStorage.setItem("userData", JSON.stringify(userData.name))
                            constant.commonConstant.emitter.emit("loginEvent", "ok");

                        })
                        .catch(console.error);
                }
            )
            .catch(error => {
                console.log('Auth0 Error :==> \n', error);
            });
    };
    onPressLoginWithGoogle = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                audience: 'https://logisticinfotech.auth0.com/userinfo',
                connection: 'google-oauth2',
            })
            .then(
                credentials => {
                    console.log('Auth0 Credential :==> \n', JSON.stringify(credentials));
                    let idToken = credentials.accessToken;
                    auth0.auth
                        .userInfo({ token: idToken })
                        .then(userData => {
                            console.log('User Data From Auth0 :===> \n', JSON.stringify(userData));
                            AsyncStorage.setItem("userData", JSON.stringify(userData.name))
                            constant.commonConstant.emitter.emit("loginEvent", "ok");
                        })
                        .catch(console.error);
                }
            )
            .catch(error => {
                console.log('Auth0 Error :==> \n', error);
            });
    };

    onPressLoginWithCustomEmail = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                audience: 'https://logisticinfotech.auth0.com/userinfo',
                connection: 'facebook',
            })
            .then(
                credentials => {
                    console.log('Auth0 Credential :==> \n', JSON.stringify(credentials));
                    let idToken = credentials.accessToken;
                    auth0.auth
                        .userInfo({ token: idToken })
                        .then(userData => {
                            console.log('User Data From Auth0 :===> \n', JSON.stringify(userData));
                            AsyncStorage.setItem("userData", JSON.stringify(userData.name))
                            constant.commonConstant.emitter.emit("loginEvent", "ok");
                        })
                        .catch(console.error);
                }
            )
            .catch(error => {
                console.log('Auth0 Error :==> \n', error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewBtn}>
                    <TouchableOpacity onPress={this.onPressLogin}>
                        <Text style={styles.titleText}> Login With Auth0 linkedin </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewBtn1}>
                    <TouchableOpacity onPress={this.onPressLoginWithGoogle}>
                        <Text style={styles.titleText}> Login With Auth0 Google </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewBtn2}>
                    <TouchableOpacity onPress={this.onPressLoginWithCustomEmail}>
                        <Text style={styles.titleText}> Login With Auth0 facebook </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    titleText: {
        color: "rgb(92,130,212)",
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
        paddingHorizontal: 16,
    },
    viewBtn: {
        backgroundColor: 'white',
        shadowColor: 'rgb(92,130,212)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        marginHorizontal: 25
    },
    viewBtn1: {
        backgroundColor: 'white',
        shadowColor: 'rgb(92,130,212)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        marginHorizontal: 25,
        marginTop: 25,
    },
    viewBtn2: {
        backgroundColor: 'white',
        shadowColor: 'rgb(92,130,212)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        marginHorizontal: 25,
        marginTop: 25,
    }
});
