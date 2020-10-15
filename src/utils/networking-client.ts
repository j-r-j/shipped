import axios, {AxiosError, AxiosRequestConfig} from 'axios'

interface GetParams {
  path: string;
}

export interface ShippedNetworkingClient {
  get<T>({path}: GetParams): Promise<T>;
}

export default class NetworkingClient implements ShippedNetworkingClient {
  private URL = 'https://api.shipengine.com';

  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Makes an authenticated GET request to the ShipEngine API.
   * @param {GetParams} path params needed to make GET request
   * @returns {Promise<T>} Promise the returns a type specified by the calling code.
   */
  async get<T>({path}: GetParams): Promise<T> {
    const headers = {'API-Key': this.apiKey}

    const requestConfig: AxiosRequestConfig = {
      headers: headers,
      method: 'GET',
      url: `${this.URL}/${path}`,
    }

    try {
      const response = await axios(requestConfig)
      return response.data as T
    } catch (error) {
      const err = error as AxiosError
      throw new Error(this.processError(err))
    }
  }

  private processError(err: AxiosError): string {
    switch (err.response?.status) {
    case 400:
      return 'Bad Request'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Forbidden'
    case 404:
      return 'Not Found'
    case 500 - 599:
      return 'Something Went Wrong'
    case undefined:
      return 'Please check your Internet connection and try again'
    default:
      if (err.response?.statusText !== undefined) {
        return err.response?.statusText
      }

      return 'Something Went Wrong'
    }
  }
}
