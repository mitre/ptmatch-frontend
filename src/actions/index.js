import fetch from 'isomorphic-fetch';

export function retrieve(url, context=null) {
  return new Promise((resolve) =>
    fetch(url, {credentials: 'same-origin'})
      .then(req => req.json())
      .then(json => {
        if (context) {
          return resolve([json, context]);
        } else {
          return resolve(json);
        }
       }));
}
