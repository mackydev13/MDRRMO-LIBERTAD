import axios from 'axios';

const FCM_URL = 'https://fcm.googleapis.com/fcm/send';

export const sendNotification = async (token, title, body) => {
  const serverKey = 'AIzaSyBmrqsgntNQrtXEcpQZkvY8cCl_0Rr6d8E'; // Replace with your Firebase Server Key

  try {
    const response = await axios.post(
      FCM_URL,
      {
        to: token, // The recipient's FCM token
        notification: {
          title: title, // Notification title
          body: body,   // Notification body
          sound: 'default', // Optional: sound for the notification
        },
        data: {
          customData: 'Custom data payload', // Optional: custom key-value pairs
        },
      },
      {
        headers: {
          Authorization: `key=${serverKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Notification sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending notification:', error.response?.data || error.message);
    throw error;
  }
};
