import admin from "firebase-admin";
import NotificationContract from "../../entity/contract/notification_contract";

class NotificationFcm implements NotificationContract<Promise<void>> {
  async send(payload: any): Promise<Promise<void>> {
    await admin.messaging().send(payload);
  }
}

export default NotificationFcm;
