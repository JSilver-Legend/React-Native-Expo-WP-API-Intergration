import React, { Component } from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Constants from "expo-constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle={'default'}
                    backgroundColor={'rgba(0,99,175,1)'}
                />
                <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: 'rgba(0,99,175,1)' }} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <View style={ styles.imagebox }>
                        <Image
                            resizeMode='cover'
                            style={ styles.image }
                            source={ require ('../../assets/img/back.png') }

                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications')}>
                    <View style={styles.optionsRow}>
                        <Image
                            resizeMode='cover'
                            style={ styles.icon }
                            source={ require ('../../assets/img/Frame15.png') }

                        />
                        <Text style={styles.text}>Notifications</Text>
                        <Image
                            resizeMode='cover'
                            style={ styles.vector }
                            source={ require ('../../assets/img/Vector2.png') }

                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
                    <View style={styles.optionsRow}>
                        <Image
                            resizeMode='cover'
                            style={ styles.icon }
                            source={ require ('../../assets/img/Frame16.png') }

                        />
                        <Text style={styles.text}>About RESEMBID</Text>
                        <Image
                            resizeMode='cover'
                            style={ styles.vector }
                            source={ require ('../../assets/img/Vector2.png') }

                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Resources')}>
                    <View style={styles.optionsRow}>
                        <Image
                            resizeMode='cover'
                            style={ styles.icon }
                            source={ require ('../../assets/img/Frame17.png') }

                        />
                        <Text style={styles.text}>Resources</Text>
                        <Image
                            resizeMode='cover'
                            style={ styles.vector }
                            source={ require ('../../assets/img/Vector2.png') }

                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const styles = StyleSheet.create({
    container: {
        height: hp('100'),
        backgroundColor: 'rgba(0,99,175,1)',
    },
    imagebox: {
        padding: 16,
        paddingLeft: 24,
        borderBottomColor: '#039AC4',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('6.4'),
        borderBottomColor: '#039AC4',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    icon: {
        marginRight: wp('4.53')
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: hp('1.62'),
        lineHeight: hp('2.2'),
        flex: 1,
        justifyContent: 'flex-end',
    }
});