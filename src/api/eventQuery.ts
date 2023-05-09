import type { EventsAPIResponse, EventsQueryParams } from './eventQueryTypes';
import QueryAPI from './query';

export class EventQuery extends QueryAPI {
  API_ENDPOINT = '/events';
  API_BODY: EventsQueryParams;
  DEFAULT_EVENT_LIMIT = 12;

  constructor(apiBody: EventsQueryParams) {
    super();
    this.API_BODY = apiBody;

    this.setAPIDefaults();
  }

  /**
   * Sets the default values for the API
   * Currently, limits maximum number of events to 12
   */
  private setAPIDefaults(): void {
    if (!this.API_BODY.limit) {
      this.API_BODY.limit = this.DEFAULT_EVENT_LIMIT;
    }

    if (!this.API_BODY.start) {
      this.API_BODY.start = 0;
    }
  }
}

export default EventQuery;
