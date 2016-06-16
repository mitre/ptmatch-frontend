import { PropTypes } from 'react';

const parameter = {
  name: PropTypes.string.isRequired,
  valueString: PropTypes.string.isRequired
};

const recordSetProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    createdOn: PropTypes.string,
    lastUpdatedOn: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  parameters: PropTypes.shape({
    parameter: PropTypes.arrayOf(PropTypes.shape(parameter))
  }),
  selected: PropTypes.bool
};

export default PropTypes.shape(recordSetProps);
