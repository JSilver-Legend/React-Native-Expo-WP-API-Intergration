import React, { Component } from 'react';
import { ScrollableTabView, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import Tab from './Tab';

let colors= {
    0: '#039AC4',
    1: '#8B5737',
    2: '#64AB46',
    3: '#0379AB',
    4: '#FF5757',
    5: '#F09E48'
}

export default class Content extends Component {


    constructor(props){
        super(props);
        this.state = {
            nav: props.navigate,
            currentTab: colors[this.props.currentPage?this.props.currentPage:0],
            currentPage: this.props.currentPage?this.props.currentPage:0,
            themes: []
        }
    }

    onChangeTab = (tab) => {
        if(tab){
            this.setState({
                currentTab: colors[tab.i],
                currentPage: tab.i
            })
        } else {
            return;
        }
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
                ref={(tabView) => { this.tabView = tabView; }}
                tabBarBackgroundColor='#fff'
                tabBarInactiveTextColor='#7E8E95'
                tabBarUnderlineStyle={{ backgroundColor: this.state.currentTab }}
                tabBarActiveTextColor = {this.state.currentTab}
                showsHorizontalScrollIndicator={false}
                tabBarTextStyle={{ fontSize: 14, lineHeight: 18, fontWeight: '700' }}
                onChangeTab = {this.onChangeTab}
                // prerenderingSiblingsNumber = '0'
                initialPage={this.state.currentPage}
            >
                <Tab key={1} tabLabel={'All'} postsData={'post'} func={'posts'} navigate={this.state.nav}/>
                <Tab key={2} tabLabel={'Resilience'} postsData={'post'} func={'posts?categories=24'} navigate={this.state.nav}/>
                <Tab key={3} tabLabel={'Sustainable Energy'} postsData={'post'} func={'posts?categories=26'} navigate={this.state.nav}/>
                <Tab key={4} tabLabel={'Marine Biodiversity'} postsData={'post'} func={'posts?categories=27'} navigate={this.state.nav}/>
                <Tab key={5} tabLabel={'COVID 19'} postsData={'post'} func={'posts?categories=28'} navigate={this.state.nav}/>
                <Tab key={6} tabLabel={'Events'} postsData={'events'} func={'tribe_events'} navigate={this.state.nav}/>
            </ScrollableTabView>
        );
    }
}