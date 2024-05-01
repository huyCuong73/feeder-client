import * as Notifications from 'expo-notifications';

export async function getNotificationToken() {
    const {status} = await Notifications.getPermissionsAsync()
    if(status !== 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()

        if(status !== 'granted'){
            alert('Lỗi truy cập thông báo')
            return
        }
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({ projectId: '9b40e9a7-b21d-4647-b5b6-0bfc90e3bd1f' })
    const token = tokenData.data
    console.log({token});
    return token
}


export async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
    console.log("push");
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }