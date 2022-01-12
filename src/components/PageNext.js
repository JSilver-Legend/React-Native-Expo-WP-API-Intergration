import React from 'react';
import { ImageBackground, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";

class PageNext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontIsLoading: true,
        }
    }

    _isMounted = false;
    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            await Font.loadAsync({
                'OpenSansBold': require('../../assets/fonts/OpenSans-Bold.ttf'),
                'OpenSansRegular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            });
            this.setState({ fontLoaded: true })
        }
        loc(this);
    }

    componentWillUnMount() {
        rol();
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <ImageBackground
                source={ require ('../../assets/img/Img.png') }
                style={styles.container}
                resizeMode='stretch'
            >
                <Image style={styles.logo}
                       source = { require ('../../assets/img/Ellipse_19.png') }
                />
                <Image style={styles.logo2}
                       source = { require ('../../assets/img/Vector.png') }
                />
                <Text style={styles.welcome}>
                    Your time is precious. Let us bring the news to you.
                </Text>
                <Text style={styles.latest}>
                    Activate notifications to receive alerts on all of your top news updates, features and announcements.
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.handlePageChange(2)}
                    style={styles.touchable}>
                    <Text style={styles.touchable_text}>Active notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchable2} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.touchable_text2}>No Thanks !</Text>
                </TouchableOpacity>
                <Image style={styles.slider}
                       source = { require ('../../assets/img/Slider2.png') }
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
        backgroundColor: 'rgba(0,99,175,1)',
        width: wp('100'),
        height: hp('40'),
    },
    logo2: {
        width: 47.75,
        height: 52.41,
        top: hp('35.84'),
        position: 'absolute'
    },
    logo: {
        width: 99.7,
        height: 99.7,
        top: hp('33.18'),
        position: 'absolute'
    },
    welcome: {
        width: 327,
        height: 66,
        fontSize: hp('2.96'),
        color: '#ffffff',
        lineHeight: hp('4.06'),
        top: hp('50.37'),
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
        top: hp('59.98'),
        paddingRight: wp('10.93'),
        paddingLeft: wp('10.93'),
        lineHeight: hp('2.59'),
        fontWeight: '400',
        position: 'absolute',
        marginLeft: 25,
        marginRight: 25,
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
        top: hp('70.04'),
    },
    touchable_text: {
        color: '#1E2459',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 'bold',
        fontFamily: 'OpenSansBold'
    },
    touchable2: {
        position: 'absolute',
        top: hp('83.5'),
    },
    touchable_text2: {
        color: '#C5DEE8',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 'bold',
        fontFamily: 'OpenSansBold',
        textDecorationLine: 'underline'
    },
    slider: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('93.35'),
    }
})

export default PageNext