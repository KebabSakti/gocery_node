import GetPlaceSuggestionRequest from "../../../../entity/customer/get_place_suggestion_request";
import PlaceModel from "../../../../entity/customer/place_model";
import PlaceDataContract from "../../../../port/repository/customer/place_data_contract";
import PlaceScheme from "./place_scheme";

class PlaceMongodb implements PlaceDataContract {
  async getPlaceSuggestions(
    request: GetPlaceSuggestionRequest
  ): Promise<PlaceModel[]> {
    const query = PlaceScheme.find({
      keyword: { $regex: request.keyword, $options: "i" },
    })
      .lean()
      .select("-active -created_at -updated_at -__v");

    if (request.pagination != undefined) {
      query.skip(request.pagination.offset).limit(request.pagination.limit);
    }

    const response = await query.exec();

    let results: PlaceModel[] = [];

    for (const item of response) {
      results = [
        ...results,
        {
          _id: item._id,
          placeId: item.placeId,
          address: item.address,
          lat: item.lat,
          lng: item.lng,
          created_at: item.created_at,
          updated_at: item.updated_at,
        },
      ];
    }

    return results;
  }

  async getPlaceDetail(placeId: string): Promise<PlaceModel | null> {
    const response = await PlaceScheme.findOne({ placeId: placeId })
      .lean()
      .select("-active -created_at -updated_at -__v");

    const results: PlaceModel = {
      _id: response?._id,
      placeId: response?.placeId,
      address: response?.address,
      lat: response?.lat,
      lng: response?.lng,
      created_at: response?.created_at,
      updated_at: response?.updated_at,
    };

    return results;
  }

  async upsertPlaceSuggestion(model: PlaceModel): Promise<void> {
    await PlaceScheme.findOneAndUpdate({ placeId: model.placeId }, model, {
      upsert: true,
    });
  }
}

export default PlaceMongodb;
