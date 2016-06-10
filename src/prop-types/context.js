import { PropTypes } from 'react';

const contextProps = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    createdOn: PropTypes.string,
    lastUpdatedOn: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool
};

export default PropTypes.shape(contextProps);
