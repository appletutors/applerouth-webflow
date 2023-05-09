export type EventsQueryParams = {
  category: ['practice_test' | 'marketing_event' | 'class' | 'all']; // The “all” option would query by all categories
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

export type EventsAPIResponse = {
  id?: number;
  name?: string;
  type?: string;
  description?: string;
  event_code?: string;
  is_online?: boolean;
  test_date?: Date | null;
  starts_at?: Date;
  ends_at?: Date;
  price?: string;
  class_schedule?: {
    first_session_date: Date;
    final_session_date: Date;
    first_practice_test_date: Date;
    final_practice_test_date: Date;
    instructional_time: number;
    sessions_count: number;
  };
  tags?: [string];
  markets?: [1];
  topics?: [string];
  days_of_week?: [string];
  address?: string;
  presenters?: [string] | null;
  location_id?: number;
  location_name?: string;
  google_maps_url?: string;
  extended_time_available?: boolean | null;
  event_page_url?: string;
};
