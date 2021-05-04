import React from 'react';
import styled from 'styled-components';

const FeedbackTextContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 21px 65px 21px;
  max-width: 1152px;
  margin: 0 auto;
`;

const FeedbackTextPara = styled.p`
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.18;
  color: ${props => props.theme.colors.main};
`;

function FeedbackText({
  text,
}: {
  text: string
}) {
  return (
    <FeedbackTextContainer>
      <FeedbackTextPara>{text}</FeedbackTextPara>
    </FeedbackTextContainer>
  )
}

export default FeedbackText
