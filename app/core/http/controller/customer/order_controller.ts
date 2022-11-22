import express, { Request, Response } from "express";
import OrderMongo from "../../../../feature/customer/order/datasource/order_mongo";
import OrderRepository from "../../../../feature/customer/order/repository/order_repository";
import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import { BadRequest } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import OrderOption from "./../../../../feature/customer/order/model/order_option";

const router = express.Router();
const orderRepository: OrderRepository = new OrderMongo();
const customerRepository: CustomerRepository = new CustomerMongo();

router.get("/:customer_id", async (req: Request, res: Response) => {
  try {
    const orderOption: OrderOption = {
      customer: req.params.customer_id,
      status: req.body.status,
    };

    const page = isNaN(parseInt(req.query.page as string))
      ? 1
      : parseInt(req.query.page as string);

    const limit = isNaN(parseInt(req.query.limit as string))
      ? 10
      : parseInt(req.query.limit as string);

    if (limit >= 20) {
      throw new BadRequest();
    }

    const pagingOption = new PagingOption(page, limit);

    const results = await orderRepository.index(orderOption, pagingOption);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:id/show", async (req: Request, res: Response) => {
  try {
    const results = await orderRepository.show(req.params.id);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/:customer_id", async (req: Request, res: Response) => {
  try {
    // const customer = await customerRepository.show();
    // const results = await orderRepository.store({
    //   invoice: "",
    //   qty: 0,
    //   total: 0,
    //   customer: {
    //     _id: req.params.customer_id,
    //     external_id,
    //   },
    // });

    res.end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
