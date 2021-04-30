import React, { useEffect, useReducer } from 'react';
import Filter from './Filter';
import ListTutors from './ListTutors';
import FeedbackText from './FeedbackText';

import api from '../utils/api';

import { getSubArrayBySize } from '../utils/helpers/getSubArrayBySize';

import { ThemeProvider} from "styled-components";
import * as theme  from '../config/theme';

const NUM_CARDS_TO_RENDER = 10;

const initialState = {
  data: [],
  isLoading: false,
  errorText: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCES':
      return {
        ...state,
        data: getSubArrayBySize(action.payload, NUM_CARDS_TO_RENDER),
        errorText: null,
        isLoading: false,
      }
    case 'FETCH_DATA_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        errorText: action.payload,
        isLoading: false,
      }
    default:
      return {
        state
      }
  }
}

function App() {
  const LOADING_TEXT = 'Загрузка списка репетиторов...';
  const TEACHERS_NOT_FOUND_TEXT = 'По заданным параметрам ничего не найдено';
  const LOADING_ERROR_TEXT = 'Произошла ошибка при загрузке списка репетиторов:';

  const [state, dispatch] = useReducer(reducer, initialState);

  const getUrlFilterParamsStr = (paramsArr) => {
    const params = new URLSearchParams();
    paramsArr.forEach((param) => (
      params.set(param[0], param[1])
    ))
    return params.toString();
  };

  const handleSubmit = (data) => {
    dispatch({ type: 'FETCH_DATA_START' });
    const filterParamsArr = Object.keys(data).map(key => [key, data[key]]);
    const filterParams = getUrlFilterParamsStr(filterParamsArr)
    api.getTeacherIds(filterParams)
      .then((data) => {
        dispatch({ type: 'FETCH_DATA_SUCCES', payload: data.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: `${LOADING_ERROR_TEXT} ${err.message}` });
      })
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA_START' });
    api.getInitialTeachersIds()
      .then((data) => {
        dispatch({ type: 'FETCH_DATA_SUCCES', payload: data.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: `${LOADING_ERROR_TEXT} ${err.message}` });
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <section>
        <Filter
          onSubmit={handleSubmit}
        />
        {
          state.isLoading && (
            <FeedbackText text={LOADING_TEXT}/>
          )
        }
        {
          state.errorText && (
            <FeedbackText text={state.errorText} />
          )
        }
        {
          state.data.length ? (
            <ListTutors tutorsPages={state.data}/>
          ) : (
            !state.isLoading && ( <FeedbackText text={TEACHERS_NOT_FOUND_TEXT}/> )
          )
        }
      </section>
    </ThemeProvider>

  );
}

export default App;
