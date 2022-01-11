import React, { Component } from 'react';
import { ImageBackground, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontIsLoading: true,
        }
    }

    componentDidMount() {
        this.loadAssetsAsync();
        loc(this);
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
            OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
            OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf'),
        })
        this.setState({ fontLoaded: true })
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <ImageBackground
                source={ require ('../../assets/img/Mask-Group.png') }
                style={styles.container}
            >
                <Image style={styles.logo}
                       source = { require ('../../assets/img/resembid-official-logo.png') }
                />
                <Text style={styles.welcome}>
                    Welcome to the RESEMBID
                    News application
                </Text>
                <Text style={styles.latest}>
                    Don’t miss a beat! The latest
                    Programme news, features and
                    announcements at your fingertips.
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.handlePageChange(1)}
                    style={styles.touchable}>
                    <Text style={styles.touchable_text}>Let’s get you started</Text>
                </TouchableOpacity>
                <Image style={styles.slider}
                       source = { require ('../../assets/img/Slider1.png') }
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'linear-gradient(180deg, rgba(3, 121, 171, 1) 0%, rgba(2, 85, 120, 1) 100%);',
        width: wp('100'),
        height: hp('50'),
    },
    logo: {
        width: 163.99,
        height: 107.68,
        top: hp('27.85'),
        position: 'absolute'
    },
    welcome: {
        width: 327,
        height: 66,
        fontSize: hp('2.96'),
        color: '#ffffff',
        lineHeight: hp('4.06'),
        top: hp('57.27'),
        textAlign: 'center',
        paddingRight: wp('6.4'),
        paddingLeft: wp('6.4'),
        fontWeight: '700',
        position: 'absolute',
        fontFamily: 'OpenSansBold'
    },
    latest: {
        height: 63,
        color: '#C5DEE8',
        fontSize: hp('1.97'),
        textAlign: 'center',
        top: hp('66.87'),
        maxWidth: wp('78.13'),
        // paddingRight: wp('10.93'),
        // paddingLeft: wp('10.93'),
        lineHeight: hp('2.59'),
        fontWeight: '400',
        position: 'absolute',
        marginHorizontal: wp('15'),
        // marginRight: wp('7'),
        fontFamily: 'OpenSansRegular'
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: wp('87.2'),
        height: hp('6.65'),
        backgroundColor: '#FFFFFF',
        borderRadius: 52,
        paddingHorizontal: hp('1.97'),
        flexDirection: 'row',
        marginBottom: hp('12.44'),
        position: 'absolute',
        top: hp('80.91'),
    },
    touchable_text: {
        color: '#025578',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 'bold',
        fontFamily: 'OpenSansBold'
    },
    slider: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('93.35'),
    }
})

export default Page