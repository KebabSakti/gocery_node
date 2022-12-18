import NotificationContract from "../../service/customer/notification_contract";

class NotificationUsecase<T> {
  private notification: NotificationContract<T>;

  constructor(notification: NotificationContract<T>) {
    this.notification = notification;
  }

  async send(payload: any): Promise<T> {
    return await this.notification.send(payload);
  }
}

export default NotificationUsecase;
