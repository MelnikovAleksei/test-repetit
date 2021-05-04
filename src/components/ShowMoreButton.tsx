import React, {MouseEventHandler} from 'react';
import styled from 'styled-components';

const ShowMoreBtnContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 21px 65px 21px;
  max-width: 1152px;
  margin: 0 auto;
  text-align: center;
`;

const ShowMoreBtn = styled.button`
  box-sizing: border-box;
  padding: 14px 0;
  margin: 0;
  min-width: 100%;
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 5px;
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  cursor: pointer;
  color: #009990;
  background-color: ${props => props.theme.colors.secondary};
  transition: all .3s ease;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.main};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${props => props.theme.colors.main};
    background-color: ${props => props.theme.colors.secondary};
  }

  @media ${props => props.theme.device.size.large} {
    min-width: auto;
    width: 336px;
    font-size: 16px;
    line-height: 1.18;
  }
`;

function ShowMoreButton({
  title,
  onClick,
  disabled,
}: {
  title: string,
  onClick: MouseEventHandler<HTMLButtonElement> | undefined,
  disabled: boolean
}) {
  return (
    <ShowMoreBtnContainer>
      <ShowMoreBtn
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </ShowMoreBtn>
    </ShowMoreBtnContainer>

  )
}

export default ShowMoreButton
