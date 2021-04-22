import React, { useState, useEffect } from 'react';
import SelectInput from './SelectInput';
import SubmitButton from './SubmitButton';

import api from '../utils/api';

import useFormValidation from '../hooks/useFormValidation';

function Filter({
  onSubmit,
  subjects,
  areas,
  isLoadingData,
}) {

  const [districtsData, setDistrictsData] = useState([]);
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
      setDistrictsData([]);
      setIsLoadingDistrictsData(true);
      api.getDistricts(values.areaId)
        .then((data) => {
          if (data.status === 200) {
            setDistrictsData(data.data);
            setIsLoadingDistrictsData(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [values.areaId])

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <SelectInput
          title={isLoadingData ? "Загрузка списка" : "Укажите предмет"}
          optionsData={subjects}
          propertyName="name"
          name="subjectId"
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          title={isLoadingData ? "Загрузка списка" : "Укажите город"}
          optionsData={areas}
          propertyName="cityName"
          name="areaId"
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          title={isLoadingDistrictsData ? "Загрузка списка" : "Укажите район"}
          optionsData={districtsData}
          propertyName="name"
          name="districtId"
          onChange={handleChange}
          required={true}
        />
      </div>
      <SubmitButton
        title="Применить фильтр"
        disabled={!isValid || isLoadingData || isLoadingDistrictsData}
      />
    </form>
  )
}

export default Filter
