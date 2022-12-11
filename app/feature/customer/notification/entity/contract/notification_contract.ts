abstract class NotificationContract<T> {
  abstract send(payload: any): Promise<T>;
}

export default NotificationContract;
