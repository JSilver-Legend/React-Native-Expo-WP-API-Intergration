import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default async function ApiBadgeReset() {
    console.log('test');
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  
  if (status !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  var param = new Object();
  param.key = token;
  param.badge = 0;

  
  var data = new FormData();
  data.append("func", "resetBadge");
  data.append("data", JSON.stringify(param));

  return fetch('https://protege.spc.int/api.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data,
    })
    .then((response) => response.json())
    .then((responseJson) => {
        // this.setState({
        //     isLoading: false,
        //     post: responseJson[0]
        // })
    })
    .catch((error) => {
        console.error(error);
    });
}