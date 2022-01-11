import React, { Component } from 'react';
import {View, StyleSheet, Animated, StatusBar, Platform} from 'react-native';
import Header from '../parts/Header';
import Content from '../parts/Content';
import Constants from 'expo-constants';
import Moment from 'react-moment';
import 'moment/locale/fr';
import * as Notifications from 'expo-notifications';
export default class All extends Component {
    constructor(props){
        super(props);
        this.state = {
            notification: null,
            bg: {fadeIn: new Animated.Value(0)},
            currentPage: this.props.route.params.currentPage
        }
    }

    componentDidMount() {
        Moment.globalFormat = 'D MMMM YYYY';
        this.setMomentLocale();
    }

    setMomentLocale() {
        Moment.globalLocale = 'fr';
    }

    render() {
        let fadeIn = this.state.bg.fadeIn
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={'#FFFFFF'}
                />
                <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#FFFFFF' }} />
                <Header nav={this.props.navigation} />
                <Content navigate={this.props.navigation} currentPage={this.state.currentPage}/>
            </View>
        );
    }

}

const STATUS_BAR_HEIGHT = Constants.platform.ios?Constants.statusBarHeight:0;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        zIndex: 2
    }
});