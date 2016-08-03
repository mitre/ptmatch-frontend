import _ from 'lodash';

export default function(context, matchRuns, recordSets, matchingSystems) {
  const runs = _.filter(_.values(matchRuns), {'recordMatchContextId': context.id});
  if (_.isEmpty(runs)) {
    return "-";
  }

  const firstRun = runs[0];
  switch (context.type) {
    case "benchmark":
      return matchingSystems[firstRun.recordMatchSystemInterfaceId].name;
    case "challenge":
      return recordSets[firstRun.masterRecordSetId].name;
  }
}
