import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./services");

const { fetchPriceOffer } = require("./services");

describe("App", () => {
  beforeEach(() => {
    fetchPriceOffer.mockResolvedValue([
      {
        uuid: "1",
        origin: "New York",
        destination: "Paris",
        departureDate: "2023-05-01",
        returnDate: "2023-05-08",
        price: 500,
      },
      {
        uuid: "2",
        origin: "Los Angeles",
        destination: "Tokyo",
        departureDate: "2023-05-02",
        returnDate: "2023-05-09",
        price: 800,
      },
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("displays flight results when search is submitted", async () => {
    render(<App />);
    const originInput = screen.getByTestId("react-select-3-input");
    const destinationInput = screen.getByTestId("react-select-5-input");
    const submitButton = screen.getByTestId("search-button");

    fireEvent.change(originInput, { target: { value: "New York" } });
    fireEvent.change(destinationInput, { target: { value: "Paris" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetchPriceOffer).toHaveBeenCalledTimes(1));

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    const price = screen.getByText("$500");
    expect(price).toBeInTheDocument();
  });

  it("displays 'No flights available' when there are no flight results", async () => {
    fetchPriceOffer.mockResolvedValue([]);

    render(<App />);
    const originInput = screen.getByTestId("react-select-3-input");
    const destinationInput = screen.getByTestId("react-select-5-input");
    const submitButton = screen.getByTestId("search-button");

    fireEvent.change(originInput, { target: { value: "Invalid" } });
    fireEvent.change(destinationInput, { target: { value: "Query" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetchPriceOffer).toHaveBeenCalledTimes(1));

    const noFlights = screen.getByText("No flights available");
    expect(noFlights).toBeInTheDocument();
  });
});
