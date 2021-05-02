import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  box-sizing: border-box;
  padding: 14px 0;
  margin: 0;
  min-width: 100%;
  border: none;
  border-radius: 5px;
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  cursor: pointer;
  color: ${props => props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.main};
  transition: all .3s ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.main};
    background-color: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.colors.main};
    background-color: ${props => props.theme.colors.secondary};
  }

  @media ${props => props.theme.device.size.large} {
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
