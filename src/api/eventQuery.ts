import QueryAPI from './query';

type EventQueryParams = {
  category: ['practice_test' | 'webinar' | 'marketing_event' | 'class' | 'all']; // The “all” option would query by all categories
  market?: number; // The id of the market
  id?: number; // ID of the event
  name?: string; // Filters by partial match of name, used for search
  event_code?: string; // Event code. E.g: “EVT83DD6”
  tags?: [string]; // string will be the blog topic name (same in Webflow). Filters by blog topics
  limit?: number; // The number of events sent at a time. Default 12
  start?: number; // The starting event number for the query, used in conjunction with limit for pagination. Default: 0
  topics?: [string]; // Test this event belongs to. Eg: [“SAT”, “ACT”]
  before?: Date;
  after?: Date; // Default: Current timestamp
  test_date?: Date; // The “prepare for test date” date
  is_online?: boolean | ''; // `1` for online, `0` for offline, empty string for both online and offline
  extended_time_available?: boolean;
  days_of_week?: [string]; // Eg: [“M”, “T”]
};

class EventQuery extends QueryAPI {
  API_ENDPOINT = '/event';
  API_BODY: EventQueryParams;

  constructor(apiBody: EventQueryParams) {
    super();
    this.API_BODY = apiBody;
  }
}

export default EventQuery;
