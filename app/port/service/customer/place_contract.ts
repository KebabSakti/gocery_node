import PlaceDetailRequest from "../../../entity/customer/place_detail_request";
import PlaceDetailResponse from "../../../entity/customer/place_detail_response";
import PlaceSuggestionRequest from "../../../entity/customer/place_suggestion_request";
import PlaceSuggestionResponse from "../../../entity/customer/place_suggestion_response";

abstract class PlaceContract {
  abstract placeSuggestions(
    request: PlaceSuggestionRequest
  ): Promise<PlaceSuggestionResponse[]>;

  abstract placeDetail(
    request: PlaceDetailRequest
  ): Promise<PlaceDetailResponse>;
}

export default PlaceContract;
