import React from "react";
import styled from "styled-components";
import logo from "./../assets/images/logo.svg";

export interface HeaderProps {
  id: string;
}

const StyledHeader = styled.header`
  background-color: #fff;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  position: fixed;
  z-index: 1100;
  top: 0;
  left: auto;
  right: 0;
  padding: 10px 24px;
  img {
    width: 150px;
    height: 50px;
  }
`;

export const Header: React.FC<HeaderProps> = ({ id, ...props }) => {
  return (
    <StyledHeader id={id} {...props}>
      <img src={logo} alt="Eurowings Digital" />
    </StyledHeader>
  );
};

export default Header;
