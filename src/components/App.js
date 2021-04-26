import React, { useState } from 'react';
import Filter from './Filter';
import ListTutors from './ListTutors';
import FeedbackText from './FeedbackText';

import api from '../utils/api';

function App() {
  const LOADING_TEXT = 'Загрузка списка репетиторов...';
  const TEACHERS_NOT_FOUND_TEXT = 'По заданным параметрам ничего не найдено';

  const [teacherIds, setTeacherIds] = useState([]);

  const [hasTeachersIds, setHasTeachersIds] = useState(true);

  const [isLoadingTeachersIds, setIsLoadingTeachersIds] = useState(false);

  const getUrlFilterParamsStr = (paramsArr) => {
    const params = new URLSearchParams();
    paramsArr.forEach((param) => (
      params.set(param[0], param[1])
    ))
    return params.toString();
  };

  const handleSubmit = (data) => {
    setIsLoadingTeachersIds(true);
    setHasTeachersIds(true);
    setTeacherIds([]);
    const filterParamsArr = Object.keys(data).map(key => [key, data[key]]);
    const filterParams = getUrlFilterParamsStr(filterParamsArr)
    api.getTeacherIds(filterParams)
      .then((data) => {
        if (data.data.length >= 1) {
          setHasTeachersIds(true);
          setTeacherIds(data.data);
        } else {
          setHasTeachersIds(false);
          setTeacherIds(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingTeachersIds(false);
      })
  };

  return (
    <section>
      <Filter
        onSubmit={handleSubmit}
        isLoadingTeachersIds={isLoadingTeachersIds}
      />
      {
        isLoadingTeachersIds && (
          <FeedbackText  text={LOADING_TEXT}/>
        )
      }
      {
        hasTeachersIds ? (
          <ListTutors
            tutorsIds={teacherIds}
          />
        ) : (
          <FeedbackText text={TEACHERS_NOT_FOUND_TEXT}/>
        )
      }

    </section>
  );
}

export default App;
