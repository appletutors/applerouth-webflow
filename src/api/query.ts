// TODO: Error handling

type apiBody = Record<string, unknown>;

abstract class QueryAPI {
  API_BASE = '';
  API_ENDPOINT?: string;
  API_BODY?: apiBody;

  public async processQuery() {
    fetch(this.API_BASE + this.API_ENDPOINT).then((response: Response) => {
      return response.json();
    });
  }
}

export default QueryAPI;
