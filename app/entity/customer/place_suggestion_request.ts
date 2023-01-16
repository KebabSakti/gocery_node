interface PlaceSuggestionRequest {
  keyword: string;
  session?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}

export default PlaceSuggestionRequest;
