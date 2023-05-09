import type { EventsAPIResponse, EventsQueryParams } from './eventQueryTypes';
import type { GeolocationAPIResponse, GeolocationQueryParams } from './geolocationQueryTypes';

type APIBody = Record<string, unknown>;

type QueryParams = Record<string, unknown>;

type EmptyResponseData = [];
type APIResponseData = (EventsAPIResponse | GeolocationAPIResponse)[];

interface EmptyAPIResponse {
  data: EmptyResponseData;
}
interface APIResponse {
  data: APIResponseData;
}

class QueryAPI {
  API_BASE = 'https://applerouth.onecanoe.com/api/public/v2';
  API_ENDPOINT?: string;
  API_BODY?: APIBody;

  /**
   *
   * @returns
   */
  public async processQuery(): Promise<APIResponse | EmptyAPIResponse> {
    const response = await fetch(this.API_BASE + this.API_ENDPOINT, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.API_BODY),
    });

    if (!response.ok) {
      console.warn(`Error when sending query: ${this.API_BASE}${this.API_ENDPOINT}`);
      console.warn(response, response.statusText);

      return {
        data: this.getEmptyResponseData(),
      };
    }

    const responseJSON: Promise<APIResponse> = await response.json();
    return responseJSON;
  }

  public async sendQuery(): Promise<APIResponseData | EmptyResponseData> {
    const responseJSON = await this.processQuery();

    const { data } = responseJSON;

    if (!data || !data.length) {
      console.warn(`Empty response from the query: ${this.API_BASE}${this.API_ENDPOINT}`);
      return this.getEmptyResponseData();
    }

    return data;
  }

  /**
   * @returns Object Empty data object to mimic no results from the API query
   */
  private getEmptyResponseData(): EmptyResponseData {
    return [];
  }
}

export default QueryAPI;
