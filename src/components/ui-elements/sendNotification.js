
// import axios from 'axios';
// // import admin from 'firebase-admin';

// import serviceAccount from "../../services/google-services.json";

// // const FCM_URL = 'https://fcm.googleapis.com/fcm/send';

// export const sendNotification = async (fcmToken, title, body) => {


// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   // databaseURL: "https://mdrrmo-libertad-c72e0-default-rtdb.europe-west1.firebasedatabase.app"
// // });

// const message = {
//   notification: {
//     title: title,
//     body: body,
//   },
//   token: fcmToken, // Use the FCM token received from React Native app
// };

// try {
//   // const response = await admin.messaging().send(message);
//   console.log('Notification sent successfully:', response);
// } catch (error) {
//   console.error('Error sending notification:', error);
// }

//   // const serverKey = 'BC0IlJOBordVIs4Wj7M-M7hoJnPEsdYslW5yEftQrsbzUFQS_nlcHns2eztGgE5UKzoarItC2DNb1k1lXdQ0XGw'; // Replace with yo Server Key

//   // try {
//   //   console.log(token, title, body, serverKey);
//   //   const response = await axios.post(
//   //     FCM_URL,
//   //     {
//   //       to: token, // The recipient's FCM token
//   //       notification: {
//   //         title: title, // Notification title
//   //         body: body,   // Notification body
//   //         sound: 'default', // Optional: sound for the notification
//   //       },
//   //       data: {
//   //         customData: 'Custom data payload', // Optional: custom key-value pairs
//   //       },
//   //     },
//   //     {
//   //       headers: {
//   //         'Authorization': `key=${serverKey}`,
//   //         'Content-Type': 'application/json',
//   //       },
//   //     }
//   //   );

//   //   console.log('Notification sent successfully:', response.data);
//   //   return response.data;
//   // } catch (error) {
//   //   console.error('Error sending notification:', error.response?.data || error.message);
//   //   throw error;
//   // }
// };
