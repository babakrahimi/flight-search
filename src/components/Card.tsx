import React from "react";
import styled from "styled-components";
import Text, { TextColors, TextSizes } from "./Text";
import connectorIcon from "./../assets/images/connector.svg";
import { media } from "../theme/mixins";
import { formatPrice } from "../utils";

interface Price {
  amount: number;
  currency: string;
}
export interface CardProps {
  id: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  price: Price;
}

const StyledCard = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: ${(props) => props.theme.sizes.small};
  padding: 16px;
  background-color: #fff;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    ${media.desktop`
        margin-bottom: 0;
    `}
    &:first-of-type {
      ${media.desktop`
        flex: 1;
      `}
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  ${media.desktop`
    flex-direction: row;
    gap: 20px;
  `}
`;

const ConnectorIcon = styled.i`
  background: url(${connectorIcon}) no-repeat 50% 50%;
  display: block;
  width: 24px;
  height: 24px;
`;

const Divider = styled.span`
  background-color: #212529;
  height: 4px;
  margin: 0 5px;
  width: 4px;
`;

export const Card: React.FC<CardProps> = ({
  id,
  origin,
  destination,
  departureDate,
  returnDate,
  price,
  ...props
}) => {
  return (
    <StyledCard id={id} {...props}>
      <div>
        <Text element="span" textSize={TextSizes.Medium} isBold>
          {origin}
        </Text>
        <ConnectorIcon />
        <Text element="span" textSize={TextSizes.Medium} isBold>
          {destination}
        </Text>
      </div>
      <div>
        <Text
          element="span"
          textColor={TextColors.Gray}
          textSize={TextSizes.Normal}
        >
          {departureDate}
        </Text>
        <Divider />
        <Text
          element="span"
          textColor={TextColors.Gray}
          textSize={TextSizes.Normal}
        >
          {returnDate}
        </Text>
      </div>
      <div>
        <Text
          element="span"
          textColor={TextColors.Gray}
          textSize={TextSizes.Medium}
          isBold
        >
          {formatPrice(price)}
        </Text>
      </div>
    </StyledCard>
  );
};

export default Card;
