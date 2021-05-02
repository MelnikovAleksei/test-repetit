import React from 'react';
import styled from 'styled-components';
import  { device } from '../shared/device'

const Button = styled.button`
  box-sizing: border-box;
  padding: 14px 0;
  margin: 0;
  min-width: 100%;
  border: none;
  border-radius: 5px;
  font-family: ${props => props.theme.primFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  cursor: pointer;
  color: ${props => props.theme.primColorWhite};
  background-color: ${props => props.theme.primColorGreen};
  transition: all .3s ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.primColorGreen};
    background-color: ${props => props.theme.primColorWhite};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.primColorGreen};
    background-color: ${props => props.theme.primColorWhite};
  }

  @media ${device.desktop} {
    min-width: 188px;
    font-size: 16px;
    line-height: 1.18;
    padding-left: 22px;
    padding-right: 22px;
    margin-left: 18px;
    align-self: flex-end;
  }
`;

function SubmitButton({
  title,
  disabled,
}) {
  return (
    <Button disabled={disabled} type="submit">
      {title}
    </Button>
  )
}

export default SubmitButton
