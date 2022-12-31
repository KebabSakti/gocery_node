import DateTimeContract from "../../service/customer/date_time_contract";

class DateTimeUsecase {
  private dateTimeService: DateTimeContract;

  constructor(dateTimeService: DateTimeContract) {
    this.dateTimeService = dateTimeService;
  }

  timeIsBeforeNow(time: string): Boolean {
    const now = this.dateTimeService.timeNow();

    const results = this.dateTimeService.startIsBeforeEnd(time, now);

    return results;
  }
}

export default DateTimeUsecase;
