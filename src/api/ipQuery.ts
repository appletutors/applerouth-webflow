// TODO: convert into a class and make a further query to geolocation to fetch the actual location from IP

interface IPResponse {
  ip: string | null;
}

export const getLocationByIP = async (): Promise<IPResponse> => {
  const IP_API = 'https://api.ipify.org/?format=json';

  const response = await fetch(IP_API, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error(`Unable to fetch IP address:`);
    console.error(response, response.statusText);

    return {
      ip: null,
    };
  }

  const responseJSON: Promise<IPResponse> = await response.json();
  return responseJSON;
};
