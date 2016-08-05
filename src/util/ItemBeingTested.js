import _ from 'lodash';

export default function(context, matchRuns, recordSets, matchingSystems) {
  const runs = _.filter(_.values(matchRuns), {'recordMatchContextId': context.id});
  if (_.isEmpty(runs)) {
    return "-";
  }

  const firstRun = runs[0];
  let name = '-';
  switch (context.type) {
    case "benchmark":
      const matchingSystem = _.find(matchingSystems, ['id', firstRun.recordMatchSystemInterfaceId]);
      if (matchingSystem) {
        name = matchingSystem.name;
      }
      break;
    case "challenge":
      const recordSet = _.find(recordSets, ['id', firstRun.masterRecordSetId]);
      if (recordSet) {
        name = recordSet.name;
      }
  }
  return name;
}
