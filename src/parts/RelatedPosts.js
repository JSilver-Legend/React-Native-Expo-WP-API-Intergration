import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PostPreviewSmall from './PostPreviewSmall';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Font from "expo-font";

export default class RelatedPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme_name: props.theme_name,
            post_id: props.post_id,
            isLoading: true,
            relPosts: []
        }
    }

    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            Font.loadAsync({
                'OpenSansRegular': require('../../assets/fonts/OpenSans-Regular.ttf'),
            });
            this.setState({ isLoading: true })
        }
        this.getRelatedPosts()
    }

    getRelatedPosts() {
        let url =
            this.state.theme_name === undefined?
                'https://resembid.org/wp-json/resembid/v1/tribe_events?per_page=3':
                'https://resembid.org/wp-json/resembid/v1/posts?categories=' + this.state.theme_name + '&per_page=3'
        return fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length) {
                    this.setState({
                        relPosts: responseJson,
                        isLoading: false
                    })
                }
                else this.setState({
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderPosts() {
        return this.state.relPosts.map((item) => {
            if(item.ID != this.state.post_id) {
                return (
                    <PostPreviewSmall key={item.ID} postData={item} nav={this.props.navigate} />
                );
            }
        });
    }

    content () {
        if (this.state.isLoading){
            return (
                <View>
                    <ActivityIndicator size="large" color="#3da2c0" />
                </View>
            )
        } else if(this.state.relPosts.length > 1){
            return (
                <View style={ styles.relContainer}>
                    <Text style={ styles.relTitle}>Related articles</Text>
                    <View style={{marginHorizontal: -wp('5.53%'),paddingBottom: hp('6.47%'),}}>
                        { this.renderPosts() }
                    </View>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    render() {
        return this.content();
    }
}

const styles = StyleSheet.create({
    relContainer: {
        paddingTop: hp('6.65')
    },

    relTitle: {
        fontFamily: 'OpenSansRegular',
        fontWeight: '700',
        fontSize: hp('2'),
        lineHeight: hp('2.31'),
        color: '#025578',
        marginBottom: hp('2.18'),
    }
})