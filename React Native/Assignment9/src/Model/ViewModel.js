/*
 * Resources
 * adding the attribute of name to each message in the channel:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * filtering out members that were already added to the workspace to create a list of members
 * that can still be added:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 */

import React, {createContext, useState, useEffect} from 'react';
import {login} from '../Repo/Login.js';
import {LoginResponse} from '../Data/LoginResponse';
import {getWorkspaces} from '../Repo/WorkspaceRepo';
import {getChannels} from '../Repo/ChannelRepo';
import {getMessages} from '../Repo/MessageRepo';
import {
  getMemberById,
  getMembersByWorkspace,
  getAllMembers,
} from '../Repo/MemberRepo';

export const WorkspacesContext = createContext();

const ViewModel = props => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [ownership, setOwnership] = useState(false);
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);

  useEffect(() => {
    const performLogin = async () => {
      try {
        const response = await login(loginCredentials);
        setLoginResponse(
          new LoginResponse(response.id, response.name, response.accessToken),
        );
      } catch (error) {}
    };
    if (loginCredentials) {
      performLogin();
    }
  }, [loginCredentials]);

  const setLoginCredentialsAndNavigate = async credentials => {
    setLoginCredentials(credentials);
  };

  // fetch workspaces when loginResponse changes
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        if (loginResponse && loginResponse.accessToken) {
          const response = await getWorkspaces(loginResponse.accessToken);
          setWorkspaces(response);
        }
      } catch (error) {}
    };
    fetchWorkspaces();
  }, [loginResponse]);

  // fetch workspaces when channels changes
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await getWorkspaces(loginResponse.accessToken);
        setWorkspaces(response);
      } catch (error) {}
    };
    if (loginResponse && loginResponse.accessToken) {
      fetchWorkspaces();
    }
  }, [channels, loginResponse]);

  // fetch channels on change in workspace
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await getChannels(
          loginResponse.accessToken,
          workspace.id,
        );
        setChannels(response);
      } catch (error) {}
    };
    if (
      workspace &&
      workspace.id &&
      loginResponse &&
      loginResponse.accessToken
    ) {
      fetchChannels();
    }
  }, [workspace, loginResponse]);

  // fetch messages when there is a change in channel
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages(
          loginResponse?.accessToken,
          channel.id,
        );
        // traverse response and add the attribute 'name' to the response with getMemberById
        const messagesWithNames = await Promise.all(
          response.map(async messagE => {
            const member = await getMemberById(
              loginResponse.accessToken,
              messagE.member,
            );
            return {...messagE, name: member.name};
          }),
        );
        setMessages(messagesWithNames);
      } catch (error) {}
    };
    if (channel && channel.id && loginResponse && loginResponse.accessToken) {
      fetchMessages();
    }
  }, [channel, loginResponse]);

  // fetch channels when messages changes
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await getChannels(
          loginResponse.accessToken,
          workspace.id,
        );
        setChannels(response);
      } catch (error) {}
    };
    if (
      workspace &&
      workspace.id &&
      loginResponse &&
      loginResponse.accessToken
    ) {
      fetchChannels();
    }
  }, [messages, loginResponse, workspace]);

  // update all members when workspace updates
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getMembersByWorkspace(
          loginResponse.accessToken,
          workspace.id,
        );
        setMembers(response);
      } catch (error) {}
    };
    if (
      workspace &&
      workspace.id &&
      loginResponse &&
      loginResponse.accessToken
    ) {
      fetchMembers();
    }
  }, [workspace, loginResponse]);

  // update nonMembers when members updates
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getAllMembers(loginResponse.accessToken);
        const uninvitedMembers = response.filter(
          m => !members.some(member => member.id === m.id),
        );
        setNonMembers(uninvitedMembers);
      } catch (error) {}
    };
    if (loginResponse && loginResponse.accessToken && members) {
      fetchMembers();
    }
  }, [members, loginResponse]);

  return (
    <WorkspacesContext.Provider
      value={{
        setLoginCredentials: setLoginCredentialsAndNavigate,
        workspaces,
        setWorkspaces,
        workspace,
        setWorkspace,
        loginResponse,
        setLoginResponse,
        channels,
        setChannels,
        channel,
        setChannel,
        messages,
        setMessages,
        message,
        setMessage,
        ownership,
        setOwnership,
        members,
        setMembers,
        nonMembers,
      }}>
      {props.children}
    </WorkspacesContext.Provider>
  );
};

export default ViewModel;
