/*
 * Resources:
 * Use of 'find' to search for a member in the member list by id:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 */
export const getAllMembers = async accessToken => {
  const url = 'https://cse118.com/api/v2/member';
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

export const getMemberById = async (accessToken, id) => {
  const responseData = await getAllMembers(accessToken);
  const theMember = responseData.find(member => member.id === id);
  return theMember;
};

export const getMembersByWorkspace = async (accessToken, id) => {
  const url = 'https://cse118.com/api/v2/workspace/' + id + '/member';
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

export const postMember = async (accessToken, workspaceId, memberId) => {
  const url =
    'https://cse118.com/api/v2/workspace/' +
    workspaceId +
    '/member?mid=' +
    memberId;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  await fetch(url, {
    method: 'POST',
    headers: headers,
  });
};

export const deleteMember = async (accessToken, workspaceId, memberId) => {
  const url =
    'https://cse118.com/api/v2/workspace/' +
    workspaceId +
    '/member?mid=' +
    memberId;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  await fetch(url, {
    method: 'DELETE',
    headers: headers,
  });
};
