export type GeolocationQueryParams = {
  type: 'zip' | 'coord' | 'ip'; // The type of parameter supplied to fetch the market name
  zipcode?: number;
  coord?: [number, number]; // latitude, longitude
  ip?: number; // To consider - if we need some validation on the server
};

export type GeolocationAPIResponse = {
  any: any;
};
