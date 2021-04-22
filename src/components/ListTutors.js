import React from 'react';
import CardTutor from './CardTutor';
import LoadingText from './LoadingText';
import ShowMoreButton from './ShowMoreButton';

function ListTutors({
  tutorsData,
  handleShowMoreClick,
  hasMorePages,
  isLoadingTeachersData,
  isLoadingInitTeachersPage,
}) {

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
      {
        isLoadingTeachersData && (
          <LoadingText  text="Загрузка..."/>
        )
      }
      {
        hasMorePages && (
          <ShowMoreButton
            title="Загрузить ещё"
            onClick={handleShowMoreClick}
            disabled={isLoadingInitTeachersPage || isLoadingTeachersData}
          />
        )
      }
    </>
  )
}

export default ListTutors
