import NotificationOption from "../../../entity/notification_option";

abstract class NotificationContract {
  abstract sendToTokens(
    tokens: string[],
    option: NotificationOption
  ): Promise<void>;

  abstract sendToTopic(
    topic: string,
    option: NotificationOption
  ): Promise<void>;
}

export default NotificationContract;
