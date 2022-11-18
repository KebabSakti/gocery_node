import { ProductModel } from "./../../model/product_structure";
import {
  CategoryScheme,
  CategoryModel,
} from "./../../model/category_structure";
import { faker } from "@faker-js/faker";
import express, { Request, Response } from "express";
import { ProductScheme } from "../../model/product_structure";
import ErrorHandler from "../../service/error_handler";
import mongoose from "mongoose";
import { BadRequest, ResourceNotFound } from "../../config/errors";
import { BundleModel, BundleScheme } from "../../model/bundle_structure";

const router = express.Router();

router.get("*", async (req: Request, res: Response) => {
  try {
    // const iterates: number[] = [...Array(5).keys()];
    // const datas = await ProductScheme.find().limit(100);

    // const ids: string[] = Array.from(datas, (e) => {
    //   return e._id;
    // });

    // let p: string[] = [];
    // for (const _ in iterates) {
    //   for (let i = 1; i <= 10; i++) {
    //     p.push(ids[Math.floor(Math.random() * ids.length)]);
    //   }

    //   const scheme = new BundleScheme({
    //     name: faker.commerce.productAdjective(),
    //     description: faker.commerce.productDescription(),
    //     image: faker.image.food(),
    //     products: p,
    //   });

    //   await scheme.save();

    //   p = [];
    // }

    // const ids = ["637780b76b9a7275758dfdee", "637780b76b9a7275758dfdfe"];

    const query = BundleScheme.find()
      .select("-active -created_at -updated_at -__v")
      .populate("products", "-active -created_at -updated_at -__v");

    // query.where("_id").in(ids);

    const result = await query.exec();

    res.json(result);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
