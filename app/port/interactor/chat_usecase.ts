import ChatModel from "../../entity/chat_model";
import ChatSendOption from "../../entity/chat_send_option";
import NotificationOption from "../../entity/notification_option";
import ChatContract from "../repository/chat_contract";
import CourierContract from "../repository/courier/courier_contract";
import CustomerContract from "../repository/customer/customer_contract";
import NotificationContract from "../service/customer/notification_contract";

class ChatUsecase {
  private chatContract: ChatContract;
  private customerContract: CustomerContract;
  private courierContract: CourierContract;
  private notificationContract: NotificationContract;

  constructor(
    chatContract: ChatContract,
    customerContract: CustomerContract,
    courierContract: CourierContract,
    notificationContract: NotificationContract
  ) {
    this.chatContract = chatContract;
    this.customerContract = customerContract;
    this.courierContract = courierContract;
    this.notificationContract = notificationContract;
  }

  async chatSend(option: ChatSendOption): Promise<ChatModel | null> {
    const chat = await this.chatContract.getChatSession(option.session);
    const customer = await this.customerContract.show(option.sender);
    const courier = await this.courierContract.show(option.sender);

    if (chat != null) {
      let chatItems = [
        ...chat.chats!,
        {
          _id: option.chatId,
          session: option.session,
          sender: option.sender,
          message: option.message,
        },
      ];

      const chatModel = { ...chat, chats: chatItems };

      const results = await this.chatContract.upsertChatSession(
        option.session,
        chatModel
      );

      const notifPayload: NotificationOption = {
        title: option.sender,
        body: option.message,
      };

      if (customer != null) {
        if (!customer.online) {
          await this.notificationContract.sendToTokens(
            [customer.fcm!],
            notifPayload
          );
        }
      }

      if (courier != null) {
        if (!courier.online) {
          await this.notificationContract.sendToTokens(
            [courier.fcm!],
            notifPayload
          );
        }
      }

      return results;
    }

    return null;
  }
}

export default ChatUsecase;
