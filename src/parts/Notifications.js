import React, { Component } from 'react';
import {
    Image,
    ImageBackground,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Constants from "expo-constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PushNotifications from "./PushNotifications";
import SwitchToggle from "react-native-switch-toggle";

export default class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resilience: false,
            sustainable: false,
            biodiversity: false,
            COVID: false,
            bi_calendar: false,
        }
    }

    componentDidMount(){
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
        return (
            <View style={styles.conta}>
                <StatusBar
                    barStyle={'default'}
                    backgroundColor={'rgba(0,99,175,1)'}
                />
                <StatusBar barStyle={'default'} />
                <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: 'rgba(0,99,175,1)' }} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <View style={ styles.imagebox }>
                        <Image
                            resizeMode='cover'
                            style={ styles.image }
                            source={ require ('../../assets/img/back.png') }

                        />
                        <Text style={styles.tit}>Notifications</Text>
                    </View>
                </TouchableOpacity>
                <ImageBackground
                    style={styles.container}
                >
                    <Text style={styles.welcome}>
                        For which topics do you want to receive notifications?
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
                            <View style = {styles.switch}>
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
                                    switchOn={this.state.resilience ? true : false}
                                    onPress={(_) => this.setState({ resilience: !this.state.resilience })}
                                    circleColorOff='#0063AF'
                                    circleColorOn='#ffffff'
                                    backgroundColorOn='#1E2459'
                                    backgroundColorOff='#1E2459'
                                    duration={150}
                                    value={this.state.resilience}
                                    onValueChange={(value) => this.toggleSwitch(['resilience', value])}
                                />
                            </View>
                        </View>
                        <View style={styles.optionsRow}>
                            <Image
                                style = {styles.icon}
                                source = { require ('../../assets/img/sustainable.png') }
                            />
                            <Text style = {styles.name}>
                                Sustainable Energy
                            </Text>
                            <View style = {styles.switch}>
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
                                    switchOn={this.state.sustainable ? true : false}
                                    onPress={(_) => this.setState({ sustainable: !this.state.sustainable })}
                                    circleColorOff='#0063AF'
                                    circleColorOn='#ffffff'
                                    backgroundColorOn='#1E2459'
                                    backgroundColorOff='#1E2459'
                                    duration={150}
                                    value={this.state.sustainable}
                                    onValueChange={(value) => this.toggleSwitch(['sustainable', value])}
                                />
                            </View>
                        </View>
                        <View style={styles.optionsRow}>
                            <Image
                                style = {styles.icon}
                                source = { require ('../../assets/img/biodiversity.png') }
                            />
                            <Text style = {styles.name}>
                                {"Marine\nBiodiversity"}
                            </Text>
                            <View style = {styles.switch}>
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
                                    switchOn={this.state.biodiversity ? true : false}
                                    onPress={(_) => this.setState({ biodiversity: !this.state.biodiversity })}
                                    circleColorOff='#0063AF'
                                    circleColorOn='#ffffff'
                                    backgroundColorOn='#1E2459'
                                    backgroundColorOff='#1E2459'
                                    duration={150}
                                    value={this.state.biodiversity}
                                    onValueChange={(value) => this.toggleSwitch(['biodiversity', value])}
                                />
                            </View>
                        </View>
                        <View style={styles.optionsRow}>
                            <Image
                                style = {styles.icon}
                                source = { require ('../../assets/img/COVID-19.png') }
                            />
                            <Text style = {styles.name}>
                                {"COVID-19\nResilience Response"}
                            </Text>
                            <View style = {styles.switch}>
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
                                    switchOn={this.state.COVID ? true : false}
                                    onPress={(_) => this.setState({ COVID: !this.state.COVID })}
                                    circleColorOff='#0063AF'
                                    circleColorOn='#ffffff'
                                    backgroundColorOn='#1E2459'
                                    backgroundColorOff='#1E2459'
                                    duration={150}
                                    value={this.state.COVID}
                                    onValueChange={(value) => this.toggleSwitch(['COVID', value])}
                                />
                            </View>
                        </View>
                        <View style={styles.optionsRowLast}>
                            <Image
                                style = {styles.bi_calendar2}
                                source = { require ('../../assets/img/bi_calendar2-event.png') }
                            />
                            <Text style = {styles.name}>
                                Events
                            </Text>
                            <View style = {styles.switch}>
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
                                    switchOn={this.state.bi_calendar ? true : false}
                                    onPress={(_) => this.setState({ bi_calendar: !this.state.bi_calendar })}
                                    circleColorOff='#0063AF'
                                    circleColorOn='#ffffff'
                                    backgroundColorOn='#1E2459'
                                    backgroundColorOff='#1E2459'
                                    duration={150}
                                    value={this.state.bi_calendar}
                                    onValueChange={(value) => this.toggleSwitch(['bi_calendar', value])}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.saveConfig()}
                        style={styles.touchable}>
                        <Text style={styles.touchable_text}>Save changes</Text>
                    </TouchableOpacity>
                    <Image style={styles.slider}
                           source = { require ('../../assets/img/Slider3.png') }
                    />
                </ImageBackground>
            </View>
        );
    }
}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

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
        top: hp('3.13'),
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
        top: hp('67.52'),
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
        top: hp('17.75'),
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
    },

    conta: {
        height: hp('100'),
        backgroundColor: 'rgba(0,99,175,1)',
    },
    imagebox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingLeft: 24,
        borderBottomColor: '#039AC4',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: hp('1.62'),
        lineHeight: hp('2.2'),
        flex: 1,
        justifyContent: 'flex-end',
    },
    tit: {
        fontSize: hp('1.62'),
        lineHeight: hp('2.2'),
        color: '#FFFFFF',
        fontWeight: '700',
        marginHorizontal: wp('24')
    },
    switch: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
})