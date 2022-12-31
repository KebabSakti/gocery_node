import DeliveryTimeModel from "../../../entity/customer/delivery_time_model";
import DeliveryTimeContract from "../../repository/customer/delivery_time_contract";
import DateTimeContract from "../../service/customer/date_time_contract";

class DeliveryTimeUsecase {
  private deliveryTimeRepository: DeliveryTimeContract;
  private dateTimeService: DateTimeContract;

  constructor(
    deliveryTimeRepository: DeliveryTimeContract,
    dateTimeService: DateTimeContract
  ) {
    this.deliveryTimeRepository = deliveryTimeRepository;
    this.dateTimeService = dateTimeService;
  }

  async getAvailableDeliveryTimes(): Promise<DeliveryTimeModel[]> {
    const deliveryTimes = await this.deliveryTimeRepository.getAll();

    const now = this.dateTimeService.timeNow();
    let times: DeliveryTimeModel[] = [];

    for (const item of deliveryTimes) {
      const available = this.dateTimeService.startIsBeforeEnd(item.time, now);

      times = [...times, { ...item, available: available }];
    }

    return times;
  }
}

export default DeliveryTimeUsecase;
