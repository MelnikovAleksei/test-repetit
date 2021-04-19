import React from 'react';
import CardTutor from './CardTutor';
import ShowMoreButton from './ShowMoreButton';

function ListTutors({
  tutorsData,
}) {

  const handleShowMoreClick = () => {
    console.log('ShowMoreButton click');
  };

  return (
    <>
      <ul className="list-tutors">
        {
          tutorsData.map(data => (
            <li className="list-tutors__item" key={data.id}>
              <CardTutor
                tutorData={data}
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
