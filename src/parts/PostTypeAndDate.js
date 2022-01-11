import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Moment from 'react-moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const icons = {
    post: require('../../assets/img/text.png'),
    tribe_events: require('../../assets/img/text.png')
}

export default class TypeAndDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            type: props.type,
            fontLoaded: false
        }
    }

    componentDidMount() {
        this.loadAssetsAsync();
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
            DMSansRegular: require('../../assets/fonts/DMSans-Regular.ttf'),
        })
        this.setState({ fontLoaded: true })
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <View style={ styles.dateBox }>
                <Image
                    style = { styles.icon }
                    source = {icons[this.state.type]}
                    resizeMode = 'contain'
                />
                <Text style={ styles.date }>{this.state.type}, </Text>
                <Moment element={Text} style={ styles.date }>{ this.state.date }</Moment>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('0.93'),
    },

    date: {
        fontFamily: 'DMSansRegular',
        fontSize: hp('1.3'),
        color: '#7E8E95',
        lineHeight: hp('1.35'),
        textAlignVertical: 'center',
        textTransform: 'capitalize'
    },

    icon: {
        width: 9,
        marginLeft: wp('4.28'),
        marginRight: 8
    },
});
