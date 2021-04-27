import React, { useEffect, useReducer } from 'react';
import SelectInput from './SelectInput';
import SubmitButton from './SubmitButton';
import FeedbackText from './FeedbackText';

import api from '../utils/api';

import useFormValidation from '../hooks/useFormValidation';

const initialState = {
  isLoadingInitData: false,
  isLoadingDistrictsData: false,
  subjects: [],
  areas: [],
  districts: [],
  initDataFetchError: null,
  districtsDataFetchError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT_DATA_START':
      return {
        ...state,
        isLoadingInitData: true,
      }
    case 'FETCH_INIT_DATA_SUCCES':
      const { subjects, areas } = action.payload;
      return {
        ...state,
        subjects: subjects.data,
        areas: areas.data,
        initDataFetchError: null,
        isLoadingInitData: false,
      }
    case 'FETCH_INIT_DATA_ERROR':
      return {
        ...state,
        initDataFetchError: action.payload,
      }
    case 'FETCH_DISTRICTS_DATA_START':
      return {
        ...state,
        isLoadingDistrictsData: true,
      }
    case 'FETCH_DISTRICTS_DATA_SUCCES':
        return {
          ...state,
          isLoadingDistrictsData: false,
          districts: action.payload,
          districtsDataFetchError: null,
        }
    case 'FETCH_DISTRICTS_DATA_ERROR':
      return {
        ...state,
        districtsDataFetchError: action.payload,
      }
    default:
      return {
        state
      }
  }
}

function Filter({
  onSubmit,
}) {
  const FETCH_INIT_DATA_ERROR_TEXT = 'Ошибка при загрузке данных предметов и городов:';
  const FETCH_DISTRICTS_DATA_ERROR_TEXT = 'Ошибка при загрузке данных районов:';

  const [state, dispatch] = useReducer(reducer, initialState);

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
      dispatch({ type: 'FETCH_DISTRICTS_DATA_START' });
      api.getDistricts(values.areaId)
        .then((data) => {
          dispatch({ type: 'FETCH_DISTRICTS_DATA_SUCCES', payload: data.data });
        })
        .catch((err) => {
          dispatch({
            type: 'FETCH_DISTRICTS_DATA_ERROR',
            payload: `${FETCH_DISTRICTS_DATA_ERROR_TEXT} ${err.message}`
          });
        })
    }
  }, [values.areaId])

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT_DATA_START' });
    api.getInitialData()
      .then((data) => {
        const [subjects, areas] = data;
        dispatch({ type: 'FETCH_INIT_DATA_SUCCES', payload: { subjects, areas } });
      })
      .catch((err) => {
        dispatch({
          type: 'FETCH_INIT_DATA_ERROR',
          payload: `${FETCH_INIT_DATA_ERROR_TEXT} ${err.message}`
        });
      })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__container">
        <SelectInput
          title={state.isLoadingInitData ? "Загрузка списка" : "Укажите предмет"}
          optionsData={state.subjects}
          propertyName="name"
          name="subjectId"
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          title={state.isLoadingInitData ? "Загрузка списка" : "Укажите город"}
          optionsData={state.areas}
          propertyName="cityName"
          name="areaId"
          onChange={handleChange}
          required={true}
        />
        <SelectInput
          title={state.isLoadingDistrictsData ? "Загрузка списка" : "Укажите район"}
          optionsData={state.districts}
          propertyName="name"
          name="districtId"
          onChange={handleChange}
          required={true}
        />
      </div>
      <SubmitButton
        title="Применить фильтр"
        disabled={!isValid || state.isLoadingInitData || state.isLoadingDistrictsData}
      />
      {
        state.initDataFetchError && (
          <FeedbackText text={state.initDataFetchError}/>
        )
      }
      {
        state.districtsDataFetchError && (
          <FeedbackText text={state.districtsDataFetchError}/>
        )
      }
    </form>
  )
}

export default Filter
