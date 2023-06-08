const useFetch = (endpoint) => {
  const defaultHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const customFetch = (
    url,
    method = 'GET',
    body = false,
    headers = defaultHeader
  ) => {
    const options = {
      method,
      headers,
    };
    let path;
    if (body) {
      const domain = 'https://token.emudeck.com';

      path = `${domain}/${url}`;
      const bodyData = {
        ...body,
      };

      options.body = JSON.stringify(bodyData);
    }
    return fetch(path, options)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err);
      });
  };
  const get = () => {
    return customFetch(endpoint);
  };
  const post = (body = false) => {
    if (!body) throw new Error('to make a post you must provide a body');

    return customFetch(endpoint, 'POST', body);
  };
  const put = (body = false) => {
    return customFetch(endpoint, 'PUT', body);
  };
  const del = () => {
    return customFetch(endpoint, 'DELETE');
  };
  return {
    get,
    post,
    put,
    del,
  };
};

export default useFetch;
