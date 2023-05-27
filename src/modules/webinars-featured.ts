/**
 * Featured Webinars slider for the webinar events page (located at `/events/webinars`)
 *
 * Component name - `webinarsFeatured`
 */

/* eslint-disable @typescript-eslint/no-this-alias */
import EventQuery from '$api/eventQuery';
import type { EventsAPIResponse, EventsQueryParams } from '$api/eventQueryTypes';
import { type DateTimeRange, getDateTimeRange } from '$utils/getDateTimeRange';
import { reInitSliders } from '$utils/reinitSliders';

class EventHome {
  COMPONENT_NAME = 'webinarsFeatured';

  constructor() {
    this.createAlpineData();
  }

  public createAlpineData(): void {
    window.addEventListener('alpine:init', () => {
      const API_BODY: EventsQueryParams = {
        category: ['marketing_event'],
        market: window.Alpine.store('geolocation').id,
        is_online: true,
        limit: 6,
      };

      window.Alpine.data(this.COMPONENT_NAME, () => ({
        noResponse: false,
        events: {},

        apiBody: API_BODY,

        // event slider data-attributes
        webinarsFeaturedSlide: {
          [':key']() {
            return this.event.id;
          },
        },

        /**
         * Set image on the webinar according to the blog tag
         */
        webinarsFeaturedSlideImage: {
          [':src']() {
            // TODO - fetch image from webflow uploads based on the webinar event blog tag
            return '';
          },
        },

        init() {
          this.processQuery();

          this.$watch('apiBody', () => {
            this.processQuery();
          });
        },

        async processQuery(): Promise<void> {
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

        /**
         * Returns presenters for the given webinar in a comma separated string
         */
        getPresenters(event: EventsAPIResponse): string {
          const { presenters } = event;

          if (!presenters || !presenters.length) {
            return 'No presenters';
          }

          return presenters.join(', ');
        },

        getDateTime(start: string, end: string): DateTimeRange {
          return getDateTimeRange(start, end);
        },
      }));
    });
  }
}

new EventHome();
