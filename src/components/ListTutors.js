import React, { useEffect } from 'react';
import CardTutor from './CardTutor';
import ShowMoreButton from './ShowMoreButton';

function ListTutors({
  tutorsData,
}) {

  const ZERO_NUMBER = 0;
  const NUM_CARDS_TO_RENDER = 10;
  const NUM_CARDS_TO_ADD = 10;


  const [cardsToRender, setCardsToRender] = React.useState([]);
  const [isShowButtonActive, setIsShowButtonActive] = React.useState(false);

  const handleShowMoreClick = () => {
    setCardsToRender(tutorsData.slice(ZERO_NUMBER, cardsToRender.length + NUM_CARDS_TO_ADD));
    if (cardsToRender.length >= tutorsData.length - NUM_CARDS_TO_ADD) {
      setIsShowButtonActive(false);
    }
  };

  useEffect(() => {
    setCardsToRender(tutorsData.slice(ZERO_NUMBER, NUM_CARDS_TO_RENDER));
      if (tutorsData.length <= NUM_CARDS_TO_RENDER) {
        setIsShowButtonActive(false);
      } else {
        setIsShowButtonActive(true);
      }
  }, [tutorsData, NUM_CARDS_TO_RENDER])

  return (
    <>
      <ul className="list-tutors">
        {
          cardsToRender.map(data => (
            <li className="list-tutors__item" key={data.id}>
              <CardTutor
                tutorData={data}
              />
            </li>
          ))
        }
      </ul>
      {
        isShowButtonActive && (
          <ShowMoreButton
            title="Загрузить ещё"
            onClick={handleShowMoreClick}
          />
        )
      }
    </>
  )
}

export default ListTutors
