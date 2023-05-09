/* eslint-disable @typescript-eslint/no-this-alias */
import type SliderElement from '@finsweet/ts-utils';
import type { Webflow } from '@finsweet/ts-utils';

import EventQuery from '$api/eventQuery';
import type { EventsAPIResponse, EventsQueryParams } from '$api/eventQueryTypes';
import { getDateTimeRange } from '$utils/getDateTimeRange';

class EventHome {
  constructor() {
    this.createAlpineData();
  }

  public createAlpineData(): void {
    const self = this;

    window.addEventListener('alpine:init', () => {
      window.Alpine.data('eventsHome', () => ({
        noResponse: false,
        events: {},

        apiBody: {
          category: ['marketing_event'],
          // market: window.Alpine.store('geolocation').id,
        },

        // event slider data-attributes
        eventsHomeSlide: {
          [':key']() {
            return this.event.id;
          },
          ['aria-label'](): string {
            return `${index + 1} of ${this.events.length}`;
          },
        },

        init() {
          this.processQuery();

          this.$watch('apiBody', () => {
            this.processQuery();
          });
        },

        async processQuery() {
          const responseData = await new EventQuery(this.apiBody).sendQuery();

          if (!responseData.length) {
            this.noResponse = true;
            return;
          }

          console.log('setting events');
          this.events = responseData;
          await this.$nextTick;
          self.refreshSlider();
        },

        getDateTime(start: string, end: string): Record<string, unknown> {
          return getDateTimeRange(start, end);
        },
      }));

      // window.Alpine.bind('eventsHomeSlide', () => ({
      //   // ':key'(): number {
      //   //   return event.id;
      //   // },

      //   'aria-label'(): string {
      //     return `${index + 1} of ${this.events.length}`;
      //   },
      // }));
    });
  }

  /**
   * Refresh Swiper Slider with new event items
   */
  public refreshSlider(): void {
    console.log('slider redraw');
    window.Webflow.require('slider').redraw();
  }
}

new EventHome();
