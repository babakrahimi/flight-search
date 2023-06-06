import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select, { Option } from "./Select";
import Button from "./Button";
import landingIcon from "./../assets/images/landing.svg";
import takeoffIcon from "./../assets/images/take-off.svg";
import { media } from "../theme/mixins";
import { fetchAirports } from "../services";

export interface SearchData {
  originIata: string;
  destIata: string;
}

export interface FlightSearchProps {
  id: string;
  onSearch: (data: SearchData) => void;
}

const StyledSearch = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  border-radius: ${(props) => props.theme.sizes.small};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 24px;
  ${media.desktop`
    flex-direction: row;
    flex-wrap: wrap;
    > div {
      flex: 1 1 200px;
    }
    > button {
      width: 100%;
    }
  `}
`;

export const FlightSearch: React.FC<FlightSearchProps> = ({
  onSearch,
  ...props
}) => {
  const [airports, setAirports] = useState<Option[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<Option>();
  const [selectedDest, setSelectedDest] = useState<Option>();

  useEffect(() => {
    fetchAirports()
      .then((res) => res)
      .then((res) =>
        res.map((airport) => ({
          label: airport.name,
          value: airport.iata,
        }))
      )
      .then(setAirports);
  }, []);

  function handleSearch() {
    onSearch({
      originIata: selectedOrigin!.value,
      destIata: selectedDest!.value,
    });
  }

  return (
    <StyledSearch {...props}>
      <Select
        id="origin"
        placeholder="Origin"
        value={selectedOrigin}
        options={airports}
        iconUrl={landingIcon}
        onChange={setSelectedOrigin}
      />
      <Select
        id="destination"
        placeholder="Destination"
        value={selectedDest}
        options={airports}
        iconUrl={takeoffIcon}
        onChange={setSelectedDest}
      />
      <Button
        id="search-button"
        onClick={handleSearch}
        disabled={!selectedOrigin || !selectedDest}
      >
        Search
      </Button>
    </StyledSearch>
  );
};

export default FlightSearch;
