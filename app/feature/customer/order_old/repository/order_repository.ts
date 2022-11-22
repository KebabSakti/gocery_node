import {
  OrderModel,
  OrderOption,
  OrderPartnerModel,
  OrderPaymentModel,
  OrderProductModel,
  OrderShippingModel,
  OrderStatusModel,
  OrderVoucherModel,
} from "../model/order_model";

export abstract class OrderRepository {
  abstract show(orderOption: OrderOption): Promise<OrderModel | null>;
}

export abstract class OrderCustomerRepository {
  abstract show(order_uid: string): Promise<OrderShippingModel>;
}

export abstract class OrderPartnerRepository {
  abstract show(order_uid: string): Promise<OrderPartnerModel>;
}

export abstract class OrderPaymentRepository {
  abstract show(order_uid: string): Promise<OrderPaymentModel>;
}

export abstract class OrderShippingRepository {
  abstract show(order_uid: string): Promise<OrderShippingModel>;
}

export abstract class OrderStatusrRepository {
  abstract show(order_uid: string): Promise<OrderStatusModel>;
}

export abstract class OrderVoucherRepository {
  abstract show(order_uid: string): Promise<OrderVoucherModel>;
}

export abstract class OrderProductRepository {
  abstract show(order_uid: string): Promise<OrderProductModel[]>;
}
