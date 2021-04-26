import React from 'react';
import NotAllowedImage from '../images/not-allowed-image.png';

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
    <article className="article">
      <img
        className="article__image"
        src={getImgUrl(tutorData)}
        alt={getImgAltText(tutorData)}
      />
      <div className="article__container">
        <h3 className="article__title">{getName(tutorData)}</h3>
        <p className="article__subtitle">{getSubjects(tutorData)}</p>
        <p className="article__text">{getMinPrice(tutorData)}</p>
      </div>
    </article>
  )
}

export default CardTutor
