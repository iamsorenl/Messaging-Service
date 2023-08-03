export const getMessages = async (accessToken, id) => {
  const url = 'https://cse118.com/api/v2/channel/' + `${id}/message`;
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

export const postMessage = async (accessToken, id, content) => {
  const url = 'https://cse118.com/api/v2/channel/' + `${id}/message`;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  const contentBody = JSON.stringify({content});
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: contentBody,
  });
  const responseData = await response.json();
  return responseData;
};

export const deleteMessage = async (accessToken, id) => {
  const url = 'https://cse118.com/api/v2/message/' + id;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  await fetch(url, {
    method: 'DELETE',
    headers: headers,
  });
};
