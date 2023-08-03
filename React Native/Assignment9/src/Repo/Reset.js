export const reset = async accessToken => {
  const url = 'https://cse118.com/api/v2/reset';
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  await fetch(url, {
    method: 'PUT',
    headers: headers,
  });
};
