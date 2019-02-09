/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Login from './src/Login/LoginScreen';
import Home from './src/Container/Home';
import * as constant from './src/Helper/Constants';

export default class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isLoggedIn: false,
      loading: true,
    };
    context = this;

    constant.commonConstant.emitter.addListener ('loginEvent', function (x) {
      setTimeout (() => {
        context.setState ({isLoggedIn: true});
      }, 100);
    });
    constant.commonConstant.emitter.addListener ('logout', function (x) {
      context.setState ({isLoggedIn: false});
    });
  }
  componentDidMount () {
    AsyncStorage.getItem ('userData').then (value => {
      if (value != null) {
        global.isLoggedIn = true;
        this.setState ({
          isLoggedIn: true,
          loading: false,
        });
      } else {
        global.isLoggedIn = false;
        this.setState ({
          isLoggedIn: false,
          loading: false,
        });
      }
    });
  }
  render () {
    if (this.state.isLoggedIn) {
      return <Home />;
    } else {
      return <Login />;
    }
  }
}
