import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import PagingOption from "../../../../entity/customer/paging_option";
import SearchModel from "../../../../entity/customer/search_model";
import SearchOption from "../../../../entity/customer/search_option";
import SearchUsecase from "../../../../port/interactor/customer/search_usecase";
import SearchMongodb from "../../../data/mongodb/customer/search_mongodb";
import PagingValidator from "../../joi/customer/paging_validator";

class SearchHandler {
  private usecase = new SearchUsecase(new SearchMongodb());

  async getSearchKeywords(req: Request, res: Response) {
    try {
      const { error } = PagingValidator.validate(req.query);

      if (error != undefined) {
        throw new BadRequest(error.message);
      }

      const { keyword, page, limit } = req.query;

      const option: SearchOption = {
        customer: req.app.locals.user,
        keyword: keyword,
        pagination: new PagingOption(
          parseInt(page as string),
          parseInt(limit as string)
        ),
      };

      const results = await this.usecase.index(option);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }

  async addSearchKeyword(req: Request, res: Response) {
    try {
      const { keyword } = req.body;

      const searchModel: SearchModel = {
        customer: req.app.locals.user,
        keyword: keyword,
      };

      await this.usecase.store(searchModel);

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }

  async removeSearchKeyword(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.usecase.remove(id);

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default SearchHandler;
