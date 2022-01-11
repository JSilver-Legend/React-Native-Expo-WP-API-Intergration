import React, {useRef} from 'react';
import {AsyncStorage, View} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';

import Page from '../components/Page';
import PageNext from '../components/PageNext';
import PageEnd from '../components/PageEnd';


const Onboarding = () => {


    const navigation = useNavigation();
    const pagerRef = useRef(null);

    // AsyncStorage.getItem('themes')
    //     .then( value => {
    //         let parsed = JSON.parse(value)
    //         if(parsed) {
    //             if(parsed.resilience)
    //                 navigation.navigate('Home');
    //         } else {
    //             return
    //         }
    //     })
    //     .catch( (error) => {
    //         console.log(error);
    //     })

    const handlePageChange = pageNumber => {
        pagerRef.current.setPage(pageNumber);
    };

    return (
        <View style={{ flex: 1 }}>
            <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
                <View key="1">
                    <Page handlePageChange={handlePageChange} />
                </View>
                <View key="2">
                    <PageNext
                        handlePageChange={handlePageChange}
                        navigation={navigation}
                    />
                </View>
                <View key="3">
                    <PageEnd navigation={navigation} />
                </View>
            </ViewPager>
        </View>
    );
};

export default Onboarding;