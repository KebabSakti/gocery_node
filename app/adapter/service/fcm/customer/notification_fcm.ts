import admin from "firebase-admin";
import NotificationOption from "../../../../entity/notification_option";
import NotificationContract from "../../../../port/service/customer/notification_contract";

class NotificationFcm implements NotificationContract {
  async sendToTopic(topic: string, option: NotificationOption): Promise<void> {
    const message = {
      topic: topic,
      notification: {
        title: option.title,
        body: option.body,
      },
    };

    await admin.messaging().send(message);
  }

  async sendToTokens(
    tokens: string[],
    option: NotificationOption
  ): Promise<void> {
    const message = {
      tokens: tokens,
      notification: {
        title: option.title,
        body: option.body,
      },
    };

    await admin.messaging().sendMulticast(message);
  }
}

export default NotificationFcm;
