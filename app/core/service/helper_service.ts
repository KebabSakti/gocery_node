import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

class HelperService {
  static sqlDateNow(): string {
    const now: string = DateTime.utc().toFormat("yyyy-LL-dd hh:mm:ss");

    return now;
  }

  static uuid(): string {
    return uuidv4();
  }
}

export default HelperService;
