/**
 * Component to update geolocation
 * Initially automatically determined either via browser coordinates sharing or IP address
 * The user can change the location by adding ZIP code in a form (the Webflow component)
 *
 * Uses localstorage to sync the location across pages and visits
 *
 * Component & Store Name - `geolocation`
 */

/* eslint-disable @typescript-eslint/no-this-alias */

import GeolocationQuery from '$api/geolocationQuery';
import type { GeolocationAPIResponse, GeolocationQueryParams } from '$api/geolocationQueryTypes';
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
  COMPONENT_NAME = 'geolocation';
  STORE_NAME = 'geolocation';

  constructor() {
    this.registerAlpineStore();
    this.createAlpineData();

    this.getLocation();
  }

  public registerAlpineStore(): void {
    const self = this;
    const defaultLocation = this.getDefaultLocation();

    window.Alpine.store(this.STORE_NAME, {
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
  }

  public createAlpineData(): void {
    const self = this;

    document.addEventListener('alpine:init', () => {
      window.Alpine.data(this.COMPONENT_NAME, () => ({
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

        async runQuery() {
          const apiBody: GeolocationQueryParams = {
            type: 'zip',
            zipcode: this.zipInput,
          };

          const responseData = (await new GeolocationQuery(apiBody).sendQuery()) as
            | GeolocationAPIResponse[]
            | [];

          if (!responseData.length) {
            console.warn('Geolocation query failed', { responseData });
            return;
          }

          self.updateAlpineStore(
            responseData.abbr,
            responseData.id,
            responseData.city,
            responseData.state
          );
        },
      }));
    });
  }

  /**
   * Updates the Alpine Store with the specified location parameters
   * This will then trigger an update on all the modules that are using the store value
   */
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

  /**
   * Returns the default location - "Other"
   */
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
