import _ from 'lodash';

export default function(context, matchRuns, recordSets, matchingSystems) {
  const runs = _.filter(_.values(matchRuns), {'recordMatchContextId': context.id});
  if (_.isEmpty(runs)) {
    return "-";
  }

  const firstRun = runs[0];
  switch (context.type) {
    case "benchmark":
      return _.find(matchingSystems, ['id', firstRun.recordMatchSystemInterfaceId]).name;
    case "challenge":
      return _.find(recordSets, ['id', firstRun.masterRecordSetId]).name;
  }
}
