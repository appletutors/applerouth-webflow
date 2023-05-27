/**
 * "Find by Event Code" component
 * Includes a form with an input to enter the event code
 * Expected to redirect to the specific event code page in OneCanoe when a correct event code is entered
 *
 * Component Name - `eventCodeFind`
 */

/* eslint-disable @typescript-eslint/no-this-alias */
import EventQuery from '$api/eventQuery';
import type { EventsAPIResponse, EventsQueryParams } from '$api/eventQueryTypes';

class EventCodeFind {
  /**
   * Alpine Component Name
   */
  COMPONENT_NAME = 'eventCodeFind';

  /**
   * Timeout in milliseconds for the error state
   */
  ERROR_ANIMATION_TIMEOUT_IN_MS = 700;

  constructor() {
    this.createAlpineData();
  }

  /**
   * Creates an AlpineJS component for event code and sets its functionalities
   */
  public createAlpineData(): void {
    const self = this;

    window.addEventListener('alpine:init', () => {
      window.Alpine.data(this.COMPONENT_NAME, () => ({
        isError: false,
        isLoading: false,
        eventCode: '',

        /**
         * Queries the API to check for an existing event for the given code
         * @returns void Redirects to the event page in case of a successful response
         */
        async processQuery() {
          const apiBody: EventsQueryParams = {
            category: ['all'],
            event_code: this.eventCode,
          };

          this.isLoading = true;

          const responseData = (await new EventQuery(apiBody).sendQuery()) as
            | EventsAPIResponse[]
            | [];

          if (!responseData.length) {
            this.isLoading = false;
            this.isError = true;

            // Trigger the error shake animation on the input
            this.$refs.eventCodeIXTrigger.click();

            setTimeout(() => {
              this.isError = false;
              this.eventCode = '';
              this.$refs.eventCodeInput.focus();
            }, self.ERROR_ANIMATION_TIMEOUT_IN_MS);
            return;
          }

          // Redirect to the event page
          window.location.href = responseData[0].event_page_url;
        },
      }));
    });
  }
}

new EventCodeFind();
