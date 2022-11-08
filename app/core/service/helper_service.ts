import { DateTime } from "luxon";
import PaginationOption from "../model/pagination_option";

class HelperService {
  static sqlDateNow(): string {
    const now: string = DateTime.utc().toFormat("yyyy-LL-dd hh:mm:ss");

    return now;
  }

  static paginate(query: string, option: PaginationOption): string {
    let offset: number = 0;

    if (option.currentPage != undefined) {
      if (option.currentPage > 0) {
        offset = (option.currentPage - 1) * option.perPage;

        query += ` limit ${option.perPage} offset ${offset}`;
      }
    }

    return query;
  }
}

export default HelperService;
