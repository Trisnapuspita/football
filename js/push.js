var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BCsKDmoHcIvAp02KgUVvQBzd_moYzy6hEZ3NqEQ_GIdgtPz4snIiPlX4CZ-WOYYGIN1p8BaZyQXUZ0aQcqn_yq4",
   "privateKey": "iy8K8Jb4FyBG_4s1949IG5IAeJhGWiekS9ZPtcJo7iw"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/exhiMF2rnwM:APA91bHQos6Gsi3iDGgwiMMgMGY1TRxGjk5GlPq89un7agAe7FqK4teTDVoZNmGHArXe2UEGUP9e_A_bESZDzWZHRUFxbzPXqJKpceUYABQprMQiXpgKGEg2Iq6XpuFxrirSrgx0g6Rl",
   "keys": {
       "p256dh": "BByHx7nHpywZdGHDnTM7w866DxkjeVXU+F6i0GKnypk0QgMRc6OL5TCy0ljmjysdXAD+WltGsD74U63gO6iwxUk=",
       "auth": "jdIobprv0bPdqrT/Q+TS9A=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '425611049322no',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);