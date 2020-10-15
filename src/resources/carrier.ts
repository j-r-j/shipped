export interface Carrier {
  carrier_code: string;
  carrier_id: string;
  nickname: string;
  friendly_name: string;
  services: CarrierService[];
}

interface CarrierService {
  carrier_id: string;
  carrier_code: string;
  service_code: string;
  name: string;
  domestic: boolean;
  international: boolean;
}

export interface CarrierListApiResponse {
  carriers: Carrier[];
}
