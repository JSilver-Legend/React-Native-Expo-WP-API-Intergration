import React, { Component } from 'react';
import { 
    View, 
    Image, 
    TouchableOpacity,
    StyleSheet, 
    Animated, 
    Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import RBSheet from 'react-native-raw-bottom-sheet'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: props.nav,
            all: false,
            resilience: false,
            sustainable: false,
            biodiversity: false,
            COVID: false,
            bi_calendar: false,
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
                <View style={styles.buttons}>
                    <TouchableOpacity
                        onPress={() => this.RBSheet.open()}
                    >
                        <Image
                            style = { styles.icon }
                            source = { require ('../../assets/img/icon/filter.png') }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.userButton}
                        onPress={()=> this.state.nav.navigate('Infos')}
                    >
                        <Image
                            style = { styles.icon }
                            source = { require ('../../assets/img/icon/account.png') }
                        />
                    </TouchableOpacity>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={hp('95')}
                        openDuration={300}
                        customStyles={{
                            container: {
                            alignItems: "center",
                            borderRadius: 25,
                            }
                        }}
                    >
                        <View style={styles.bottombody}>
                            <View style={styles.bottomheader}>
                                <TouchableOpacity>
                                    <Text style={ styles.buttonTextLight }>{"Reset"}</Text>
                                </TouchableOpacity>
                                <Text style={ styles.buttonTextMiddle }>{"Filter"}</Text>
                                <TouchableOpacity>
                                    <Text style={ styles.buttonTextLight }>{"close"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content}>
                                <View style={styles.category}>
                                    <View style={styles.categoryHeader}>
                                        <Text style={ styles.label1 }>{"Topics"}</Text>
                                        <Text style={ styles.buttonTextMiddle }>{"Select one or more"}</Text>
                                    </View>
                                    <View style={styles.categoryContent}>
                                        <View style={styles.categoryButtons}>
                                            <TouchableOpacity
                                                style={ styles.categoryIcon}
                                                onPress={()=> this.setState({ all: !this.state.all })}
                                            >
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.all ? "none" : "flex"}] }
                                                    source = { require ('../../assets/img/bottom-icon/All.png') }
                                                />
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.all ? "flex" : "none"}] }
                                                    source = { require ('../../assets/img/bottom-icon/All-active.png') }
                                                />
                                                <Text style={ [styles.iconButton, {display: this.state.all ? "none" : "flex"}] }>{"All"}</Text>
                                                <Text style={ [styles.iconButtonAll, {display: this.state.all ? "flex" : "none"}] }>{"All"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={ styles.categoryIcon}
                                                onPress={()=> this.setState({ resilience: !this.state.resilience })}
                                            >
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.resilience ? "none" : "flex"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Resilience.png') }
                                                />
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.resilience ? "flex" : "none"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Resilience-active.png') }
                                                />
                                                <Text style={ [styles.iconButton, {display: this.state.resilience ? "none" : "flex"}] }>{"Resilience"}</Text>
                                                <Text style={ [styles.iconButtonResilience, {display: this.state.resilience ? "flex" : "none"}] }>{"Resilience"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={ styles.categoryIcon}
                                                onPress={()=> this.setState({ sustainable: !this.state.sustainable })}
                                            >
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.sustainable ? "none" : "flex"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Energy.png') }
                                                />
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.sustainable ? "flex" : "none"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Energy-active.png') }
                                                />
                                                <Text style={ [styles.iconButton, {display: this.state.sustainable ? "none" : "flex"}] }>{"Sustainable\nEnergy"}</Text>
                                                <Text style={ [styles.iconButtonSustainable, {display: this.state.sustainable ? "flex" : "none"}] }>{"Sustainable\nEnergy"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.categoryButtons}>
                                            <TouchableOpacity
                                                style={ styles.categoryIcon}
                                                onPress={()=> this.setState({ biodiversity: !this.state.biodiversity })}
                                            >
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.biodiversity ? "none" : "flex"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Marine.png') }
                                                />
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.biodiversity ? "flex" : "none"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Marine-active.png') }
                                                />
                                                <Text style={ [styles.iconButton, {display: this.state.biodiversity ? "none" : "flex"}] }>{"Marine\nBiodiversity"}</Text>
                                                <Text style={ [styles.iconButtonBiodiversity, {display: this.state.biodiversity ? "flex" : "none"}] }>{"Marine\nBiodiversity"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={ styles.categoryIcon}
                                                onPress={()=> this.setState({ COVID: !this.state.COVID })}
                                            >
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.COVID ? "none" : "flex"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Covid.png') }
                                                />
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.COVID ? "flex" : "none"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Covid-active.png') }
                                                />
                                                <Text style={ [styles.iconButton, {display: this.state.COVID ? "none" : "flex"}] }>{"COVID"}</Text>
                                                <Text style={ [styles.iconButtonCOVID, {display: this.state.COVID ? "flex" : "none"}] }>{"COVID"}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={ styles.categoryIcon}
                                                onPress={()=> this.setState({ bi_calendar: !this.state.bi_calendar })}
                                            >
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.bi_calendar ? "none" : "flex"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Events.png') }
                                                />
                                                <Image
                                                    style = { [styles.categoryIconSize, {display: this.state.bi_calendar ? "flex" : "none"}] }
                                                    source = { require ('../../assets/img/bottom-icon/Events-active.png') }
                                                />
                                                <Text style={ [styles.iconButton, {display: this.state.bi_calendar ? "none" : "flex"}] }>{"Events"}</Text>
                                                <Text style={ [styles.iconButtonEvents, {display: this.state.bi_calendar ? "flex" : "none"}] }>{"Events"}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.country}>
                                    <Text style={ styles.label1 }>{"Country"}</Text>
                                    <Text style={ styles.buttonTextMiddle }>{"Select one or more"}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.buttonContent}>
                                        <Text style={ styles.buttonLabel }>{"Apply filters( )"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </RBSheet>
                </View>
            </View>
        );
    }
}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight; 

