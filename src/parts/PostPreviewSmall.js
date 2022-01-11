import React, { Component } from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as loc
} from 'react-native-responsive-screen';
import ThemeIcon from '../parts/ThemeIcon';
import TypeAndDate from './PostTypeAndDate';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.postData,
            nav: props.nav,
            theme_name: props.theme_name,
            category: [],
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
                onPress={() =>
                    this.state.nav.navigate('Post', {
                    postData: {
                        post: this.state.post,
                        image: this.state.post.featured_media,
                        category: {
                            name: this.state.post.categories.name,
                            slug: this.state.post.categories.slug
                        }
                    },
                })
                }
            >
                <View style={styles.item}>
                    <View style={styles.imagebox}>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://resembid.org' + this.state.post.featured_media}}
                        />
                    </View>
                    <View style={styles.left}>
                        <View style={styles.tagview}>
                            <Text style={bg.st[this.state.post.categories.slug]}>
                                {this.state.post.categories.name}
                            </Text>
                        </View>
                        <Text style={styles.title}>{this.state.post.post_title}</Text>
                        <TypeAndDate type={this.state.post.post_type} date={this.state.post.post_date}/>
                    </View>
                    <View>
                        <ThemeIcon theme={this.state.post.categories.slug} size={'iconSmall'}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        width: wp('86.93'),
        marginHorizontal: hp('2.78'),
        marginBottom: hp('1.86'),
        height: hp('15.28'),
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        width: wp('86.93'),
        marginHorizontal: hp('2.78'),
        marginBottom: hp('1.86'),
        height: hp('15.28'),
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        overflow: 'hidden',
    },

    left: {
        flex: 1,
        paddingRight: wp('9.6%')
    },

    title: {
        fontSize: hp('1.62'),
        color: '#4E5A5F',
        lineHeight: hp('2.2'),
        paddingTop: hp('0.93'),
        paddingHorizontal: wp('5.33'),
        height: 38
    },

    imagebox: {
        position: 'relative',
        height: hp('15.28'),
        width: wp('24.53'),
        overflow: 'hidden',
        backgroundColor: '#eeeeee',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    image: {
        height: hp('15.28'),
        width: wp('24.53')
    },

    iconbox: {
        backgroundColor: '#52bbb5',
        height: 46,
        width: 46,
        borderRadius: 9999,
        position: 'absolute',
        bottom: -23,
        right: -23
    },

    themeIcon: {
        position: 'absolute',
        width: 10,
        height: 10,
        left: 10,
        top: 8,
    },
    tagview: {
        flexDirection: 'row',
        paddingTop: hp('2.16')
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