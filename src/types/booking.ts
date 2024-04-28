import { hotelFacilities, hotelRatings } from '@/utils/constants';

export interface BookingRequest {
  bookingType: string;
  location: string;
  direct: boolean;
  departureDate: string;
  duration: string;
  gateway: string;
  partyCompositions: PartyComposition[];
}

export enum FilterID {
  PRICE = 'p',
  RATING = 'r',
  FACILITIES = 'f',
}

export type VRating = (typeof hotelRatings)[number];

type SearchParamKeys =
  | 'bookingType'
  | 'location'
  | 'departureDate'
  | 'duration'
  | 'gateway'
  | 'partyCompositions'
  | 'filters';
export type SearchParams = Record<SearchParamKeys, string>;

export interface Facet {
  locationId: string[];
  description: string;
  children: Facet[];
}

export interface RulesContentImage {
  order: number;
  description: string;
  variants: {
    PROMO_CARD_NOT_CROPPED: string;
    HOTEL_CAROUSEL_LARGE: string;
  };
}

export interface RulesContent {
  longDescription: string;
  images: RulesContentImage[];
  isCloseButtonEnabled: boolean;
  description: string;
}

export type DateWindedType = 'LIVE' | 'OFFER';

export interface DateWidened {
  departureDate: string;
  selectedDate: string;
  fromPerPersonPrice: number;
  type: DateWindedType;
  rulesContent: RulesContent;
}

export interface Destination {
  name: string;
  gateway: string;
}

export interface BookingResponse {
  holidays: Holiday[];
  facet: Facet[];
  hasWidened: boolean;
  dateWidened: DateWidened[];
  rulesContent: RulesContent;
  destination: Destination;
  mixedArrivalAirports: boolean;
}

export interface Sector {
  airline: string;
  airlineName: string;
  cabinClass: string;
  flightNumber: string;
  stops: number;
  operatingAirline: string;
  operatingAirlineName: string;
  from: string;
  to: string;
  departureAirport: string;
  departureAirportCode: string;
  arrivalAirport: string;
  arrivalAirportCode: string;
}

export interface Flight {
  airline: string;
  airlineName: string;
  cabinClass: string;
  departureAirport: string;
  departureAirportCode: string;
  arrivalAirport: string;
  arrivalAirportCode: string;
  sectors: Sector[];
  isAlternateArrivalAirport?: boolean;
}

export interface Holiday {
  totalPrice: number;
  pricePerPerson: number;
  /** @deprecated flyingClubMiles not found in response*/
  flyingClubMiles: number;
  virginPoints: number;
  tierPoints: number;
  departureDate: string;
  selectedDate: string;
  hotel: Hotel;
  totalPriceBeforeDiscount: number;
  pricePerPersonBeforeDiscount: number;
  depositPerPerson: number;
  webDiscount: number;
  deposit: number;
  outboundFlight: Flight;
  inboundFlight: Flight;
  locationWidened: boolean;
}

export interface PartyComposition {
  adults: number;
  childAges: number[];
  infants: number;
}

export interface Hotel {
  id: string;
  name: string;
  boardBasis: string;
  content: HotelContent;
}

export interface HotelContent {
  name: string;
  vRating: VRating;
  hotelDescription: string;
  atAGlance: string[];
  parentLocation: string;
  images: HotelImage[];
  holidayType: string[];
  boardBasis: string[];
  hotelLocation: string[];
  accommodationType: string[];
  hotelFacilities: string[];
  starRating: number | string;
  propertyType: string;
}

export interface HotelImage {
  RESULTS_CAROUSEL: Image;
}

export interface Image {
  url: string;
}
