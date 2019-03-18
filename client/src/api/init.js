import * as fetch from 'isomorphic-fetch';
import baseUrl from '../config';

function checkStatus (res) {
  if (res.status < 200 || res.status >= 300) {
    const err = new Error();
    err.res = res;
    err.status = res.status;
    throw err;
  }
  return res;
}

export async function fetchSessions (offset, limit) {
  const res = await fetch(`http://${baseUrl}:8080/api/sessions`)
  console.log(res);
  checkStatus(res);
  const body = await res.json();
  console.log(body);
  return body;
}
