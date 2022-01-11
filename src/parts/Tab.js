import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PostPreviewSmall from './PostPreviewSmall';
import PostPreviewBig from './PostPreviewBig';

export default class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            tab: props.tabLabel,
            theme_name: props.postsData,
            posts: [],
            func: props.func,
            refreshing: false,
            page: 1,
            postPerPage: 4,
            seed: 1
        }
    }

    componentDidMount() {
        this.getPostsByTheme();
    }

    getPostsByTheme = () => {
        let dd = this.state.func.includes('?')?'&':'?';
        let offset = 0;
        if(this.state.page !== 1)
            offset = (this.state.page-1) * this.state.postPerPage;
        return fetch('https://resembid.org/wp-json/resembid/v1/' + this.state.func + dd + 'page=' + this.state.page + '&offset=' + offset + '&per_page=' + this.state.postPerPage, {
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

    render() {
        if (this.state.isLoading){
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f7f7f7',
                    minHeight: '100%',
                    maxHeight: '100%'
                }}>
                    <ActivityIndicator size="large" color="#3da2c0" />
                </View>
            )
        } else {
            if(this.state.posts) {
                return (
                <View style={ styles.container }>
                    <FlatList
                        data={this.state.posts}
                        renderItem={({ item, index }) => (
                            index == 0 ?
                            <PostPreviewBig postData={item} nav={this.props.navigate} theme_name={this.state.theme_name} /> :
                            <PostPreviewSmall postData={item} nav={this.props.navigate} theme_name={this.state.theme_name} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing ={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        onEndReached={this.handleLoadMore}
                        onEndReachedThreshold={0.02}
                    />
                </View>
                );
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp('1.94%'),
        backgroundColor: '#f7f7f7',
        minHeight: '100%',
        maxHeight: '100%'
    }
});