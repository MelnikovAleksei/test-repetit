import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import LoadingText from './LoadingText';
import ListTutors from './ListTutors';

import api from '../utils/api';

function App() {

  const [subjects, setSubjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [teacherIds, setTeacherIds] = useState(null);
  const [teachersData, setTeachersData] = useState([]);

  const [isLoadingInitData, setIsLoadingInitData] = useState(false);
  const [isLoadingTeachersData, setIsLoadingTeachersData] = useState(false);
  const [isLoadingTeachersIds, setIsLoadingTeachersIds] = useState(false);

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

  const handleSubmit = (data) => {
    setIsLoadingTeachersIds(true);
    const filterParamsArr = Object.keys(data).map(key => [key, data[key]]);
    const filterParams = getUrlFilterParamsStr(filterParamsArr)
    api.getTeacherIds(filterParams)
      .then((data) => {
        setTeacherIds(data.data);
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
      setIsLoadingTeachersData(true);
      const params = getUrlSearchTeachersParamsStr(teacherIds);
      api.getTeachersShortData(params)
        .then((data) => {
          setTeachersData(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingTeachersData(false);
        });
    }
  }, [teacherIds])

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
        isLoadingTeachersData && (
          <LoadingText text="Загрузка..."/>
        )
      }
      <ListTutors
        tutorsData={teachersData}
      />
    </section>
  );
}

export default App;
