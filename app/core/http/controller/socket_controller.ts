import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io";
import CourierMongo from "../../../feature/courier/user/datasource/courier_mongo";
import CourierRepository from "../../../feature/courier/user/repository/courier_repository";
import { OrderStatus } from "../../../feature/customer/order/config/order_enum";
import OrderMongo from "../../../feature/customer/order/datasource/order_mongo";
import OrderRepository from "../../../feature/customer/order/repository/order_repository";
import CustomerMongo from "../../../feature/customer/user/datasource/customer_mongo";
import CustomerRepository from "../../../feature/customer/user/repository/customer_repository";
import ChatRepository from "../../../feature/customer/chat/repository/chat_repository";
import ChatMongo from "../../../feature/customer/chat/datasource/chat_mongo";
import { ChatModel } from "../../../feature/customer/chat/model/chat_model";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

const orderRepository: OrderRepository = new OrderMongo();
const customerRepository: CustomerRepository = new CustomerMongo();
const courierRepository: CourierRepository = new CourierMongo();
const chatRepository: ChatRepository = new ChatMongo();

const socketController = (socket: SocketType) => {
  if (socket.data.user != undefined) {
    socket.on("disconnect", () => {
      socket.leave(`room:${socket.data.user}`);
    });

    socket.on("user:joined", () => {
      socket.join(`room:${socket.data.user}`);
    });

    socket.on("order:updated", (id) => {
      orderUpdated(socket, id);
    });

    socket.on("chat:updated", async (payload, callback) => {
      const chatModel: ChatModel = { ...payload, sent: Date.now() };

      await chatRepository.update(chatModel);

      socket.broadcast.emit("chat:updated", chatModel);

      callback(chatModel);
    });

    socket.on("chat:read", async (payload) => {
      const chatModel: ChatModel = { ...payload, read: Date.now() };

      await chatRepository.update(chatModel);

      socket.broadcast.emit("chat:read", chatModel);
    });
  }
};

const orderUpdated = async (socket: SocketType, id: string) => {
  const results = await orderRepository.show(id);

  if (results != null) {
    switch (results.status) {
      case OrderStatus.ACTIVE:
        break;

      case OrderStatus.PROGRESS:
        break;

      case OrderStatus.COMPLETED:
        break;

      case OrderStatus.CANCELED:
        break;
    }
  }
};

const chatUpdated = async (socket: SocketType, payload: any) => {
  const results = await orderRepository.show(payload.id);

  if (results != null) {
    const customer = await customerRepository.show(results.customer._id);

    if (
      (results.status == OrderStatus.ACTIVE ||
        results.status == OrderStatus.PROGRESS) &&
      results.courier != null
    ) {
      const courier = await courierRepository.show(results.courier._id);

      if (customer?.online) {
        socket
          .to([`room:${results.customer._id}`, `room:${results.courier._id}`])
          .emit("chat:updated", {
            sender: socket.data.user,
            message: payload.message,
          });
      } else {
        //FCM
      }
    }
  }
};

export default socketController;
