import * as NetworkingClient from '../../utils/networking-client'
import {Carrier, CarrierListApiResponse} from '../carrier'

export default class CarriersApi {
    private client: NetworkingClient.ShippedNetworkingClient;

    constructor(client: NetworkingClient.ShippedNetworkingClient) {
      this.client = client
    }

    /**
     * List's all Carriers
     * @returns {Promise<Carrier[]>} Promise the returns a Carrier array.
     */
    async listAll(): Promise<Carrier[]> {
      const response = await this.client.get<CarrierListApiResponse>({
        path: 'v1/carriers',
      })
      return response.carriers
    }

    /**
     * Finds a Carrier based off the carrier's id
     * @param {string} carrier_id the id of the carrier to be fetched
     * @returns {Promise<Carrier>} Promise the returns a Carrier.
     */
    async find(carrier_id: string): Promise<Carrier> {
      const response = await this.client.get<Carrier>({
        path: `v1/carriers/${carrier_id}`,
      })
      return response
    }
}
