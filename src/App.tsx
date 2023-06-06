import React, { useState } from "react";
import { fetchPriceOffer, FlightInfo } from "./services";
import Card from "./components/Card";
import Text, { TextSizes } from "./components/Text";
import Header from "./components/Header";
import FlightSearch, { SearchData } from "./components/FlightSearch";
import Wrapper from "./components/Wrapper";
import { ThemeProvider } from "styled-components";
import { Light } from "./theme/variables";

function App() {
  const [flightData, setFlightData] = useState<FlightInfo[]>();

  const handleSearch = (filter: SearchData) => {
    fetchPriceOffer(filter).then(setFlightData);
  };

  function renderResult() {
    if (!flightData) return;

    if (!flightData?.length) {
      return (
        <Text element="p" textSize={TextSizes.Large} isCentered>
          No flights available
        </Text>
      );
    }

    return flightData.map((flight) => (
      <Card
        id="card"
        key={flight.uuid}
        origin={flight.origin}
        destination={flight.destination}
        departureDate={flight.departureDate}
        returnDate={flight.returnDate}
        price={flight.price}
      />
    ));
  }

  return (
    <ThemeProvider theme={Light}>
      <Wrapper>
        <Header id="header" />
        <Text element="p" textSize={TextSizes.Large} isBold>
          Find your next dream destination
        </Text>
        <FlightSearch id="search" onSearch={handleSearch} />
        {renderResult()}
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
