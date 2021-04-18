import React from 'react';
import SelectInput from './SelectInput';
import SubmitButton from './SubmitButton';

import {
  SUBJECTS_DATA,
  AREAS_DATA,
 } from '../utils/constants';

function Filter({
  onSubmit,
}) {

  const handleSubmit = (evt) => {
    evt.preventDefault(evt);
    onSubmit('Submit event');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <SelectInput
          title="Укажите предмет"
          optionsData={SUBJECTS_DATA}
          propertyName="name"
        />
        <SelectInput
          title="Укажите город"
          optionsData={AREAS_DATA}
          propertyName="cityName"
        />
      </div>
      <SubmitButton
        title="Применить фильтр"
      />
    </form>
  )
}

export default Filter
