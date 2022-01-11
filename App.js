import React, {useEffect, useRef, useState} from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import * as Notifications from 'expo-notifications';

import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import All from './src/screens/All';
import Infos from './src/parts/Infos';
import NotificationsPage from './src/parts/Notifications';
import Resources from './src/parts/Resources';
import Post from './src/parts/Post';

enableScreens();
const AppStack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    return (
      <>
          <NavigationContainer>
              <AppStack.Navigator headerMode="none">
                  <AppStack.Screen name="Onboarding" component={Onboarding} />
                  <AppStack.Screen name="Home" component={Home} />
                  <AppStack.Screen name="All" component={All} />
                  <AppStack.Screen name="Infos" component={Infos} />
                  <AppStack.Screen name="Notifications" component={NotificationsPage} />
                  <AppStack.Screen name="Resources" component={Resources} />
                  <AppStack.Screen name="Post" component={Post} getId={({ params }) => params.postData.post.ID} />
              </AppStack.Navigator>
          </NavigationContainer>
      </>
  );
}