import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Share,
    Linking,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import Moment from "react-moment";
import RelatedPosts from '../parts/RelatedPosts';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.route.params.postData.post,
            post_image: props.route.params.postData.image,
            category: props.route.params.postData.category,
            nav: props.navigation,
        }

    }

    onShare = async() => {
        Share.share(
            {
                image: 'https://resembid.org' + this.state.post_image,
                title: this.state.post.post_title,
                message: this.state.post.post_title,
                url: this.state.post.guid
            }
        ).then(({action, activityType}) => {
            if(action === Share.sharedAction)
                console.log('Share was successful');
            else
                console.log('Share was dismissed');
        });
    }

    post_content;
    post_author;

    render() {
        let source = {
            html: this.state.post.post_content
        };
            return (
                <View>
                    <StatusBar
                        barStyle={'dark-content'}
                        backgroundColor={'#FFFFFF'}
                    />
                    {/*<View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#3da2c0' }} />*/}
                    <ScrollView>
                        <View style={ styles.mainImageBox }>
                            <Image
                                style={ styles.mainImage }
                                source={{uri: 'https://resembid.org' + this.state.post_image}}
                            />
                            <View style={ styles.btnCont}>
                                <TouchableOpacity
                                    style= { styles.btn}
                                    onPress={()=> this.state.nav.navigate('All')}
                                >
                                    <Image
                                        source = { require('../../assets/img/back.png') }
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style= { styles.btn}
                                    onPress={()=> this.onShare()}
                                >
                                    <Image
                                        source = { require('../../assets/img/share_btn.png') }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={bg.st[this.state.category.slug]}>
                                <Image
                                    style={ styles.icon }
                                    source = {icons[this.state.category.slug]}
                                />
                                <Text style={ styles.text }>{this.state.category.name}</Text>
                            </View>
                        </View>
                        <View style={ styles.content }>
                            <Text style={ styles.title }>{this.state.post.post_title}</Text>
                            <View style={ styles.dateBox }>
                                <Image
                                    style = { styles.type_icon }
                                    source = {type_icons[this.state.post.post_type]}
                                    resizeMode = 'contain'
                                />
                                <Text style={ styles.date }>{this.state.post.post_type}, </Text>
                                <Moment element={Text} style={ styles.date }>{ this.state.post.post_date }</Moment>
                            </View>
                            <View style={ styles.contentInner }>
                                <HTML
                                    source={ source }
                                    tagsStyles = {
                                        {
                                            p: {
                                                fontFamily: 'OpenSansBold',
                                                fontWeight: 'bold',
                                                fontSize: hp('1.72'),
                                                color: '#4E5A5F',
                                                lineHeight: hp('2.71'),
                                                paddingBottom: 1
                                            },
                                            h2: {
                                                fontFamily: 'OpenSansBold',
                                                fontWeight: 'bold',
                                                color: '#4E5A5F',
                                                paddingBottom: 1
                                            },
                                            text: {
                                                color: '#000000'
                                            }
                                        }
                                    }
                                    onLinkPress = {(evt, href) => {Linking.openURL(href)}}
                                />
                            </View>
                            <View style={ styles.contentTea }>
                                <Image style={{ width: 32, height: 32 }} source = { require ('../../assets/img/icon/account.png') } />
                                <Text style={{ paddingLeft: wp('2.35') }}>By {this.state.post.post_author}</Text>
                            </View>
                            <RelatedPosts navigate={this.state.nav} theme_name={this.state.post.categories.cat_ID} post_id={this.state.post.ID} />
                        </View>
                    </ScrollView>
                </View>
            )
    }
}

const icons = {
    'covid-19': require('../../assets/img/COVID-19.png'),
    resilience: require('../../assets/img/Resilience.png'),
    'sustainable-energy': require('../../assets/img/sustainable.png'),
    Eau: require('../../assets/img/Icon-Resilience.png'),
    'marine-biodiversity': require('../../assets/img/biodiversity.png'),
    Agriculture: require('../../assets/img/Icon-COVID-19.png'),
    events: require('../../assets/img/bi_calendar2-event.png'),
}

