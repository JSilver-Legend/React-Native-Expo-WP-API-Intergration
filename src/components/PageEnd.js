import React, { useState } from 'react';
import { ImageBackground, Switch, View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import * as Font from 'expo-font';
import PushNotifications from '../parts/PushNotifications';
import AppLoading from "expo-app-loading";
// import SwitchToggle from "react-native-switch-toggle";

class PageNext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resilience: false,
            sustainable: false,
            biodiversity: false,
            COVID: false,
            bi_calendar: false,
            fontIsLoading: true,
            fontLoaded: true
        }
    }

    _isMounted = false;
    async componentDidMount() {
        const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        this._isMounted = true;
        if (this._isMounted) {
            await Font.loadAsync({
                'OpenSansBold': require('../../assets/fonts/OpenSans-Bold.ttf'),
                'OpenSansRegular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            });
            this.setState({ fontLoaded: false })
        }
        loc(this);
        this.getThemeConfig();
    }

    toggleSwitch = (value) => {
        this.setThemeConfig(value[0], value[1]);
    }

    setThemeConfig(theme, status) {
        let themes = this.state;
        themes[theme] = status;
        AsyncStorage.setItem('themes', JSON.stringify(themes));
        this.setState({[theme]: status})
    }

    getThemeConfig () {
        AsyncStorage.getItem('themes')
            .then( value => {
                let parsed = JSON.parse(value)
                if(parsed) {
                    this.setState({
                        resilience: parsed.resilience? parsed.resilience : false ,
                        sustainable: parsed.sustainable? parsed.sustainable : false,
                        biodiversity: parsed.biodiversity? parsed.biodiversity : false,
                        COVID: parsed.COVID? parsed.COVID : false,
                        bi_calendar: parsed.bi_calendar? parsed.bi_calendar : false
                    })
                } else {
                    return
                }
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    componentWillUnMount() {
        rol();
    }

    saveConfig() {
        PushNotifications(
            this.state.resilience,
            this.state.sustainable,
            this.state.biodiversity,
            this.state.COVID,
            this.state.bi_calendar,
        );
        this.props.navigation.navigate('Home');
    }

    render() {

        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <ImageBackground
                style={styles.container}
            >
                <Text style={styles.welcome}>
                    {"For which topics do you\nwant to receive\nnotifications?"}
                </Text>
                <View style={styles.optionsBox}>
                    <View style={styles.optionsRow}>
                        <Image
                            style = {styles.icon}
                            source = { require ('../../assets/img/Resilience.png') }
                        />
                        <Text style = {styles.name}>
                            Resilience
                        </Text>
                        {/* <View style = {styles.switch}>
                            <SwitchToggle
                                containerStyle={{
                                    width: 50,
                                    height: 30,
                                    borderRadius: 25,
                                    padding: 5,
                                }}
                                circleStyle={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 19,
                                    backgroundColor: "#0063AF",
                                }}
                                // switchOn={this.state.sustainable ? true : false}
                                // onPress={(_) => this.setState({ sustainable: !this.state.sustainable })}
                                // circleColorOff='#0063AF'
                                // circleColorOn='#ffffff'
                                // backgroundColorOn='#1E2459'
                                // backgroundColorOff='#1E2459'
                                // duration={190}
                                // value={this.state.sustainable}
                                // onValueChange={(value) => this.toggleSwitch(['sustainable', value])}
                            />
                        </View> */}
                        {/* <Switch
                            thumbColor={this.state.resilience?'#FFFFFF':'#0379AB'}
                            ios_backgroundColor="#025578"
                            style = {styles.switch}
                            trackColor = {{false: '#025578', true: '#025578'}}
                            onValueChange={(value) => this.toggleSwitch(['resilience', value])}
                            value = {this.state.resilience}
                        /> */}
                    </View>
                    <View style={styles.optionsRow}>
                        <Image
                            style = {styles.icon}
                            source = { require ('../../assets/img/sustainable.png') }
                        />
                        <Text style = {styles.name}>
                            Sustainable Energy
                        </Text>
                        {/* <Switch
                            thumbColor={this.state.sustainable?'#FFFFFF':'#0379AB'}
                            ios_backgroundColor="#025578"
                            style = {styles.switch}
                            trackColor = {{false: '#025578', true: '#025578'}}
                            onValueChange={(value) => this.toggleSwitch(['sustainable', value])}
                            value = {this.state.sustainable}
                        /> */}
                    </View>
                    <View style={styles.optionsRow}>
                        <Image
                            style = {styles.icon}
                            source = { require ('../../assets/img/biodiversity.png') }
                        />
                        <Text style = {styles.name}>
                            Marine Biodiversity
                        </Text>
                        {/* <Switch
                            thumbColor={this.state.biodiversity?'#FFFFFF':'#0379AB'}
                            ios_backgroundColor="#025578"
                            style = {styles.switch}
                            trackColor = {{false: '#025578', true: '#025578'}}
                            onValueChange={(value) => this.toggleSwitch(['biodiversity', value])}
                            value = {this.state.biodiversity}
                        /> */}
                    </View>
                    <View style={styles.optionsRow}>
                        <Image
                            style = {styles.icon}
                            source = { require ('../../assets/img/COVID-19.png') }
                        />
                        <Text style = {styles.name}>
                            {"COVID-19\nResilience Response"}
                        </Text>
                        {/* <Switch
                            thumbColor={this.state.COVID?'#FFFFFF':'#0379AB'}
                            ios_backgroundColor="#025578"
                            style = {styles.switch}
                            trackColor = {{false: '#025578', true: '#025578'}}
                            onValueChange={(value) => this.toggleSwitch(['COVID', value])}
                            value = {this.state.COVID}
                        /> */}
                    </View>
                    <View style={styles.optionsRowLast}>
                        <Image
                            style = {styles.bi_calendar2}
                            source = { require ('../../assets/img/bi_calendar2-event.png') }
                        />
                        <Text style = {styles.name}>
                            Events
                        </Text>
                        {/* <Switch
                            thumbColor={this.state.bi_calendar?'#FFFFFF':'#0379AB'}
                            ios_backgroundColor="#025578"
                            style = {styles.switch}
                            trackColor = {{false: '#025578', true: '#025578'}}
                            onValueChange={(value) => this.toggleSwitch(['bi_calendar', value])}
                            value = {this.state.bi_calendar}
                        /> */}
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => this.saveConfig()}
                    style={styles.touchable}>
                    <Text style={styles.touchable_text}>Submit</Text>
                </TouchableOpacity>
                <Image style={styles.slider}
                       source = { require ('../../assets/img/Slider3.png') }
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
        height: hp('50'),
    },
    welcome: {
        width: 330,
        height: 99,
        fontSize: hp('2.96'),
        color: '#ffffff',
        lineHeight: hp('4.02'),
        top: hp('10.1'),
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
        top: hp('80.91'),
    },
    touchable_text: {
        color: '#1E2459',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 'bold',
        fontFamily: 'OpenSansBold'
    },
    slider: {
        flexDirection: 'row',
        position: 'absolute',
        top: hp('93.35'),
    },
    title: {
        color: '#ffffff',
        fontSize: wp('7.5%'),
        textAlign: 'center',
        marginBottom: hp('4.4%'),fontFamily: 'medium',
        lineHeight: hp('4.2%')
    },

    optionsBox: {
        width: 327,
        backgroundColor: '#347cb4',
        borderRadius: 16,
        position: 'absolute',
        top: hp('26.72'),
    },

    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#C5DEE8',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: hp('1.72%'),
        marginHorizontal: 15,
        paddingRight: 25,
        opacity: 1
    },

    optionsRowLast: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.72%'),
        marginHorizontal: 15,
        paddingRight: 25,

    },

    icon: {
        width: 40,
        height: 40,
        marginRight: 18,
        marginLeft: 10,
    },
    bi_calendar2: {
        width: 24,
        height: 24,
        marginRight: 22,
        marginLeft: 20,
    },

    name: {
        fontSize: hp('1.72'),
        lineHeight: hp('2.34'),
        color: '#FFFFFF',
        fontWeight: '400',
        // width: hp('14.4'),
    },

    switch: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },

})

export default PageNext