const styles = StyleSheet.create({
    iconButton: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#929292',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    iconButtonAll: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#1E2459',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    iconButtonResilience: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#8B5737',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    iconButtonSustainable: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#9AA739',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    iconButtonBiodiversity: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#0063AF',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    iconButtonCOVID: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#D36477',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    iconButtonEvents: {
        textAlign: 'center',
        paddingTop: 5,
        color: '#F09E48',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14
    },
    categoryHeader: {

    },
    categoryContent: {
        paddingTop: 37,
        paddingHorizontal: 32
    },
    categoryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    categoryIcon: {
        width: 72,
        height: 92,
        alignItems: 'center'
    },
    categoryIconSize: {
        width: 56,
        height: 56
    },
    buttonContent: {
        backgroundColor: '#0063AF',
        width: '100%',
        height: 50,
        borderRadius: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLabel: {
        color: '#ffffff',
        // fontFamily: 'DMSans',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 18,
    },
    buttonTextMiddle: {
        color: '#929292',
        fontSize: 12,
        fontFamily: 'OpenSans',
        fontWeight: '600',
        lineHeight: 14
    },
    category: {
        paddingTop: 25,
    },
    country: {
        paddingTop: 20,
    },
    bottombody: {
        width: '100%'
    },
    content: {
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24
    },
    bottomheader: {
        paddingLeft: 24,
        paddingRight: 26,
        paddingBottom: 8,
        paddingTop: 17,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#F2F2F2',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    buttontext1: {
        color: '#929292',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'OpenSans',
        fontStyle: 'normal'
    },
    buttontext2: {
        color: '#929292',
        fontWeight: '700',
        fontSize: 14,
        fontFamily: 'OpenSansBold',
        lineHeight: 22,
        fontStyle: 'normal'
    },
    label1: {
        color: '#0063AF',
        fontFamily: 'OpenSans',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 22
    },
    label2: {
        color: '#929292',
        fontFamily: 'OpenSans',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 14,
    },
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
        width: 132,
        resizeMode: 'contain',
        height: 30
    },

    userButton: {
        width: 50,
        alignItems: 'flex-end',
        // paddingVertical: 10
    },

    icon: {
        width: 40,
        height: 40
    },

    buttons: {
        flexDirection: 'row',
    }
});