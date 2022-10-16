async function fetchApi(url, method, jwt, body) {
  const fetchData = {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
  };

  if (jwt) {
    fetchData.headers.Authorization = `Bearer ${jwt}`;
  }

  if (body) {
    fetchData.body = JSON.stringify(body);
  }

  return await fetch(url, fetchData);
}

export default fetchApi;
