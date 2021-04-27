import React, { useEffect, useReducer } from 'react';
import CardTutor from './CardTutor';
import FeedbackText from './FeedbackText';
import ShowMoreButton from './ShowMoreButton';

import api from '../utils/api';

const initialState = {
  tutorsData: [],
  tutorsPages: [],
  initialPage: 0,
  nextPage: 0,
  hasMorePages: false,
  isLoading: false,
  errorText: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_LIST':
      return {
        ...state,
        initialPage: 0,
        nextPage: 0,
        hasMorePages: false,
        tutorsPages: [],
        tutorsData: [],
        errorText: null,
      }
    case 'SET_TUTORS_PAGES':
      return {
        ...state,
        tutorsPages: action.payload,
      }
    case 'FETCH_DATA_SUCCES':
      if (!state.tutorsPages[state.nextPage + 1]) {
        return {
          ...state,
          hasMorePages: false,
          tutorsData: [...state.tutorsData, ...action.payload],
          errorText: null,
        }
      } else {
        return {
          ...state,
          hasMorePages: true,
          nextPage: state.nextPage + 1,
          tutorsData: [...state.tutorsData, ...action.payload],
          errorText: null,
        }
      }
    case 'FETCH_DATA_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'FETCH_DATA_FINALLY':
        return {
          ...state,
          isLoading: false,
        }
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        errorText: action.payload,
      }
    default:
      return {
        state
      }
  }
}

function ListTutors({
  tutorsPages,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const INITIAL_PAGE = 0;
  const LOADING_TEXT = 'Загрузка данных...';
  const LOADING_ERROR_TEXT = 'Произошла ошибка загрузки данных репетиторов:';

  const getUrlSearchParamsStr = (paramsArr) => {
    const params = new URLSearchParams();
    paramsArr.forEach((param, index) => {
      params.set(`Ids[${index}]`, param)
    })
    return params.toString();
  };

  const handleShowMoreClick = () => {
    dispatch({ type: 'FETCH_DATA_START' });
    api.getTeachersShortData(getUrlSearchParamsStr(state.tutorsPages[state.nextPage]))
      .then((data) => {
        dispatch({ type: 'FETCH_DATA_SUCCES', payload: data.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: `${LOADING_ERROR_TEXT} ${err.message}` });
      })
      .finally(() => {
        dispatch({ type: 'FETCH_DATA_FINALLY' });
      });
  }

  useEffect(() => {
    dispatch({ type: 'RESET_LIST' });
    dispatch({ type: 'SET_TUTORS_PAGES', payload: tutorsPages });
    dispatch({ type: 'FETCH_DATA_START' });
    api.getTeachersShortData(getUrlSearchParamsStr(tutorsPages[INITIAL_PAGE]))
      .then((data) => {
        dispatch({ type: 'FETCH_DATA_SUCCES', payload: data.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: `${LOADING_ERROR_TEXT} ${err.message}` });
      })
      .finally(() => {
        dispatch({ type: 'FETCH_DATA_FINALLY' });
      });
  }, [tutorsPages])

  return (
    <>
      <ul className="list-tutors">
        {
          state.tutorsData.map(data => (
            <li className="list-tutors__item" key={data.id}>
              <CardTutor
                tutorData={data}
              />
            </li>
          ))
        }
      </ul>
      {
        state.isLoading && (
          <FeedbackText  text={LOADING_TEXT}/>
        )
      }
      {
        state.errorText && (
          <FeedbackText text={state.errorText}/>
        )
      }
      {
        state.hasMorePages && !state.isLoading && (
          <ShowMoreButton
            title="Загрузить ещё"
            onClick={handleShowMoreClick}
            disabled={state.isLoadingData}
          />
        )
      }
    </>
  )
}

export default ListTutors;
