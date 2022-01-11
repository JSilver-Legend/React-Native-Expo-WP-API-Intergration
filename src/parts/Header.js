import React, { Component } from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: props.nav,
        };
    }

    render() {
        return (
            <View style={ styles.header }>
                <View style={styles.logoBox}>
                    <Image
                        style= {styles.logo}
                        source = { require ('../../assets/img/icon/RESEMBID-horizontal.png') }
                    />
                </View>
                <TouchableOpacity
                    style={ styles.userButton}
                    onPress={()=> this.state.nav.navigate('Infos')}
                >
                    <Image
                        style = { styles.icon }
                        source = { require ('../../assets/img/icon/account.png') }
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingTop: hp('6.02%') - STATUS_BAR_HEIGHT,
        paddingHorizontal: wp('6.4%'),
        paddingBottom: hp('2%'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#FFFFFF'
    },

    logo: {
        width: wp('44.51%'),
        resizeMode: 'contain',
        height: 45.03
    },

    userButton: {
        width: 50,
        alignItems: 'flex-end',
        // paddingVertical: 10
    },

    icon: {
        width: 32,
        height: 32
    }
});