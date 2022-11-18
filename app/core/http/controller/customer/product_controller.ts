import express, { Request, Response } from "express";
import ProductRepository from "../../../../feature/customer/product/repository/product_repository";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
// const productRepository: ProductRepository = new ProductMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.json("");
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
