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
      throw this.processError(err)
    }
  }

  private processError(err: AxiosError): AxiosError {
    const error = err
    switch (err.response?.status) {
    case 400:
      error.message = 'Bad Request'
      return error
    case 401:
      error.message = 'Unauthorized'
      return error
    case 403:
      error.message = 'Forbidden'
      return error
    case 404:
      error.message = 'Not Found'
      return error
    case undefined:
      error.message = 'Please check your Internet connection and try again'
      return error
    default:
      error.message = 'Something Went Wrong'
      return error
    }
  }
}
