import { Client } from "@googlemaps/google-maps-services-js";
import { InternalServerError } from "../../../../common/error/exception";
import PlaceDetailRequest from "../../../../entity/customer/place_detail_request";
import PlaceDetailResponse from "../../../../entity/customer/place_detail_response";
import PlaceSuggestionRequest from "../../../../entity/customer/place_suggestion_request";
import PlaceSuggestionResponse from "../../../../entity/customer/place_suggestion_response";
import PlaceContract from "../../../../port/service/customer/place_contract";

const google = new Client({});

class PlaceAutocomplete implements PlaceContract {
  placeSuggestions(
    request: PlaceSuggestionRequest
  ): Promise<PlaceSuggestionResponse[]> {
    return new Promise<PlaceSuggestionResponse[]>(async (resolve, reject) => {
      try {
        const response = await google.placeAutocomplete({
          params: {
            key: process.env.GMAP_API_KEY as string,
            language: "id",
            strictbounds: true,
            location: `${request.lat},${request.lng}`,
            radius: request.radius,
            sessiontoken: request.session,
            input: request.keyword,
          },
        });

        let results: PlaceSuggestionResponse[] = [];

        if (response.data.status == "OK") {
          for (const item of response.data.predictions) {
            results = [
              ...results,
              {
                id: item.place_id,
                address: item.description,
              },
            ];
          }
        }

        resolve(results);
      } catch (error: any) {
        reject(new InternalServerError(error.response.data.error_message));
      }
    });
  }

  placeDetail(request: PlaceDetailRequest): Promise<PlaceDetailResponse> {
    return new Promise<PlaceDetailResponse>(async (resolve, reject) => {
      try {
        const response = await google.placeDetails({
          params: {
            key: process.env.GMAP_API_KEY as string,
            sessiontoken: request.session,
            place_id: request.id,
            fields: ["geometry"],
          },
        });

        let results: PlaceDetailResponse = {};

        if (response.data.status == "OK") {
          results = {
            lat: response.data.result.geometry?.location.lat,
            lng: response.data.result.geometry?.location.lng,
          };
        }

        resolve(results);
      } catch (error: any) {
        reject(new InternalServerError(error.response.data.error_message));
      }
    });
  }
}

export default PlaceAutocomplete;
