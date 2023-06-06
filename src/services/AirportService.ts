import { getData } from "./utils";

export interface AirportInfo {
  name: string;
  iata: string;
}

export async function fetchAirports(): Promise<AirportInfo[]> {
  return (await getData<AirportInfo[]>("/airports")) ?? [];
}
