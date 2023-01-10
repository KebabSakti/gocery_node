import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import PagingOption from "../../../../entity/customer/paging_option";
import PaymentModel from "../../../../entity/customer/payment_model";
import PaymentOption from "../../../../entity/customer/payment_option";
import PaymentUsecase from "../../../../port/interactor/customer/payment_usecase";
import PaymentMongodb from "../../../data/mongodb/customer/payment_mongodb";
import PagingValidator from "../../joi/customer/paging_validator";

const paymentRepository = new PaymentMongodb();
const usecase = new PaymentUsecase(paymentRepository);

class PaymentHandler {
  async getAllPaymentMethods(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;

      let option: PaymentOption = {};

      if (page != undefined && limit != undefined) {
        const { error } = PagingValidator.validate(req.query);

        if (error != undefined) {
          throw new BadRequest(error.message);
        }

        option = {
          ...option,
          pagination: new PagingOption(
            parseInt(page as string),
            parseInt(limit as string)
          ),
        };
      }

      const results = await usecase.getAllPaymentMethods(option);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }

  async getPaymentDetailById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const results = await usecase.getPaymentDetailById(id);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default PaymentHandler;
