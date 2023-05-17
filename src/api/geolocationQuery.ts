import type { GeolocationAPIResponse, GeolocationQueryParams } from './geolocationQueryTypes';
import QueryAPI from './query';

export class GeolocationQuery extends QueryAPI {
  API_ENDPOINT = '/geolocation';
  API_BODY: GeolocationQueryParams;

  constructor(apiBody: GeolocationQueryParams) {
    super();
    this.API_BODY = apiBody;
  }
}

export default GeolocationQuery;
