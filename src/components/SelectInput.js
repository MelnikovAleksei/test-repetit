import React from 'react';
import { ReactComponent as SelectIcon } from '../images/select-input-icon.svg';
import styled from 'styled-components';
import { device } from '../shared/device'

const SelectContainer = styled.div`
  position: relative;
  margin-bottom: 8px;

  @media ${device.desktop} {
    margin-bottom: 0px;
  }
`;

const SelectIconContainer = styled.div`
  position: absolute;
  top: 13px;
  right: 14px;
  transition: all .3s ease;
  pointer-events: none;
`;

const Select = styled.select`
  font-family: ${props => props.theme.primFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  color: ${props => props.theme.primColorGreen};
  appearance: none;
  border: none;
  outline: none;
  padding: 13px 48px 12px 12px;
  margin: 0;
  width: 100%;
  height: 45px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${props => props.theme.primColorWhite};
  border: 2px solid ${props => props.theme.primColorGreen};
  border-radius: 5px;
  transition: all .3s ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.primColorWhite};
    background-color: ${props => props.theme.primColorGreen};
  }

  &:hover ~ div svg path,
  &:focus ~ div svg path {
    fill: ${props => props.theme.primColorWhite};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.primDisabledColor};
    background-color: ${props => props.theme.primColorWhite};
  }

  @media ${device.desktop} {
    max-width: 277px;
    font-size: 16px;
    line-height: 1.18;
  }
`;

function SelectInput({
  title,
  optionsData,
  propertyName,
  disabled,
  onChange,
  name,
  required,
}) {
  return (
    <SelectContainer>
      <Select
        disabled={disabled}
        className="select"
        id="select"
        name={name}
        aria-label={title}
        onChange={onChange}
        required={required}
      >
        <option value="">{title}</option>
        {
          optionsData.map(option => (
            <option
              key={option.id}
              value={option.id}
            >
              {option[propertyName]}
            </option>
          ))
        }
      </Select>
      <SelectIconContainer>
        <SelectIcon />
      </SelectIconContainer>
    </SelectContainer>
  )
}

export default SelectInput
