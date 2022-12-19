import { OrderStatus, PaymentStatus } from "./order_enum";

interface OrderOption {
  status?: OrderStatus | null;
  payment?: PaymentStatus | null;
  pagination?: any;
}

export default OrderOption;
