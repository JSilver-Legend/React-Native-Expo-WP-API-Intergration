import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default async function registerForPushNotificationsAsync(resilience, sustainable, biodiversity, COVID, bi_calendar) {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  let param = new Object();
  param.key = token.data;
  param.resilience = resilience;
  param.sustainable = sustainable;
  param.biodiversity = biodiversity;
  param.COVID = COVID;
  param.bi_calendar = bi_calendar;

  console.log(JSON.stringify(param));

  return fetch('https://resembid.org/wp-json/resembid/v1/set_push', {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });
}