const type_icons = {
    post: require('../../assets/img/text.png'),
    tribe_events: require('../../assets/img/text.png')
}

const bg = {
    st: {
        resilience: {
            flex: 1,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.48'),
            paddingHorizontal: wp('6.4'),
            backgroundColor: '#8B5737',
            borderRadius: wp('10.67'),
            overflow: 'hidden',
            position: 'absolute',
            top: hp('26.17')
        },
        'sustainable-energy': {
            flex: 1,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.48'),
            paddingHorizontal: wp('6.4'),
            backgroundColor: '#64AB46',
            borderRadius: wp('10.67'),
            overflow: 'hidden',
            position: 'absolute',
            top: hp('26.17')
        },
        'marine-biodiversity': {
            flex: 1,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.48'),
            paddingHorizontal: wp('6.4'),
            backgroundColor: '#0379AB',
            borderRadius: wp('10.67'),
            overflow: 'hidden',
            position: 'absolute',
            top: hp('26.17')
        },
        'covid-19': {
            flex: 1,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.48'),
            paddingHorizontal: wp('6.4'),
            backgroundColor: '#ff5757',
            borderRadius: wp('10.67'),
            overflow: 'hidden',
            position: 'absolute',
            top: hp('26.17')
        },
        events: {
            flex: 1,
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp('1.48'),
            paddingHorizontal: wp('6.4'),
            backgroundColor: '#F09E48',
            borderRadius: wp('10.67'),
            overflow: 'hidden',
            position: 'absolute',
            top: hp('26.17')
        }
    }
}

const styles = StyleSheet.create({
    dateBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('1.72'),
    },
    date: {
        fontSize: hp('1.23'),
        color: '#7E8E95',
        lineHeight: hp('1.35'),
        textAlignVertical: 'center',
        textTransform: 'capitalize'
    },
    type_icon: {
        width: 9,
        marginRight: 8
    },
    icon: {
        width: wp('6.93'),
        height: hp('3.15'),
        marginRight: wp('2.67')
    },
    text: {
        fontFamily: 'OpenSansBold',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 19,
        color: '#FFFFFF'
    },
    tagview: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: hp('26.17')
    },
    mainImageBox : {
        width: wp('100'),
        height: hp('29.04'),
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: {
        width: wp('100'),
        height: hp('29.04'),
        borderBottomLeftRadius: 117.93,
        borderBottomRightRadius: 117.93
    },
    btnCont: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('6.4'),
        position: 'absolute',
        top: 49
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('5.17'),
        width: hp('5.17'),
        borderRadius: 9999,
        backgroundColor: '#c5dee880',
    },
    content: {
        paddingHorizontal: wp('6.67'),
        marginTop: hp('5.54'),
    },
    title: {
        fontFamily: 'OpenSansBold',
        fontWeight: 'bold',
        fontSize: hp('2.96'),
        color: '#025578',
        lineHeight: hp('4.06'),
        textAlign: 'center'
    },
    subTitle: {
        // fontFamily: 'medium',
        fontSize: hp('3.23%'),
        color: '#706f6f',
        lineHeight: hp('3.5%'),
        marginBottom: hp('4.41%'),
        paddingTop: hp('6.61%')
    },
    backCont: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        height: hp('2.35%')
    },
    back: {
        color: '#000',
        // fontFamily: 'bold',
        fontSize: hp('2.35%'),
        lineHeight: hp('2.35%'),
        textAlignVertical: "center"
    },
    contentTea: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: hp('11.64'),
        fontFamily: 'OpenSans',
        fontWeight: '400',
        fontSize: hp('1.21'),
        color: '#7E8E95',
        lineHeight: hp('1.36')
    }
});