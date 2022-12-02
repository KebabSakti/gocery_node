import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io";
import ChatMongo from "../../../feature/customer/chat/datasource/chat_mongo";
import ChatRepository from "../../../feature/customer/chat/repository/chat_repository";
import { OrderStatus } from "../../../feature/customer/order/config/order_enum";
import OrderMongo from "../../../feature/customer/order/datasource/order_mongo";
import OrderRepository from "../../../feature/customer/order/repository/order_repository";
import SocketIO from "../../service/socketio";
import { ChatModel } from "./../../../feature/customer/chat/model/chat_model";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

const orderRepository: OrderRepository = new OrderMongo();
const chatRepository: ChatRepository = new ChatMongo();

const socketController = (socket: SocketType, io: SocketIO) => {
  if (socket.data.user != undefined) {
    socket.on("disconnect", () => {
      socket.leave(`room:${socket.data.user}`);
    });

    socket.on("user:joined", () => {
      socket.join(`room:${socket.data.user}`);
    });

    socket.on("order:updated", async (id) => {
      const results = await orderRepository.show(id);

      if (results != null) {
        // const chat = await chatRepository.show(id);

        // if (chat == null) {
        //   await chatRepository.update({
        //     session: id,
        //   });
        // }

        const sessionRoom = `room:${id}`;

        switch (results.status) {
          case OrderStatus.ACTIVE:
            //customer join
            socket.join(sessionRoom);
            break;

          case OrderStatus.PROGRESS:
            //courier join
            socket.join(sessionRoom);
            break;

          case OrderStatus.COMPLETED:
            io.I.socketsLeave(sessionRoom);
            break;

          case OrderStatus.CANCELED:
            io.I.socketsLeave(sessionRoom);
            break;
        }
    }
    });

    socket.on("chat:updated", async (payload, callback) => {
      const chatSessions = await chatRepository.show(payload.session);

      const chatModel: ChatModel = {
        ...chatSessions,
        updated_at: Date.now().toString(),
        chats: [
          ...chatSessions!.chats!,
          {
            ...payload,
            sent: Date.now().toString(),
          },
        ],
      };

      chatRepository.update(chatModel);

      socket.to(`room:${payload.session}`).emit("chat:updated", chatModel);

      callback(chatModel);
    });

    socket.on("chat:read", async (session) => {
      const chatSessions = await chatRepository.show(session);

      if (chatSessions != null) {
        const chats = [];

        for (const item of chatSessions.chats!) {
          chats.push({ ...item, read: Date.now().toString() });
        }

        const chatModel: ChatModel = {
          ...chatSessions,
          chats: chats,
          updated_at: Date.now().toString(),
        };

        chatRepository.update(chatModel);

        socket.to(`room:${session}`).emit("chat:updated", chatModel);
      }
    });
  }
};

export default socketController;
