import React, { useState, useEffect } from 'react';
import SelectInput from './SelectInput';
import SubmitButton from './SubmitButton';

import api from '../utils/api';

import useFormValidation from '../hooks/useFormValidation';

function Filter({
  onSubmit,
}) {

  const [subjects, setSubjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [isLoadingInitData, setIsLoadingInitData] = useState(false);
  const [isLoadingDistrictsData, setIsLoadingDistrictsData] = useState(false);

  const {
    values,
    isValid,
    handleChange,
  } = useFormValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault(evt);
    onSubmit(values);
  };

  useEffect(() => {
    if (values.areaId) {
      setDistricts([]);
      setIsLoadingDistrictsData(true);
      api.getDistricts(values.areaId)
        .then((data) => {
          setDistricts(data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingDistrictsData(false);
        })
    }
  }, [values.areaId])

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
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <SelectInput
          title={isLoadingInitData ? "Загрузка списка" : "Укажите предмет"}
          optionsData={subjects}
          propertyName="name"
          name="subjectId"
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          title={isLoadingInitData ? "Загрузка списка" : "Укажите город"}
          optionsData={areas}
          propertyName="cityName"
          name="areaId"
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          title={isLoadingDistrictsData ? "Загрузка списка" : "Укажите район"}
          optionsData={districts}
          propertyName="name"
          name="districtId"
          onChange={handleChange}
          required={true}
        />
      </div>
      <SubmitButton
        title="Применить фильтр"
        disabled={!isValid || isLoadingInitData || isLoadingDistrictsData}
      />
    </form>
  )
}

export default Filter
