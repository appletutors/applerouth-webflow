/* eslint-disable @typescript-eslint/no-this-alias */

import GeolocationQuery from '$api/geolocationQuery';
import type { GeolocationQueryParams } from '$api/geolocationQueryTypes';
// import { getLocationByIP } from '$api/ipQuery';

interface GeolocationStore {
  abbr: string;
  id: number;
  city: string;
  state: string;
}

/**
 * Goals:
 * 1. Get the Geolocation - either via browser or IP
 * 2. Set the appropriate location on the store, which is used as the central location point
 */
class Geolocation {
  constructor() {
    this.registerAlpineStore();
    this.createAlpineData();

    // document.addEventListener('alpine:init', () => {
    this.getLocation();
    // });
  }

  public registerAlpineStore(): void {
    const self = this;
    const defaultLocation = this.getDefaultLocation();

    // document.addEventListener('alpine:init', () => {
    window.Alpine.store('geolocation', {
      abbr: '',
      id: window.Alpine.$persist(defaultLocation.id).as('location_id'),
      city: '',
      state: '',

      init() {
        if ('' !== this.id && !this.id.initialValue) {
          console.log('Geolocation ID already set - ', this.id);
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
    // });
  }

  public createAlpineData(): void {
    const self = this;

    document.addEventListener('alpine:init', () => {
      window.Alpine.data('geolocation', () => ({
        zipInput: '',
        showError: false,
        locationName() {
          const { state } = this.$store.geolocation;
          let suffix = '';

          if ('' !== state) {
            suffix = `, ${state}`;
          }

          return `${this.$store.geolocation.city}${suffix}`;
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
    const defaultLocation = this.getDefaultLocation();

    this.updateAlpineStore(
      defaultLocation.abbr,
      defaultLocation.id,
      defaultLocation.city,
      defaultLocation.state
    );
  }

  private getDefaultLocation(): GeolocationStore {
    return {
      abbr: 'Other',
      id: 4,
      city: 'Other',
      state: '',
    };
  }
}

new Geolocation();
