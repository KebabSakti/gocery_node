import express, { Request, Response } from "express";
import ViewMongo from "../../../../feature/customer/view/datasource/view_mongo";
import { ViewModel } from "../../../../feature/customer/view/model/view_model";
import ViewRepository from "../../../../feature/customer/view/repository/view_repository";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
const viewRepository: ViewRepository = new ViewMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    let pagingOption: PagingOption | undefined = undefined;

    if (req.query.page != undefined && req.query.limit != undefined) {
      pagingOption = new PagingOption(
        parseInt(req.query.page as string),
        parseInt(req.query.limit as string)
      );
    }

    const results: ViewModel[] = await viewRepository.index(
      req.app.locals.user,
      pagingOption
    );

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
