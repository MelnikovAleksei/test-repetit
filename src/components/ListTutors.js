import React, { useState, useEffect } from 'react';
import CardTutor from './CardTutor';
import FeedbackText from './FeedbackText';
import ShowMoreButton from './ShowMoreButton';

import api from '../utils/api';

function ListTutors({
  tutorsIds,
}) {

  const LOADING_TEXT = 'Загрузка данных...';

  const INIT_PAGE_NUMBER = 0;
  const NUM_CARDS_TO_RENDER = 10;

  const [tutorsPages, setTutorsPages] = useState(null);
  const [tutorsData, setTutorsData] = useState([]);

  const [curPage, setCurPage] = useState(0);

  const [hasMorePages, setHasMorePages] = useState(false);

  const [isLoadingTeachersData, setIsLoadingTeachersData] = useState(false);

  const getUrlSearchTeachersParamsStr = (paramsArr) => {
    const params = new URLSearchParams();
    paramsArr.forEach((param, index) => {
      params.set(`Ids[${index}]`, param)
    })
    return params.toString();
  };

  const getSubArrayBySize = (array, size = NUM_CARDS_TO_RENDER) => {
    let result = [];
    for (let index = 0; index < Math.ceil(array.length / size); index++) {
      result[index] = array.slice((index * size), (index * size) + size);
    }
    return result;
  }

  const handleShowMoreClick = () => {
    setIsLoadingTeachersData(true);
    api.getTeachersShortData(getUrlSearchTeachersParamsStr(tutorsPages[curPage]))
      .then((data) => {
        setTutorsData(prevState => [...prevState, ...data.data]);
        setCurPage((prevState) => prevState + 1);
        if (tutorsPages[curPage + 1] === undefined) {
          setHasMorePages(false);
        } else {
          setHasMorePages(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingTeachersData(false);
      });
  }

  useEffect(() => {
    if (tutorsPages) {
      setHasMorePages(tutorsPages.length > 1)
      setCurPage(INIT_PAGE_NUMBER);
      setIsLoadingTeachersData(true);
      api.getTeachersShortData(getUrlSearchTeachersParamsStr(tutorsPages[INIT_PAGE_NUMBER]))
        .then((data) => {
          setTutorsData(data.data);
          setCurPage((prevState) => prevState + 1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingTeachersData(false);
        });
    }
  }, [tutorsPages])

  useEffect(() => {
    if (tutorsIds.length >= 1) {
      setTutorsPages(getSubArrayBySize(tutorsIds));
    } else {
      setTutorsData([]);
      setHasMorePages(false);
    }
  }, [tutorsIds])

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
          <FeedbackText  text={LOADING_TEXT}/>
        )
      }
      {
        hasMorePages && !isLoadingTeachersData && (
          <ShowMoreButton
            title="Загрузить ещё"
            onClick={handleShowMoreClick}
            disabled={isLoadingTeachersData}
          />
        )
      }
    </>
  )
}

export default ListTutors
