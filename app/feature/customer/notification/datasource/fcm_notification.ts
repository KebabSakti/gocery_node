import NotificationRepository from "../repository/notification_repository";
import admin from "firebase-admin";

class FcmNotification implements NotificationRepository<any, Promise<void>> {
  async send(payload: any): Promise<void> {
    await admin.messaging().send(payload);
  }
}

export default FcmNotification;
