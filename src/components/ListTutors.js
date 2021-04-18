import React from 'react';
import CardTutor from './CardTutor';
import ShowMoreButton from './ShowMoreButton';

function ListTutors({
  tutorsIds,
}) {

  const handleShowMoreClick = () => {
    console.log('ShowMoreButton click');
  };

  return (
    <>
      <ul className="list-tutors">
        {
          tutorsIds.map(tutorId => (
            <li className="list-tutors__item" key={tutorId}>
              <CardTutor
                tutorId={tutorId}
              />
            </li>
          ))
        }
      </ul>
      <ShowMoreButton
        title="Загрузить ещё"
        onClick={handleShowMoreClick}
      />
    </>
  )
}

export default ListTutors
