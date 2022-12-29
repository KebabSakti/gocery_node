import { Client } from "@googlemaps/google-maps-services-js";
import { InternalServerError } from "../../../../common/error/exception";
import DistanceRequest from "../../../../entity/customer/distance_request";
import DistanceResponse from "../../../../entity/customer/distance_response";
import DistanceContract from "../../../../port/service/customer/distance_contract";

const google = new Client({});

class DistanceMatrix implements DistanceContract {
  async getDistance(
    distanceRequest: DistanceRequest
  ): Promise<DistanceResponse> {
    return await new Promise<DistanceResponse>(async (resolve, reject) => {
      try {
        const response = await google.distancematrix({
          params: {
            key: process.env.GMAP_API_KEY as string,
            language: "id",
            origins: [distanceRequest.origin],
            destinations: [distanceRequest.destination],
          },
        });

        const item = response.data.rows[0].elements[0];

        const distanceResponse: DistanceResponse = {
          distance: item.distance,
          duration: item.duration,
        };

        resolve(distanceResponse);
      } catch (error: any) {
        reject(new InternalServerError(error.response.data.error_message));
      }
    });
  }
}

export default DistanceMatrix;
