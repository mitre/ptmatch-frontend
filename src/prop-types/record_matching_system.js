import { PropTypes } from 'react';

const recordMatchingSystemProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    createdOn: PropTypes.string,
    lastUpdatedOn: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  destinationEndpoint: PropTypes.string,
  serverEndpoint: PropTypes.string,
  responseEndpoint: PropTypes.string,
  selected: PropTypes.bool
};

export default PropTypes.shape(recordMatchingSystemProps);
