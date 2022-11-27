import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io";
import { OrderStatus } from "../../../feature/customer/order/config/order_enum";
import OrderMongo from "../../../feature/customer/order/datasource/order_mongo";
import OrderRepository from "../../../feature/customer/order/repository/order_repository";
import CustomerRepository from "../../../feature/customer/user/repository/customer_repository";
import CustomerMongo from "../../../feature/customer/user/datasource/customer_mongo";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

const orderRepository: OrderRepository = new OrderMongo();
const customerRepository: CustomerRepository = new CustomerMongo();

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

    socket.on("chat:updated", (payload) => {
      chatUpdated(socket, payload);
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

  console.log(results);
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
      if (customer?.online) {
        //SOCKET IO
        socket
          .to([`room:${results.customer._id}`, `room:${results.courier._id}`])
          .emit("chat:updated", {
            from: results.courier.name,
            message: payload.message,
          });
      } else {
        //FCM
      }
    }
  }

  console.log(results);
};

export default socketController;
