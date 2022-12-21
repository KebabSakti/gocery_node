import BillModel from "../../../entity/customer/bill_model";
import OrderModel from "../../../entity/customer/order_model";
import OrderPayload from "../../../entity/customer/order_payload";
import AppConfigContract from "../../repository/customer/app_config_contract";
import BillContract from "../../repository/customer/bill_contract";
import CustomerContract from "../../repository/customer/customer_contract";
import DeductorContract from "../../repository/customer/deductor_contract";
import OrderContract from "../../repository/customer/order_contract";
import PaymentContract from "../../repository/customer/payment_contract";
import ProductContract from "../../repository/customer/product_contract";
import NotificationContract from "../../service/customer/notification_contract";

class OrderUsecase<T> {
  private orderRepository: OrderContract;
  private productRepository: ProductContract;
  private customerRepository: CustomerContract;
  private paymentRepository: PaymentContract;
  private billRepository: BillContract;
  private deductorRepository: DeductorContract;
  private appConfigRepository: AppConfigContract;
  private notificationService: NotificationContract<T>;

  constructor(
    orderRepository: OrderContract,
    productRepository: ProductContract,
    customerRepository: CustomerContract,
    paymentRepository: PaymentContract,
    billRepository: BillContract,
    deductorRepository: DeductorContract,
    appConfigRepository: AppConfigContract,
    notificationService: NotificationContract<T>
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.customerRepository = customerRepository;
    this.paymentRepository = paymentRepository;
    this.billRepository = billRepository;
    this.deductorRepository = deductorRepository;
    this.appConfigRepository = appConfigRepository;
    this.notificationService = notificationService;
  }

  async getOrderDetail(orderId: string): Promise<OrderModel | null> {
    return await this.orderRepository.show(orderId);
  }

  async updateOrderSummary(orderPayload: OrderPayload): Promise<void> {
    const user = await this.customerRepository.show(orderPayload.customer);
    const lastOrder = await this.orderRepository.showLastOrder(
      orderPayload.customer
    );

    let point = 0;
    let shipping: any = orderPayload.shipping;
    let delivery: any = orderPayload.delivery;
    let payment: any = orderPayload.payment;
    let items: any = [];
    let bills: BillModel[] = [];
    let deductors: BillModel[] = [];
    let qtyTotal = 0;
    let shopTotal = 0;
    let deliveryFeeTotal = 0;
    let paymentFeeTotal = 0;
    let payTotal = 0;

    if (user != null && orderPayload.point == true) {
      point = user.point!;
    }

    if (shipping == undefined && lastOrder != null) {
      shipping = lastOrder.shipping;
    }

    for (const item of orderPayload.items) {
      const product = await this.productRepository.getProductById(item._id);
      const total = product!.price!.final! * item.qty;
      shopTotal += total;
      qtyTotal += item.qty;

      items = [
        ...items,
        {
          ...product,
          product: product?._id?.toString(),
          qty: item.qty,
          total: total,
        },
      ];
    }

    if (delivery != undefined) {
      const app = await this.appConfigRepository.show();
      const fee = app.fee.delivery;
      deliveryFeeTotal = fee;

      delivery = { ...delivery, fee: fee };
    }

    if (payment._id != undefined) {
      const paymentMethod = await this.paymentRepository.show(payment._id);
      paymentFeeTotal = paymentMethod?.fee!;

      payment = paymentMethod;
    }

    //total belanja
    bills.push({
      title: "Total Belanja",
      value: shopTotal,
    });

    //ongkir
    bills.push({
      title: "Total Ongkir",
      value: deliveryFeeTotal,
    });

    //payment fee
    if (!payment.cash) {
      bills.push({
        title: `Biaya ${payment.name}`,
        value: paymentFeeTotal,
      });
    }

    //dynamic bill
    for (const billItem of orderPayload.bills) {
      const repoBill = await this.billRepository.getBillById(billItem._id);

      if (repoBill != null) {
        bills.push({
          _id: billItem._id,
          title: repoBill.title,
          value: repoBill.value,
          active: repoBill.active,
          selected: billItem.selected,
        });
      }
    }

    //point deduction
    deductors.push({
      title: "Potongan Point",
      value: point,
    });

    //dynamic deductor
    for (const deductorItem of orderPayload.deductors) {
      const repoDeductor = await this.deductorRepository.getDeductorById(
        deductorItem._id
      );

      if (repoDeductor != null) {
        bills.push({
          _id: deductorItem._id,
          title: repoDeductor.title,
          value: repoDeductor.value,
          active: repoDeductor.active,
          selected: deductorItem.selected,
        });
      }
    }

    const billTotal =
      bills.length == 0
        ? 0
        : bills.reduce((partialSum, e) => partialSum + e.value, 0);

    const deductorTotal =
      deductors.length == 0
        ? 0
        : deductors.reduce((partialSum, e) => partialSum + e.value, 0);

    payTotal = billTotal - deductorTotal < 0 ? 0 : billTotal - deductorTotal;

    const model: OrderModel = {
      point: point,
      shipping: shipping,
      delivery: delivery,
      payment: payment,
      items: items,
      bills: bills,
      deductors: deductors,
      qty: qtyTotal,
      total: payTotal,
    };

    await this.orderRepository.upsert(orderPayload.customer, model);
  }

  async updateOrderStatus(
    _id: string,
    orderModel: OrderModel,
    notificationPayload: any
  ): Promise<void> {
    await this.notificationService.send(notificationPayload);
  }
}

export default OrderUsecase;
