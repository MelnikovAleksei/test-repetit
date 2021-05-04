import React, {ChangeEventHandler} from 'react';
import { ReactComponent as SelectIcon } from '../images/select-input-icon.svg';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  margin-bottom: 8px;

  @media ${props => props.theme.device.size.large} {
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
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  color: ${props => props.theme.colors.main};
  appearance: none;
  border: none;
  outline: none;
  padding: 13px 48px 12px 12px;
  margin: 0;
  width: 100%;
  height: 45px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.secondary};
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 5px;
  transition: all .3s ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.main};
  }

  &:hover ~ div svg path,
  &:focus ~ div svg path {
    fill: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.colors.main};
    background-color: ${props => props.theme.colors.secondary};
  }

  @media ${props => props.theme.device.size.large} {
    max-width: 277px;
    font-size: 16px;
    line-height: 1.18;
  }
`;

interface OptionsDataInterface {
  timeZone: number;
  namePrep: string;
  nameGen: string;
  regionName: string;
  cityName: string;
  name: string;
  id: number;
}

enum PropertyName {
  City = 'cityName',
  Name = 'name',
}

interface SelectInputInterface {
  title: string;
  optionsData: OptionsDataInterface[];
  propertyName: PropertyName;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  name: string;
  required: boolean;
}

function SelectInput({
  title,
  optionsData,
  propertyName,
  disabled,
  onChange,
  name,
  required,
}: SelectInputInterface) {

  const getPropertyValue = (option: OptionsDataInterface, propertyName: PropertyName): string => {
    return option[propertyName];
  }

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
              {getPropertyValue(option, propertyName)}
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
