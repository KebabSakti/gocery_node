import ChatModel from "../../entity/chat_model";
import ChatSendOption from "../../entity/chat_send_option";
import NotificationOption from "../../entity/notification_option";
import ChatContract from "../repository/chat_contract";
import NotificationContract from "../service/customer/notification_contract";

class ChatUsecase {
  private chatContract: ChatContract;
  private notificationContract: NotificationContract;

  constructor(
    chatContract: ChatContract,
    notificationContract: NotificationContract
  ) {
    this.chatContract = chatContract;
    this.notificationContract = notificationContract;
  }

  async chatSend(
    option: ChatSendOption,
    notificationPayload: NotificationOption
  ): Promise<ChatModel | null> {
    const chat = await this.chatContract.getChatSession(option.session);

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

      await this.notificationContract.sendToTopic(
        "new_orders",
        notificationPayload
      );

      return results;
    }

    return null;
  }
}

export default ChatUsecase;
