import {
  OrderOption,
  OrderModel,
  OrderCustomerModel,
  OrderPartnerModel,
  OrderPaymentModel,
  OrderShippingModel,
  OrderVoucherModel,
  OrderStatusModel,
  OrderProductModel,
} from "../model/order_model";
import { OrderRepository } from "../repository/order_repository";
import Database from "../../../../core/service/mysql_database";
import { QueryOptions } from "mysql";
import QueryBuilder from "../../../../core/service/query_builder";

export class OrderMysql implements OrderRepository {
  async show(orderOption: OrderOption): Promise<OrderModel | null> {
    const result = new Promise<OrderModel | null>((resolve, reject) => {
      Database.pool
        .then((connection) => {
          const queryBuilder: QueryBuilder = new QueryBuilder({
            table: "orders o",
          });

          queryBuilder.fields = [
            `o.*`,
            `o.uid as order_id`,
            `c.*`,
            `r.*`,
            `m.*`,
            `s.*`,
            `t.*`,
            `p.*`,
          ];

          queryBuilder.joins = [
            `left join order_vouchers v on v.order_uid = o.uid`,
            `join order_customers c on c.order_uid = o.uid`,
            `join order_partners r on r.order_uid = o.uid`,
            `join order_payments m on m.order_uid = o.uid`,
            `join order_shippings s on s.order_uid = o.uid`,
            `join order_statuses t on t.order_uid = o.uid`,
            `join order_products p on p.order_uid = o.uid`,
          ];

          queryBuilder.wheres = [
            `o.uid = ${connection.escape(orderOption.order_uid)}`,
          ];

          const query: QueryOptions = {
            sql: queryBuilder.query,
          };

          console.log(query.sql);

          connection.query(query, (error, results) => {
            let order: OrderModel | null = null;

            if (error) {
              return reject(error);
            }

            if (results.length > 0) {
              const e = results[0];

              const customer: OrderCustomerModel = {
                customer_uid: e.customer_uid,
                name: e.name,
                phone: e.phone,
              };

              const partner: OrderPartnerModel = {
                partner_uid: e.partner_uid,
                name: e.name,
                email: e.email,
                partner_fee: e.partner_fee,
                app_fee: e.app_fee,
                total_fee: e.total_fee,
                status: e.status,
                note: e.note,
              };

              const payment: OrderPaymentModel = {
                payment_uid: e.payment_uid,
                status: e.status,
                extra: e.expired_at,
                note: e.note,
                provider_name: e.provider_name,
                category: e.catch,
                currency: e.currency,
                name: e.name,
                fee: e.fee,
              };

              const shipping: OrderShippingModel = {
                name: e.name,
                phone: e.phone,
                address: e.address,
                latitude: e.latitude,
                longitude: e.longitude,
                place: e.place,
                distance: e.distance,
                unit: e.unit,
                note: e.note,
                fee: e.fee,
                place_id: e.place_id,
              };

              const voucher: OrderVoucherModel = {
                code: e.code,
                name: e.name,
                description: e.description,
                amount: e.amount,
                expired_at: e.expired_at,
              };

              const status: OrderStatusModel = {
                status: e.status,
                note: e.note,
              };

              const products: OrderProductModel[] = [];

              order = {
                uid: e.order_id,
                invoice: e.invoice,
                pay: e.pay,
                customer: customer,
                partner: partner,
                payment: payment,
                shipping: shipping,
                voucher: voucher,
                status: status,
                products: products,
              };
            }

            resolve(order);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return result;
  }
}
