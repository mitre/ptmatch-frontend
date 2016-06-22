import { PropTypes } from 'react';

const patientProps = {
  id: PropTypes.string.isRequired,
  name: PropTypes.arrayOf(PropTypes.shape({
    family: PropTypes.arrayOf(PropTypes.string),
    given: PropTypes.arrayOf(PropTypes.string)
  })),
  gender: PropTypes.string,
  birthDate: PropTypes.string,
  address: PropTypes.arrayOf(PropTypes.shape({
    line: PropTypes.arrayOf(PropTypes.string),
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string
  }))
};

export default PropTypes.shape(patientProps);
