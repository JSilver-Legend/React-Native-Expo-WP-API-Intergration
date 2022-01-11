import React, { Component } from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc
} from 'react-native-responsive-screen';
import TypeAndDate from './PostTypeAndDate';
import ThemeIcon from '../parts/ThemeIcon';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default class ItemBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.postData,
            nav: props.nav,
            theme_name: props.theme_name,
            isLoading: true,
        }
    }

    componentDidMount() {
        this.loadAssetsAsync();
        loc(this);
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
            OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
        })
        this.setState({ fontLoaded: true })
    }

    post_title;
    featured_media;
    post_date;
    post_type;

    render(){
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <TouchableOpacity
                onPress={() => this.state.nav.navigate('Post', {
                    postData: {
                        post: this.state.post,
                        image: this.state.post.featured_media,
                        category: {
                            name: this.state.post.categories.name,
                            slug: this.state.post.categories.slug
                        }
                    },
                })}
            >
                <View style={styles.item}>
                    <View style={styles.imagebox}>
                        <Image
                            resizeMode='cover'
                            style={styles.image}
                            source={{uri: 'https://resembid.org' + this.state.post.featured_media}}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <View style={styles.tagview}>
                            <Text style={bg.st[this.state.post.categories.slug]}>{this.state.post.categories.name}</Text>
                        </View>
                        <Text style={styles.title}>{this.state.post.post_title}</Text>
                        <TypeAndDate type={this.state.post.post_type} date={this.state.post.post_date}/>
                    </View>
                    <View>
                        <ThemeIcon theme={this.state.post.categories.slug} size={'iconBig'}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('33.94'),
        margin: hp('2.78'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('0.93%'),
        flexDirection: 'column',
        shadowColor: '#c5dee866',
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        overflow: 'hidden'
    },
    item: {
            height: hp('33.94'),
            margin: hp('2.78'),
            backgroundColor: '#FFFFFF',
            borderRadius: hp('0.93%'),
            flexDirection: 'column',
            shadowColor: '#c5dee866',
            shadowRadius: 4,
            shadowOffset: {
                width: 0,
                height: 2
            },
            overflow: 'hidden'
        },
    imagebox: {
        width: wp('87.9'),
        position: 'relative',
        height: hp('17.46'),
        marginBottom: hp('1.84'),
        overflow: 'hidden',
    },
    image: {
        height: hp('28%'),
        width: '100%'
    },
    tag: {
        flex: 0,
        fontFamily: 'OpenSansBold',
        fontWeight: 'bold',
        marginHorizontal: wp('4'),
        paddingVertical: hp('1'),
        fontSize: hp('1.16'),
        lineHeight: wp('2.93'),
        textTransform: 'uppercase',
        color: '#FF5757',
        flexDirection: "column",
        paddingHorizontal: wp('3.6'),
        borderRadius: wp('4.26'),
        overflow: 'hidden',
        backgroundColor: '#ff57571a',
    },
    title: {
        fontSize: hp('1.86'),
        lineHeight: wp('5.6'),
        marginLeft: wp('4.27'),
        marginTop: hp('1.39'),
        marginBottom: hp('0.7'),
        color: '#4E5A5F',
        fontWeight: 'bold',
        fontFamily: 'OpenSansBold',
        minHeight: hp('3.71'),
        // maxHeight: hp('3.71'),
    },
    tagview: {
        flexDirection: 'row'
    },
});

const bg = {
    st: {
        resilience: {
            backgroundColor: '#8B57371a',
            color: '#8B5737',
            flex: 0,
            fontFamily: 'OpenSansBold',
            fontWeight: 'bold',
            marginHorizontal: wp('4'),
            paddingVertical: hp('1'),
            fontSize: hp('1.16'),
            lineHeight: wp('2.93'),
            textTransform: 'uppercase',
            flexDirection: "column",
            paddingHorizontal: wp('3.6'),
            borderRadius: wp('4.26'),
            overflow: 'hidden',
        },
        'sustainable-energy': {
            backgroundColor: '#64AB461a',
            color: '#64AB46',
            flex: 0,
            fontFamily: 'OpenSansBold',
            fontWeight: 'bold',
            marginHorizontal: wp('4'),
            paddingVertical: hp('1'),
            fontSize: hp('1.16'),
            lineHeight: wp('2.93'),
            textTransform: 'uppercase',
            flexDirection: "column",
            paddingHorizontal: wp('3.6'),
            borderRadius: wp('4.26'),
            overflow: 'hidden',
        },
        'marine-biodiversity': {
            backgroundColor: '#0379AB1a',
            color: '#0379AB',
            flex: 0,
            fontFamily: 'OpenSansBold',
            fontWeight: 'bold',
            marginHorizontal: wp('4'),
            paddingVertical: hp('1'),
            fontSize: hp('1.16'),
            lineHeight: wp('2.93'),
            textTransform: 'uppercase',
            flexDirection: "column",
            paddingHorizontal: wp('3.6'),
            borderRadius: wp('4.26'),
            overflow: 'hidden',
        },
        'covid-19': {
            backgroundColor: '#ff57571a',
            color: '#ff5757',
            flex: 0,
            fontFamily: 'OpenSansBold',
            fontWeight: 'bold',
            marginHorizontal: wp('4'),
            paddingVertical: hp('1'),
            fontSize: hp('1.16'),
            lineHeight: wp('2.93'),
            textTransform: 'uppercase',
            flexDirection: "column",
            paddingHorizontal: wp('3.6'),
            borderRadius: wp('4.26'),
            overflow: 'hidden',
        },
        events: {
            backgroundColor: '#F09E481a',
            color: '#F09E48',
            flex: 0,
            fontFamily: 'OpenSansBold',
            fontWeight: 'bold',
            marginHorizontal: wp('4'),
            paddingVertical: hp('1'),
            fontSize: hp('1.16'),
            lineHeight: wp('2.93'),
            textTransform: 'uppercase',
            flexDirection: "column",
            paddingHorizontal: wp('3.6'),
            borderRadius: wp('4.26'),
            overflow: 'hidden',
        }
    }
}