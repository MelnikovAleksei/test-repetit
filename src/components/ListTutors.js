import React, { useEffect, useReducer } from 'react';
import CardTutor from './CardTutor';
import FeedbackText from './FeedbackText';
import ShowMoreButton from './ShowMoreButton';

import api from '../utils/api';

const initialState = {
  tutorsData: [],
  tutorsPages: [],
  nextPage: 0,
  hasMorePages: false,
  isLoadingData: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET_LIST':
      return {
        ...state,
        nextPage: 0,
        hasMorePages: false,
        tutorsData: []
      }
    case 'SET_TUTORS_DATA':
      if (!state.tutorsPages[state.nextPage + 1]) {
        return {
          ...state,
          hasMorePages: false,
          tutorsData: [...state.tutorsData, ...action.payload]
        }
      } else {
        return {
          ...state,
          hasMorePages: true,
          nextPage: state.nextPage + 1,
          tutorsData: [...state.tutorsData, ...action.payload]
        }
      }
    case 'SET_IS_LOADING_DATA':
      return {
        ...state,
        isLoadingData: action.payload,
      }
    case 'INCREMENT_PAGE':
      return {
        ...state,
        nextPage: state.nextPage + 1,
      }
    case 'SET_TUTORS_PAGES':
      return {
        ...state,
        tutorsPages: action.payload,
      }
    default:
      return state;
  }
}

function ListTutors({
  tutorsIds,
}) {

  const [state, dispatch] = useReducer(reducer, initialState);

  const LOADING_TEXT = 'Загрузка данных...';

  const NUM_CARDS_TO_RENDER = 10;

  const getUrlSearchParamsStr = (paramsArr) => {
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
    dispatch({ type: 'SET_IS_LOADING_DATA', payload: true });
    api.getTeachersShortData(getUrlSearchParamsStr(state.tutorsPages[state.nextPage]))
      .then((data) => {
        dispatch({ type: 'SET_TUTORS_DATA', payload: data.data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: 'SET_IS_LOADING_DATA', payload: false });
      });
  }

  useEffect(() => {
    if (state.tutorsPages.length > 0) {
      dispatch({ type: 'SET_IS_LOADING_DATA', payload: true });
      api.getTeachersShortData(getUrlSearchParamsStr(state.tutorsPages[state.nextPage]))
        .then((data) => {
          dispatch({ type: 'SET_TUTORS_DATA', payload: data.data });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch({ type: 'SET_IS_LOADING_DATA', payload: false });
        });
    }
  }, [state.tutorsPages])

  useEffect(() => {
    dispatch({ type: 'RESET_LIST' });
    if (tutorsIds.length >= 1) {
      dispatch({
        type: 'SET_TUTORS_PAGES',
        payload: getSubArrayBySize(tutorsIds)
      });
    } else {
      dispatch({
        type: 'SET_TUTORS_DATA',
        payload: []
      });
      dispatch({
        type: 'NO_MORE_PAGES'
      })
    }
  }, [tutorsIds])

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
        state.isLoadingData && (
          <FeedbackText  text={LOADING_TEXT}/>
        )
      }
      {
        state.hasMorePages && !state.isLoadingData && (
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
