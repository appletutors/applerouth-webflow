/* eslint-disable @typescript-eslint/no-this-alias */

import { GeolocationQuery } from '$api/geolocationQuery';
import type { GeolocationQueryParams } from '$api/geolocationQueryTypes';
import { getLocationByIP } from '$api/ipQuery';

/**
 * Goals:
 * 1. Get the Geolocation - either via browser or IP
 * 2. Set the appropriate location on the store, which is used as the central location point
 */
class Geolocation {
  constructor() {
    this.getLocation();
    this.registerAlpineStore();
    this.createAlpineData();
    this.getLocation();
  }

  public registerAlpineStore(): void {
    const self = this;

    document.addEventListener('alpine:init', () => {
      window.Alpine.store('geolocation', {
        abbr: '',
        id: '',
        city: '',
        state: '',

        init() {
          if ('' !== this.id) {
            console.log('Geolocation ID already present in store - ', this.id);
            return;
          }

          self.getLocation();
        },

        update(abbr: string, id: number, city: string, state: string) {
          this.abbr = abbr;
          this.id = id;
          this.city = city;
          this.state = state;
        },
      });
    });
  }

  public createAlpineData(): void {
    const self = this;

    document.addEventListener('alpine:init', () => {
      window.Alpine.data('geolocation', () => ({
        zipInput: '',
        showError: false,
        locationName() {
          return `${this.$store.geolocation.city}, ${this.$store.geolocation.state}`;
        },

        runQuery() {
          const apiBody: GeolocationQueryParams = {
            type: 'zip',
            zipcode: this.zipInput,
          };

          const response = new GeolocationQuery(apiBody).sendQuery();
          self.updateAlpineStore(response.abbr, response.id, response.city, response.state);
        },
      }));
    });
  }

  public updateAlpineStore(abbr: string, id: number, city: string, state: string) {
    window.Alpine.store('geolocation').update(abbr, id, city, state);
  }

  public getLocation(): void {
    // const ipLocation = this.getLocationByIP();
    // NOTE: temporary implementation
    this.setDefaultLocation();
  }

  /**
   * Sets the default geolocation market - "Other"
   */
  public setDefaultLocation(): void {
    this.updateAlpineStore('Other', 4, '', '');
  }
}

new Geolocation();
