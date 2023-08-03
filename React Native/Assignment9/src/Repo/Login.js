export const login = async credentials => {
  const url = 'https://cse118.com/api/v2/login';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(credentials),
  });
  const responseData = await response.json();
  return responseData;
};
