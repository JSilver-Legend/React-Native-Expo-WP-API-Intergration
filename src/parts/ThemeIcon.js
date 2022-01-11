import React, { Component } from 'react';
import { View, Image } from 'react-native';

const icons = {
    'covid-19': require('../../assets/img/icon/covid_post.png'),
    resilience: require('../../assets/img/icon/resilience_post.png'),
    'sustainable-energy': require('../../assets/img/icon/sustainable_energy_post.png'),
    'marine-biodiversity': require('../../assets/img/icon/marine_biodiversity_post.png'),
    events: require('../../assets/img/icon/events_post.png'),
}

export default class ThemeIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme,
            iconSize: props.size
        }
    }

    render() {
        return (
            <View style={[icon[this.state.iconSize].box, styles[this.state.theme]]}>
                <Image
                    resizeMode='contain'
                    style={ icon[this.state.iconSize].icon }
                    source={icons[this.state.theme]}
                />
            </View>
        )
    }
}

const icon = {
    iconBig: {
        box: {
            height: 122.26,
            width: 122.26,
            borderTopLeftRadius: 9999,
            borderTopRightRadius: 9999,
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            position: 'absolute',
            bottom: -85,
            right: -55,
            opacity: 10,
        },
    
        icon: {
            position: 'absolute',
            width: 33.28,
            height: 33.28,
            left: 25,
            top: 18
        }
    },

    iconSmall: {
        box: {
            height: 80,
            width: 80,
            borderTopLeftRadius: 9999,
            borderTopRightRadius: 9999,
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            position: 'absolute',
            bottom: -45,
            right: -45,
        },
    
        icon: {
            position: 'absolute',
            width: 23.98,
            height: 23.98,
            left: 10,
            top: 8,
        }
    }
}

const styles = {
    'covid-19': {
        backgroundColor: '#ff57571a'
    },

    resilience: {
        backgroundColor: '#8b57371a'
    },
    'sustainable-energy': {
        backgroundColor: '#64ab461a'
    },

    'marine-biodiversity': {
        backgroundColor: '#0379AB1a'
    },
    events: {
        backgroundColor: '#F09E481a',
    },
}