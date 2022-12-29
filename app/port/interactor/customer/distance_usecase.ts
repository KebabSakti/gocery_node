import { BadRequest } from "../../../common/error/exception";
import DistanceRequest from "../../../entity/customer/distance_request";
import DistanceResponse from "../../../entity/customer/distance_response";
import AppConfigContract from "../../repository/customer/app_config_contract";
import DistanceContract from "../../service/customer/distance_contract";

class DistanceUsecase {
  private distanceService: DistanceContract;
  private appConfigRepository: AppConfigContract;

  constructor(
    distanceService: DistanceContract,
    appConfigRepository: AppConfigContract
  ) {
    this.distanceService = distanceService;
    this.appConfigRepository = appConfigRepository;
  }

  async getDistance(destination: string): Promise<DistanceResponse> {
    if (destination.length == 0) {
      throw new BadRequest("Destination distance cannot be empty");
    }

    let distanceRequest: DistanceRequest;

    const appConfig = await this.appConfigRepository.show();
    const destinations = destination.split(",");

    if (destinations.length == 2) {
      distanceRequest = {
        origin: appConfig.origin.latLng,
        destination: destination,
      };
    } else {
      distanceRequest = {
        origin: `place_id:${appConfig.origin.placeId}`,
        destination: `place_id:${destination}`,
      };
    }

    return await this.distanceService.getDistance(distanceRequest);
  }
}

export default DistanceUsecase;
