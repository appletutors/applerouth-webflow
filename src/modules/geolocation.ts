import Alpine from 'alpinejs';

import { GeolocationQuery } from '$api/geolocationQuery';
import type { GeolocationQueryParams } from '$api/geolocationQueryTypes';

/**
 * Goals:
 * 1. Get the Geolocation - either via browser or IP
 * 2. Set the appropriate location on the module, and apply the model to the body element of all pages, since it's global
 */
class Geolocation {
  constructor() {
    this.getLocation();
    this.createAlpineStore();
    this.createAlpineData();
  }

  public getLocation(): void {}

  public createAlpineStore(): void {
    document.addEventListener('alpine:init', () => {
      Alpine.store('geolocation', {
        abbr: '',
        id: '',
        city: '',
        state: '',

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
    document.addEventListener('alpine:init', () => {
      Alpine.data('geolocation', () => ({
        zipInput: '',
        showError: false,

        update() {
          const apiBody: GeolocationQueryParams = {
            type: 'zip',
            zipcode: this.zipInput,
          };

          const response = new GeolocationQuery(apiBody).sendQuery();

          Alpine.store('geolocation').update(
            response.abbr,
            response.id,
            response.city,
            response.state
          );
        },
      }));
    });
  }
}

new Geolocation();
