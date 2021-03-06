import { PropTypes } from 'react';

const metrics = {
  id: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    createdOn: PropTypes.string,
    lastUpdatedOn: PropTypes.string
  }),
  masterRecordSetId: PropTypes.string.isRequired,
  recordMatchContextId: PropTypes.string.isRequired,
  recordMatchSystemInterfaceId: PropTypes.string.isRequired,
  recordResourceType: PropTypes.string,
  metrics: PropTypes.shape({
    f1: PropTypes.number,
    precision: PropTypes.number,
    recall: PropTypes.number,
    MAP: PropTypes.number,
    matchCount: PropTypes.number
  })
};

const links = PropTypes.arrayOf(PropTypes.shape({
  score: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['best', 'worst'])
}));

const run = Object.assign({}, metrics, {
  note: PropTypes.string,
  links: links,
  status: PropTypes.oneOf(['responded', 'no-response'])
});

const metricsProps = PropTypes.shape(metrics);
const runProps = PropTypes.shape(run);

export {metricsProps, runProps, links};
