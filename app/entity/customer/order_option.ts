import { OrderStatus, PaymentStatus } from "./order_enum";

interface OrderOption {
  status?: OrderStatus;
  payment?: PaymentStatus;
  pagination?: any;
}

export default OrderOption;
