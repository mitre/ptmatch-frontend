import { retrieve } from './index';
import _ from 'lodash';

import {
  REQUEST_PATIENTS
} from './types';

export function fetchPatients(patientIds) {
  const joinedIds = _.join(patientIds, ',');
  const url = `/Patient?_id=${joinedIds}`;
  return {type: REQUEST_PATIENTS, payload: retrieve(url)};
}
