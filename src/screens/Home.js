import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    StatusBar,
    SafeAreaView,
    Image,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Header from '../parts/Header';
import Constants from 'expo-constants';
import Carousel from 'react-native-snap-carousel';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PostPreviewSmall from '../parts/PostPreviewSmall';
import PostPreviewBig from "../parts/PostPreviewBig";
import Moment from "react-moment";
import 'moment/locale/fr';
import LottieView from "lottie-react-native";
import * as Notifications from 'expo-notifications';

const icons = {
    0: require('../../assets/img/icon/all.png'),
    1: require('../../assets/img/icon/resilience.png'),
    2: require('../../assets/img/icon/sustainable_energy.png'),
    3: require('../../assets/img/icon/marine_biodiversity.png'),
    4: require('../../assets/img/icon/covid.png'),
    5: require('../../assets/img/icon/events.png'),
}

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            tab: props.tabLabel,
            theme_name: props.postsData,
            posts: [],
            refreshing: false,
            page: 1,
            postPerPage: 3,
            seed: 1,
            post: props.postData,
            nav: props.navigation,
            notification: null,
            bg: {fadeIn: new Animated.Value(0)},
            activeIndex:0,
            carouselItems: [
                {
                    color: '#0379AB',
                    text: "Marine Biodiversity",
                    category: 27,
                    nav: props.navigation
                },
                {
                    color: '#FF5757',
                    text: "COVID-19",
                    category: 28,
                    nav: props.navigation
                },
                {
                    color: '#F09E48',
                    text: "Events",
                    category: 'events',
                    nav: props.navigation
                },
                {
                    color: '#0379AB',
                    text: "All",
                    category: 25,
                    nav: props.navigation
                },
                {
                    color: '#8B5737',
                    text: "Resilience",
                    category: 24,
                    nav: props.navigation
                },
                {
                    color: '#64AB46',
                    text: "Sustainable Energy",
                    category: 26,
                    nav: props.navigation
                },
            ]
        };
    }

    componentDidMount() {
        Moment.globalFormat = 'D MMMM YYYY';
        this.setMomentLocale();
        this.getPostsByTheme();
        Notifications.addNotificationReceivedListener(this._handleNotification);
        Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    }

    _handleNotificationResponse = response => {
        if(response.notification.request.content)
            this.setState({ notification: response.notification.request.content.data });
        if(this.state.notification){
            console.log(this.state.notification.post);
            this.props.navigation.push('Post', {
                postData: {
                    post: this.state.notification.post,
                    image: this.state.notification.post.featured_media,
                    category: {
                        name: this.state.notification.post.categories.name,
                        slug: this.state.notification.post.categories.slug
                    }
                },
            });
        }
    };

    _handleNotification = notification => {
        this.setState({ notification: notification.request.content.data });
        if(this.state.notification){
            console.log(this.state.notification.post);
            this.props.navigation.push('Post', {
                postData: {
                    post: this.state.notification.post,
                    image: this.state.notification.post.featured_media,
                    category: {
                        name: this.state.notification.post.categories.name,
                        slug: this.state.notification.post.categories.slug
                    }
                },
            });
        }
    };

    getPostsByTheme = () => {
        let offset = 0;
        if(this.state.page !== 1)
            offset = (this.state.page-1) * this.state.postPerPage;
        return fetch('https://resembid.org/wp-json/resembid/v1/posts?page=' + this.state.page + '&offset=' + offset + '&per_page=' + this.state.postPerPage, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length) {
                    this.state.page === 0 ?
                        this.setState({
                            posts: responseJson,
                            isLoading: false
                        })
                        :
                        this.setState({
                            posts: this.state.posts.concat(responseJson),
                            isLoading: false
                        })
                }
                else this.setState({
                    isLoading: false
                })
            })
            .finally(()=>this.setState({refreshing: false}))
            .catch((error) => {
                console.log(error);
            });
    }

    handleRefresh = () => {
        this.setState({
                refreshing: true,
                page: 0,
                seed: this.state.seed + 1
            },
            ()=> {
                this.getPostsByTheme();
            })
    }

    handleLoadMore = () => {
        this.setState({
                page: this.state.page + 1
            },
            () =>{
                this.getPostsByTheme();
            })
    }

    _renderItem({item,index}){
        return (
            <TouchableOpacity
                onPress={() => item.nav.navigate('All', {
                    currentPage: index % 6,
                })}
                style={{ alignItems: 'center' }}
            >
                <Image style={{ width: index%6?56:64, height: index%6?56:64 }} source = { icons[index % 6] }/>
                <Text style={{
                    lineHeight: 11,
                    fontSize: 10,
                    color: item.color,
                    margin: index % 6?8:0,
                    marginBottom: 12,
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                }}>
                    {item.text}
                </Text>
            </TouchableOpacity>

        )
    }

    setMomentLocale() {
        Moment.globalLocale = 'fr';
    }

    render() {
        console.log(Constants);
        // let fadeIn = this.state.bg.fadeIn
        if (this.state.isLoading){
            return (
                <LottieView
                    style={{
                        backgroundColor: 'rgba(0,99,175,1)'
                    }}
                    loop={true}
                    autoPlay
                    source={require('../../assets/Logo.json')}
                />
            )
        } else {
            if(this.state.posts) {
                return (
                    <View style={ styles.container }>
                        <StatusBar
                            barStyle={'dark-content'}
                            backgroundColor={'#FFFFFF'}
                        />
                        <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#FFFFFF' }} />
                        <Header nav={this.state.nav}/>
                        <SafeAreaView>
                            <View style={{ textAlign: 'center', backgroundColor: '#FFFFFF' }}>
                                <Carousel
                                    layout={"default"}
                                    loop={true}
                                    inactiveSlideScale={1}
                                    ref={ (ref) => {this.carousel = ref}}
                                    data={this.state.carouselItems}
                                    sliderWidth = { wp('100') }
                                    itemWidth={86}
                                    renderItem={this._renderItem}
                                    onSnapToItem = { index => this.setState({activeIndex:index}) }
                                />
                            </View>
                        </SafeAreaView>
                        <FlatList
                            data={this.state.posts}
                            renderItem={({ item, index }) => (
                                index == 0 ?
                                    <PostPreviewBig postData={item} nav={this.state.nav} theme_name={this.state.theme_name} /> :
                                    <PostPreviewSmall postData={item} nav={this.state.nav} theme_name={this.state.theme_name} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing ={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                            onEndReached={this.handleLoadMore}
                            onEndReachedThreshold={0.5}
                        />
                    </View>
                );
            }
        }
    }
}

const STATUS_BAR_HEIGHT = Constants.platform.ios?Constants.statusBarHeight:0;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        marginBottom: '55%'
    },
});