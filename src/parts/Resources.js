import React, { Component } from 'react';
import {
    Image,
    useWindowDimensions ,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    View
} from "react-native";
import Constants from "expo-constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HTML from 'react-native-render-html';

export default class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            post: null,
        }
    }

    componentDidMount() {
        this.getResources();
    }

    getResources = () => {
        return fetch('https://resembid.org/wp-json/wp/v2/pages/2741')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    post: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="rgba(0,99,175,1)" />
                </View>
            )
        } else {
            var htmlString = "";
            htmlString = this.state.post.content.rendered.toString();
            return (
                <View style={styles.conta}>
                    <StatusBar barStyle={'default'}/>
                    <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: 'rgba(0,99,175,1)'}}/>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <View style={styles.imagebox}>
                            <Image
                                resizeMode='cover'
                                style={styles.image}
                                source={require('../../assets/img/back.png')}

                            />
                            <Text style={styles.tit}>{this.state.post.title.rendered}</Text>
                        </View>
                    </TouchableOpacity>
                    <ScrollView style={styles.ScrollView}>
                        <HTML 
                        source={{html: htmlString.split('/wp-content/').join('https://resembid.org/wp-content/')}}
                        tagsStyles = {{
                            img: {
                                marginHorizontal: 15,
                            },
                            div: {
                                minWidth: wp('100')
                            },
                            h3:{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                width: wp('85'),
                                fontSize: hp('2.78'),
                            },
                            a: {
                                paddingHorizontal: wp('1.97'),
                                paddingVertical: hp('1.97'),
                                backgroundColor: '#f09a3e',
                                color: '#ffffff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                width: wp('85'),

                            }
                        }}
                        />
                    </ScrollView>
                </View>
            )
        }
    }
}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const styles = StyleSheet.create({
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
    contentInner: {
        width: wp('100'),
        height: hp('100')
    },
    ScrollView: {
        flex: 1,
        minWidth: wp('100'),
        backgroundColor: '#ffffff'
    },
})