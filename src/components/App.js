import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import LoadingText from './LoadingText';
import ListTutors from './ListTutors';

import api from '../utils/api';

function App() {

  const INIT_PAGE_NUMBER = 0;
  const NUM_CARDS_TO_RENDER = 10;

  const [subjects, setSubjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [teacherIds, setTeacherIds] = useState(null);
  const [teachersData, setTeachersData] = useState([]);

  const [curPage, setCurPage] = useState(0);

  const [hasMorePages, setHasMorePages] = useState(false);
  const [isLoadingInitData, setIsLoadingInitData] = useState(false);
  const [isLoadingInitTeachersPage, setIsLoadingInitTeachersPage] = useState(false);
  const [isLoadingTeachersIds, setIsLoadingTeachersIds] = useState(false);
  const [isLoadingTeachersData, setIsLoadingTeachersData] = useState(false);

  const getUrlFilterParamsStr = (paramsArr) => {
    const params = new URLSearchParams();
    paramsArr.forEach((param) => (
      params.set(param[0], param[1])
    ))
    return params.toString();
  };

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

  const handleSubmit = (data) => {
    setIsLoadingTeachersIds(true);
    const filterParamsArr = Object.keys(data).map(key => [key, data[key]]);
    const filterParams = getUrlFilterParamsStr(filterParamsArr)
    api.getTeacherIds(filterParams)
      .then((data) => {
        setTeacherIds(getSubArrayBySize(data.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingTeachersIds(false);
      })
  };

  useEffect(() => {
    if (teacherIds) {
      setHasMorePages(teacherIds.length > 1)
      setCurPage(INIT_PAGE_NUMBER);
      setIsLoadingInitTeachersPage(true);
      api.getTeachersShortData(getUrlSearchTeachersParamsStr(teacherIds[INIT_PAGE_NUMBER]))
        .then((data) => {
          setTeachersData(data.data);
          setCurPage((prevState) => prevState + 1);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingInitTeachersPage(false);
        });
    }
  }, [teacherIds])

  const handleShowMoreClick = () => {
    setIsLoadingTeachersData(true);
    api.getTeachersShortData(getUrlSearchTeachersParamsStr(teacherIds[curPage]))
      .then((data) => {
        setTeachersData(prevState => [...prevState, ...data.data]);
        setCurPage((prevState) => prevState + 1);
        if (teacherIds[curPage + 1] === undefined) {
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
    setIsLoadingInitData(true);
    api.getInitialData()
      .then((data) => {
        const [subjects, areas] = data;
        setSubjects(subjects.data);
        setAreas(areas.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingInitData(false);
      })
  }, [])

  return (
    <section>
      <Filter
        onSubmit={handleSubmit}
        areas={areas}
        subjects={subjects}
        isLoadingData={isLoadingInitData || isLoadingTeachersIds || isLoadingTeachersData}
      />
      {
        isLoadingInitTeachersPage && (
          <LoadingText text="Загрузка..."/>
        )
      }
      <ListTutors
        tutorsData={teachersData}
        handleShowMoreClick={handleShowMoreClick}
        hasMorePages={hasMorePages}
        isLoadingInitTeachersPage={isLoadingInitTeachersPage}
        isLoadingTeachersData={isLoadingTeachersData}
      />
    </section>
  );
}

export default App;
