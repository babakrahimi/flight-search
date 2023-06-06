import React, { ReactNode } from "react";
import styled from "styled-components";

export enum ButtonTypes {
  Default,
}

export enum ButtonSizes {
  Small,
  Tiny,
  Default,
  Medium,
}

export interface ButtonProps {
  id?: string;
  className?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  buttonType?: ButtonTypes;
  preventThrottle?: boolean;
  value?: string;
  children?: ReactNode;
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: 0 none;
  color: #fff;
  border-radius: ${(props) => props.theme.sizes.small};
  font-size: 16px;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  cursor: pointer;
  display: block;
  &:hover {
    background-color: ${(props) => props.theme.sizes.small};
    color: #fff;
  }
  &:active {
    transform: ${(props) => props.theme.sizes.small};
  }
  &:disabled {
    background-color: rgba(173, 173, 173, 0.75);
    cursor: not-allowed;
  }
`;

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <StyledButton
      id={props.id}
      type={props.type}
      title={props.title}
      className={props.className}
      onClick={handleClick}
      disabled={props.disabled}
      value={props.value}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
