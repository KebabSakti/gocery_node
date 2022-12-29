import DistanceRequest from "../../../entity/customer/distance_request";
import DistanceResponse from "../../../entity/customer/distance_response";

abstract class DistanceContract {
  abstract getDistance(
    distanceRequest: DistanceRequest
  ): Promise<DistanceResponse>;
}

export default DistanceContract;
