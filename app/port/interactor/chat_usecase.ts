import { ResourceNotFound } from "../../common/error/exception";
import ChatModel from "../../entity/chat_model";
import ChatSendOption from "../../entity/chat_send_option";
import NotificationOption from "../../entity/notification_option";
import ChatContract from "../repository/chat_contract";
import OrderContract from "../repository/customer/order_contract";
import NotificationContract from "../service/customer/notification_contract";

class ChatUsecase {
  private chatRepository: ChatContract;
  private orderRepository: OrderContract;
  private notificationService: NotificationContract;

  constructor(
    chatRepository: ChatContract,
    orderRepository: OrderContract,
    notificationService: NotificationContract
  ) {
    this.chatRepository = chatRepository;
    this.orderRepository = orderRepository;
    this.notificationService = notificationService;
  }

  async getChatSession(session: string): Promise<ChatModel | null> {
    const results = await this.chatRepository.getChatSession(session);

    return results;
  }

  async chatSend(option: ChatSendOption): Promise<ChatModel | null> {
    const chat = await this.chatRepository.getChatSession(option.session);
    const order = await this.orderRepository.getOrderDetail(option.session);

    if (chat == null || order == null) {
      throw new ResourceNotFound("Chat session not found");
    }

    let chatItems = [
      ...chat.chats!,
      {
        session: option.session,
        sender: option.sender,
        message: option.message,
      },
    ];

    const chatModel = { ...chat, chats: chatItems };

    const results = await this.chatRepository.upsertChatSession(
      option.session,
      chatModel
    );

    if (order.courier != null && order.customer != null) {
      if (order.customer._id == option.sender) {
        const tokens = [order.courier.fcm];

        const notifPayload: NotificationOption = {
          title: `Kustomer . ${order.customer.name}`,
          body: option.message,
        };

        await this.notificationService.sendToTokens(tokens, notifPayload);
      }

      if (order.courier._id == option.sender) {
        const tokens = [order.customer.fcm];

        const notifPayload: NotificationOption = {
          title: `Kurir . ${order.courier.name}`,
          body: option.message,
        };

        await this.notificationService.sendToTokens(tokens, notifPayload);
      }
    }

    return results;
  }
}

export default ChatUsecase;
