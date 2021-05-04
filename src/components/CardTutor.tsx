import React from 'react';
import NotAllowedImage from '../images/not-allowed-image.png';
import styled from 'styled-components';

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

  @media ${props => props.theme.device.size.large} {
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
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.14;
  color: #000000;
  box-sizing: border-box;
  margin: 0;
  padding: 4px;

  @media ${props => props.theme.device.size.large} {
    font-size: 18px;
    line-height: 1.16;
    padding-top: 5px;
    padding-bottom: 6px;
  }
`;

const ArticleSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.18;
  color: #000000;
  box-sizing: border-box;
  margin: 0;
  padding: 4px 4px 1px 4px;

  @media ${props => props.theme.device.size.large} {
    font-size: 20px;
    line-height: 1.15;
    padding-top: 5px;
    padding-bottom: 2px;
  }
`;

const ArticleText = styled.p`
  font-family: ${props => props.theme.fonts.main};
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 1.18;
  color: ${props => props.theme.colors.main};
  box-sizing: border-box;
  margin: 0;
  padding: 0 4px;

  @media ${props => props.theme.device.size.large} {
    color: ${props => props.theme.colors.main};
    font-size: 20px;
    line-height: 1.15;
  }
`;

interface SubjectInterface {
  name: string;
}

interface TeachingSubjectInterface {
  subject: SubjectInterface;
  price: number;
}

interface TutorDataInterface {
  firstName: string;
  patrName: string;
  statusName: string;
  hasPhoto: boolean;
  photoPathLarge: string;
  teachingSubjects: TeachingSubjectInterface[];
}

function CardTutor({
  tutorData,
}: {
  tutorData: TutorDataInterface,
}) {

  const getName = (data: TutorDataInterface): string => {
    return `${data.firstName} ${data.patrName}`;
  };

  const getImgAltText = (data: TutorDataInterface): string => {
    return `На фотографии ${data.statusName} ${getName(data)}`;
  };

  const getImgUrl = (data: TutorDataInterface): string => {
    return data.hasPhoto ?
      `http:${data.photoPathLarge}` : NotAllowedImage;
  };

  const getSubjects = (data: TutorDataInterface) => {
    return data.teachingSubjects.map((elem, index, array) => (
      array.length - 1 === index ? `${elem.subject.name}` : `${elem.subject.name}; `
    ))
  };

  const getMinPrice = (data: TutorDataInterface) => {
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
