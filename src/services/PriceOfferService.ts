import { getData } from "./utils";

export interface FlightInfo {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  seatAvailability: number;
  price: {
    amount: number;
    currency: string;
  };
  offerType: string;
  uuid: string;
}

interface FetchFilter {
  originIata: string;
  destIata: string;
}

export async function fetchPriceOffer(
  filter: FetchFilter
): Promise<FlightInfo[]> {
  // TODO: The filtering should be handled on the server-side, but for the sake of simplicity
  //       we'll keep it here.
  const flights = (await getData<FlightInfo[]>(`/price-offer`)) ?? [];
  return flights.filter(
    (flight) =>
      flight.origin === filter.originIata &&
      flight.destination === filter.destIata
  );
}
