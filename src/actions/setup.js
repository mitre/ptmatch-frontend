import fetch from 'isomorphic-fetch';
import {retrieve} from './index';

export const REQUEST_SETUPS = 'REQUEST_SETUPS';
export const RECEIVE_SETUPS = 'RECEIVE_SETUPS';
export const SELECT_SETUPS = 'SELECT_SETUPS';

function shouldFetchSetups(state) {
  const setups = state.setups;
  if (setups.length === 0 && ! setups.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function fetchSetupsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchSetups(getState())) {
      dispatch({type: REQUEST_SETUPS});
      return dispatch(retrieve(RECEIVE_SETUPS, '/Setup'));
    }
  };
}

export function createSetup(setup) {
  return (dispatch) => {
    fetch('/Setup', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(setup)
    });
    return dispatch(retrieve(RECEIVE_SETUP, '/Setup'));
  };
}

export function selectSetup(setup) {
  return (dispatch) => {
    return dispatch({type: SELECT_SETUP, setup: setup});
  };
}