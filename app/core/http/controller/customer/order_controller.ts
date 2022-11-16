import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import { OrderRepository } from "../../../../feature/customer/order/repository/order_repository";
import { OrderMysql } from "../../../../feature/customer/order/datasource/order_mysql";
import { OrderModel } from "../../../../feature/customer/order/model/order_model";

const router = express.Router();
const orderRepository: OrderRepository = new OrderMysql();

router.get("/:uid/show", async (req: Request, res: Response) => {
  try {
    const order: OrderModel | null = await orderRepository.show({
      order_uid: req.params.uid,
    });

    if (order != null) {
      res.json(order);
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
