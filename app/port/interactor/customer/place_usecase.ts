import RandomStringGenerator from "../../../common/utility/random_string_generator";
import PlaceModel from "../../../entity/customer/place_model";
import AppConfigContract from "../../repository/customer/app_config_contract";
import PlaceDataContract from "../../repository/customer/place_data_contract";
import PlaceContract from "../../service/customer/place_contract";

class PlaceUsecase {
  private placeRepository: PlaceDataContract;
  private placeService: PlaceContract;
  private app: AppConfigContract;

  constructor(
    placeRepository: PlaceDataContract,
    placeService: PlaceContract,
    app: AppConfigContract
  ) {
    this.placeRepository = placeRepository;
    this.placeService = placeService;
    this.app = app;
  }

  async places(keyword: string): Promise<PlaceModel[]> {
    const app = await this.app.show();

    const savedPlaces = await this.placeRepository.getPlaceSuggestions({
      keyword: keyword,
    });

    let suggestions: PlaceModel[] = [];

    if (savedPlaces.length > 0) {
      suggestions = savedPlaces;
    } else {
      const randomString = new RandomStringGenerator();

      const placeAutocomplete = await this.placeService.placeSuggestions({
        keyword: keyword,
        lat: app.cities[0].lat,
        lng: app.cities[0].lng,
        radius: app.cities[0].radius,
        session: randomString.uuidv4(),
      });

      for (const item of placeAutocomplete) {
        await this.placeRepository.upsertPlaceSuggestion({
          placeId: item.id,
          address: item.address,
        });

        suggestions = [
          ...suggestions,
          { placeId: item.id, address: item.address },
        ];
      }
    }

    return suggestions;
  }
}

export default PlaceUsecase;
