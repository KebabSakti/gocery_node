import { DateTime } from "luxon";
import DateTimeContract from "../../../port/service/customer/date_time_contract";

class DateTimeLuxon implements DateTimeContract {
  timeNow(): string {
    const now = DateTime.now().toFormat("HH:mm");

    return now;
  }

  startIsBeforeEnd(start: string, end: string): boolean {
    const startTime = DateTime.fromISO(start);
    const endTime = DateTime.fromISO(end);

    const results = startTime < endTime;

    return results;
  }
}

export default DateTimeLuxon;
