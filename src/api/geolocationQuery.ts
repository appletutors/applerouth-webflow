import QueryAPI from './query';

export type GeolocationQueryParams = {
  type: 'zip' | 'coord' | 'ip'; // The type of parameter supplied to fetch the market name
  zipcode?: number;
  coord?: [number, number]; // latitude, longitude
  ip?: number; // To consider - if we need some validation on the server
};

export class GeolocationQuery extends QueryAPI {
  API_ENDPOINT = '/geolocation';
  API_BODY: GeolocationQueryParams;

  constructor(apiBody: GeolocationQueryParams) {
    super();
    this.API_BODY = apiBody;
  }
}
