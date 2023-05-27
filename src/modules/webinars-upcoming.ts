/**
 * Upcoming webinars lazy-loaded list for the webinar events page (located at `/events/webinars`)
 *
 * Component name - `webinarsUpcoming`
 */

/* eslint-disable @typescript-eslint/no-this-alias */
import EventQuery from '$api/eventQuery';
import type { EventsAPIResponse, EventsQueryParams } from '$api/eventQueryTypes';
import { type DateTimeRange, getDateTimeRange } from '$utils/getDateTimeRange';

class WebinarsUpcoming {
  COMPONENT_NAME = 'webinarsUpcoming';

  /**
   * The starting number of event
   * Used for lazy-loaded pagination
   *
   * Starts with 7 because 6 events already exist in the featured slider
   */
  START_POINT = 7;

  /**
   * Number of events to load at once
   */
  BATCH_COUNT = 6;

  constructor() {
    this.createAlpineData();
  }

  public createAlpineData(): void {
    window.addEventListener('alpine:init', () => {
      const self = this;

      const API_BODY: EventsQueryParams = {
        category: ['marketing_event'],
        market: window.Alpine.store('geolocation').id,
        is_online: true,
        start: 7,
        limit: this.BATCH_COUNT,
      };

      window.Alpine.data(this.COMPONENT_NAME, () => ({
        noResponse: false,
        events: [],

        // Loading state for the "View More" pagination
        isLoading: false,

        // Tracking whether we have any more events to show or not
        eventsDepleted: false,

        apiBody: API_BODY,

        // event slider data-attributes
        webinarsUpcomingItemAttr: {
          [':key']() {
            return this.event.id;
          },
        },

        init(): void {
          this.processQuery();

          this.$watch('apiBody', () => {
            this.processQuery();
          });
        },

        /**
         * Queries and populates events in the list
         */
        async processQuery(): Promise<void> {
          this.isLoading = true;

          console.log('start', API_BODY.start);

          const responseData = (await new EventQuery(this.apiBody).sendQuery()) as
            | EventsAPIResponse[]
            | [];

          this.isLoading = false;

          if (API_BODY.start) {
            API_BODY.start += self.BATCH_COUNT;
          }

          if (!responseData.length) {
            this.noResponse = true;
            return;
          }

          if (responseData.length < self.BATCH_COUNT) {
            this.eventsDepleted = true;
          }

          this.events.push(...responseData);
          console.log('events added');
          await this.$nextTick;
        },

        viewMoreEvents(): void {
          this.processQuery();
        },

        getDateTime(start: string, end: string): DateTimeRange {
          return getDateTimeRange(start, end);
        },

        getTimeRange(start: string, end: string): string {
          const { startTime, endTime } = getDateTimeRange(start, end);
          return `${startTime} - ${endTime}`;
        },
      }));
    });
  }
}

new WebinarsUpcoming();
