interface CustomRequestInit extends RequestInit {
  params?: any;
};

interface FetchAPIResponse<T> {
  status: number;
  statusText: string;
  data: T;
  headers: Headers;
};

class FetchAPI {

  private readonly baseURL: string;
  private readonly defaultOptions: CustomRequestInit;

  constructor (baseURL: string, defaultOptions: CustomRequestInit = {}) {

    this.baseURL = baseURL;
    this.defaultOptions = defaultOptions;

  };

  private mergeURL (url: string, queryParams?: any): string {

    const urlObj = new URL(`${this.baseURL}${url}`);

    if (this.defaultOptions.params) {

      for (const key in this.defaultOptions.params) {

        urlObj.searchParams.append(key, this.defaultOptions.params[key]);

      };

    };

    if (queryParams) {

      for (const key in queryParams) {

        urlObj.searchParams.append(key, queryParams[key]);

      };

    };

    return urlObj.toString();

  };

  async fetch<T = any>(endpoint: string, options: CustomRequestInit = {}): Promise<FetchAPIResponse<T>> {

    let parsedResponse: FetchAPIResponse<T> | null = null;

    const url = `${this.mergeURL(endpoint, options.params)}`;

    const parsedOptions = options;
    delete parsedOptions.params;

    const combinedOptions: RequestInit = {
      ...this.defaultOptions,
      ...parsedOptions,
      headers: {
        ...parsedOptions.headers,
        ...this.defaultOptions.headers
      }
    };

    try {

      const response = await fetch(url, combinedOptions);

      if (!response.ok) throw new Error(`HTTP error! - status: ${response.status}`);

      const data: T = await response.json();

      parsedResponse = {
        headers:    response.headers,
        status:     response.status,
        statusText: response.statusText,
        data
      };

      return parsedResponse;

    } catch (error: any) {

      console.error('Error:', error);
      throw new Error(`An error occurred: ${error.message || 'Unknown error'}`);

    };

  };

};

export default FetchAPI;
