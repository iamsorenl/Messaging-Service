export const getChannels = async (accessToken, id) => {
  const url = 'https://cse118.com/api/v2/workspace/' + `${id}/channel`;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
  });
  const responseData = await response.json();
  return responseData;
};

export const deleteChannel = async (accessToken, id) => {
  const url = 'https://cse118.com/api/v2/channel/' + id;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  await fetch(url, {
    method: 'DELETE',
    headers: headers,
  });
};

export const postChannel = async (accessToken, id, name) => {
  const url = 'https://cse118.com/api/v2/workspace/' + `${id}/channel`;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  const requestBody = JSON.stringify({name});
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: requestBody,
  });
  const responseData = await response.json();
  return responseData;
};
