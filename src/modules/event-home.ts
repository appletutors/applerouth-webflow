/**
 * Events slider for the homepage
 *
 * Component name - `eventsHome`
 */

/* eslint-disable @typescript-eslint/no-this-alias */
import EventQuery from '$api/eventQuery';
import type { EventsAPIResponse, EventsQueryParams } from '$api/eventQueryTypes';
import { getDateTimeRange } from '$utils/getDateTimeRange';
import { reInitSliders } from '$utils/reinitSliders';

class EventHome {
  COMPONENT_NAME = 'eventsHome';

  constructor() {
    this.createAlpineData();
  }

  public createAlpineData(): void {
    window.addEventListener('alpine:init', () => {
      const API_BODY: EventsQueryParams = {
        category: ['marketing_event'],
        market: window.Alpine.store('geolocation').id,
      };

      window.Alpine.data(this.COMPONENT_NAME, () => ({
        noResponse: false,
        events: {},

        apiBody: API_BODY,

        // event slider data-attributes
        eventsHomeSlide: {
          [':key']() {
            return this.event.id;
          },
        },

        init() {
          this.processQuery();

          this.$watch('apiBody', () => {
            this.processQuery();
          });
        },

        async processQuery() {
          const responseData = (await new EventQuery(this.apiBody).sendQuery()) as
            | EventsAPIResponse[]
            | [];

          if (!responseData.length) {
            this.noResponse = true;
            return;
          }

          this.events = responseData;
          console.log('events set');
          await this.$nextTick;
          reInitSliders();
        },

        getDateTime(start: string, end: string): Record<string, unknown> {
          return getDateTimeRange(start, end);
        },
      }));
    });
  }
}

new EventHome();
