import { ResourceNotFound } from "../../common/error/exception";
import ChatModel from "../../entity/chat_model";
import ChatSendOption from "../../entity/chat_send_option";
import NotificationOption from "../../entity/notification_option";
import ChatContract from "../repository/chat_contract";
import CourierContract from "../repository/courier/courier_contract";
import CustomerContract from "../repository/customer/customer_contract";
import OrderContract from "../repository/customer/order_contract";
import NotificationContract from "../service/customer/notification_contract";

class ChatUsecase {
  private chatRepository: ChatContract;
  private orderRepository: OrderContract;
  private customerRepository: CustomerContract;
  private courierRepository: CourierContract;
  private notificationService: NotificationContract;

  constructor(
    chatRepository: ChatContract,
    orderRepository: OrderContract,
    customerRepository: CustomerContract,
    courierRepository: CourierContract,
    notificationService: NotificationContract
  ) {
    this.chatRepository = chatRepository;
    this.orderRepository = orderRepository;
    this.customerRepository = customerRepository;
    this.courierRepository = courierRepository;
    this.notificationService = notificationService;
  }

  async chatSend(option: ChatSendOption): Promise<ChatModel | null> {
    const chat = await this.chatRepository.getChatSession(option.session);
    const order = await this.orderRepository.getOrderDetail(option.session);

    if (chat == null || order == null) {
      throw new ResourceNotFound("Chat session not found");
    }

    const customer = await this.customerRepository.show(order.customer?._id!);

    if (customer == null) {
      throw new ResourceNotFound("Customer not found");
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

    if (order.courier != null) {
      const courier = await this.courierRepository.show(order.courier._id);

      if (courier == null) {
        throw new ResourceNotFound("Courier not found");
      }

      if (order.customer?._id == option.sender) {
        const tokens = [courier.fcm!];

        const notifPayload: NotificationOption = {
          title: `Kustomer . ${customer.name}`,
          body: option.message,
        };

        await this.notificationService.sendToTokens(tokens, notifPayload);
      }

      if (order.courier?._id == option.sender) {
        const tokens = [customer.fcm!];

        const notifPayload: NotificationOption = {
          title: `Kurir . ${courier.name}`,
          body: option.message,
        };

        await this.notificationService.sendToTokens(tokens, notifPayload);
      }
    }

    return results;
  }
}

export default ChatUsecase;
