import React from 'react';
import NotAllowedImage from '../images/not-allowed-image.png';
import styled from 'styled-components';
import {device} from "../shared/device";

const Article = styled.article`
  padding: 11px 9px;
  box-sizing: border-box;
  display: flex;
  background: #FFFFFF;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const ArticleImage = styled.img`
  min-width: 57px;
  height: 57px;
  object-fit: cover;
  border-radius: 50%;
  padding: 6px 7px;

  @media ${device.desktop} {
    min-width: 78px;
    height: 78px;
  }
`;

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 5px;
`;

const ArticleTitle = styled.h3`
  font-family: ${props => props.theme.primFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  color: #000000;
  box-sizing: border-box;
  margin: 0;
  padding: 4px;

  @media ${device.desktop} {
    font-size: 18px;
    line-height: 1.16;
    padding-top: 5px;
    padding-bottom: 6px;
  }
`;

const ArticleSubtitle = styled.p`
  font-family: ${props => props.theme.primFontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.18;
  color: #000000;
  box-sizing: border-box;
  margin: 0;
  padding: 4px 4px 1px 4px;

  @media ${device.desktop} {
    font-size: 20px;
    line-height: 1.15;
    padding-top: 5px;
    padding-bottom: 2px;
  }
`;

const ArticleText = styled.p`
  font-family: ${props => props.theme.primFontFamily};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.18;
  color: #009990;
  box-sizing: border-box;
  margin: 0;
  padding: 0 4px;

  @media ${device.desktop} {
    color: ${props => props.theme.primColorGreen};
    font-size: 20px;
    line-height: 1.15;
  }
`;

function CardTutor({
  tutorData,
}) {

  const getName = (data) => {
    return `${data.firstName} ${data.patrName}`;
  };

  const getImgAltText = (data) => {
    return `На фотографии ${data.statusName} ${getName(data)}`;
  };

  const getImgUrl = (data) => {
    return data.hasPhoto ?
      `http:${data.photoPathLarge}` : NotAllowedImage;
  };

  const getSubjects = (data) => {
    return data.teachingSubjects.map((elem, index, array) => (
      array.length - 1 === index ? `${elem.subject.name}` : `${elem.subject.name}; `
    ))
  };

  const getMinPrice = (data) => {
    return `от ${Math.min.apply(null, data.teachingSubjects.map(elem => Number(elem.price))).toString()} р`;
  };

  return (
    <Article>
      <ArticleImage
        src={getImgUrl(tutorData)}
        alt={getImgAltText(tutorData)}
      />
      <ArticleContainer>
        <ArticleTitle>{getName(tutorData)}</ArticleTitle>
        <ArticleSubtitle>{getSubjects(tutorData)}</ArticleSubtitle>
        <ArticleText>{getMinPrice(tutorData)}</ArticleText>
      </ArticleContainer>
    </Article>
  )
}

export default CardTutor
