import React from "react";
import styled, { DefaultTheme } from "styled-components";
import Select, { components, SingleValue, MultiValue } from "react-select";
import { Light } from "./../theme/variables";

export interface Option {
  label: string;
  value: string;
}

interface InputProps {
  id: string;
  options: Option[];
  value?: string | Option | Option[];
  placeholder?: string;
  iconUrl?: string;
  onChange: (value: Option) => void;
}

const StyledIcon = styled.i`
  display: block;
  position: absolute;
  left: 16px;
  top: 50%;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Control = ({ iconUrl, innerRef, children, innerProps, ...rest }: any) => {
  return (
    <components.Control innerRef={innerRef} innerProps={innerProps} {...rest}>
      <StyledIcon
        style={{
          backgroundImage: `url(${iconUrl})`,
        }}
      />
      {children}
    </components.Control>
  );
};

const customStyles = (theme: DefaultTheme) => {
  return {
    menu: (provided: any) => ({
      ...provided,
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroun: "red",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#f1f1f1"
        : state.isFocused
        ? "#f9f9f9"
        : null,
      color: state.isSelected ? "#212529" : "inherit",
    }),

    control: (provided: any) => ({
      ...provided,
      borderRadius: theme.sizes.small,
      borderColor: "#ced4da",
      height: "56px",
      position: "relative",
      paddingLeft: "50px",
    }),

    label: () => ({}),

    placeholder: (provided: any) => ({
      ...provided,
      color: "#495057",
    }),
  };
};

const SelectClass = ({
  placeholder,
  options,
  iconUrl,
  value,
  onChange,
}: InputProps) => {
  const handleChange = (
    selectedOption: MultiValue<string | Option> | SingleValue<string | Option>
  ) => {
    if (Array.isArray(selectedOption) || typeof selectedOption === "string")
      throw new Error("Multiselection or string value is not supported.");

    onChange(selectedOption as Option);
  };

  return (
    <Select
      options={options}
      styles={{ ...customStyles(Light) }}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      components={{
        ...components,
        Control: (props) => <Control {...props} iconUrl={iconUrl} />,
      }}
    />
  );
};

export default SelectClass;
