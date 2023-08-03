/*
 * Resources:
 * Header Right and Left Documentation used to put appropriate buttons in header:
 * https://reactnavigation.org/docs/header-buttons/
 * Disabling of Animations:
 * https://reactnavigation.org/docs/stack-navigator/
 * research on disabling of animations suggested by students on discord
 */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './Styles';
import {WorkspacesContext} from './Model/ViewModel';
import Login from './UI/Login';
import WorkspaceList from './UI/WorkspaceList';
import ChannelList from './UI/ChannelList';
import MessageList from './UI/MessageList';
import AddMessage from './UI/AddMessage';
import AddChannel from './UI/AddChannel';
import AddWorkspace from './UI/AddWorkspace';
import AddMembers from './UI/AddMembers';
import SelectMembers from './UI/SelectMembers';
import Message from './UI/Message';
import {reset} from './Repo/Reset';
import {getWorkspaces} from './Repo/WorkspaceRepo';

const Stack = createStackNavigator();

const Main = () => {
  const {loginResponse, setLoginResponse, ownership, setWorkspaces} =
    useContext(WorkspacesContext);

  const handleLogout = () => {
    setLoginResponse(null);
  };

  const renderHeaderLeft = () => (
    <TouchableOpacity onPress={handleLogout} style={Styles.logoutButton}>
      <Icon name="logout" size={24} color="black" accessibilityLabel="logout" />
    </TouchableOpacity>
  );

  const renderHeaderRightMessages = ({navigation}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AddMessage')}
      style={Styles.plusButton}>
      <Icon
        name="plus"
        size={24}
        color="black"
        accessibilityLabel="add message"
      />
    </TouchableOpacity>
  );

  const renderHeaderRightMembers = ({navigation}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('SelectMembers')}
      style={Styles.plusButton}>
      <Icon
        name="account-multiple-plus-outline"
        size={24}
        color="black"
        accessibilityLabel="add member"
      />
    </TouchableOpacity>
  );

  const renderHeaderRightWorkspaces = ({navigation}) => {
    const handleReset = async () => {
      try {
        await reset(loginResponse?.accessToken);
        const response = await getWorkspaces(loginResponse?.accessToken);
        setWorkspaces(response);
      } catch (error) {}
    };

    return (
      <View style={Styles.headerRightButtons}>
        {loginResponse && loginResponse.accessToken && (
          <TouchableOpacity onPress={handleReset} style={Styles.plusButton}>
            <Icon
              name="refresh"
              size={24}
              color="black"
              accessibilityLabel="reset"
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('AddWorkspace')}
          style={Styles.plusButton}>
          <Icon
            name="plus"
            size={24}
            color="black"
            accessibilityLabel="add workspace"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeaderRightChannels = ({navigation}) => (
    <View style={Styles.headerRightButtons}>
      {loginResponse && loginResponse.accessToken && (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddMembers')}
          style={Styles.plusButton}>
          <Icon
            name="account-plus-outline"
            size={24}
            color="black"
            accessibilityLabel="add members"
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddChannel')}
        style={Styles.plusButton}>
        <Icon
          name="plus"
          size={24}
          color="black"
          accessibilityLabel="add channel"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{animation: 'none', animatinoEnabled: false}}>
        {loginResponse ? (
          <>
            <Stack.Screen
              name="Workspaces"
              component={WorkspaceList}
              options={({navigation}) => ({
                animationEnabled: false,
                animation: 'none',
                title: 'Workspaces',
                headerLeft: renderHeaderLeft,
                headerRight: () => renderHeaderRightWorkspaces({navigation}),
              })}
            />
            <Stack.Screen
              name="Channels"
              component={ChannelList}
              options={({route, navigation}) => ({
                animationEnabled: false,
                animation: 'none',
                title: route.params.title,
                headerBackTitle: 'Workspaces',
                headerBackAccessibilityLabel: 'back to workspaces',
                headerRight: ownership
                  ? () => renderHeaderRightChannels({navigation})
                  : undefined,
              })}
            />
            <Stack.Screen
              name="Messages"
              component={MessageList}
              options={({route, navigation}) => ({
                animationEnabled: false,
                animation: 'none',
                title: route.params.title,
                headerBackTitle: 'Channels',
                headerBackAccessibilityLabel: 'back to channels',
                headerRight: () => renderHeaderRightMessages({navigation}),
              })}
            />
            <Stack.Screen
              name="Message"
              component={Message}
              options={({route}) => ({
                animationEnabled: false,
                animation: 'none',
                title: route.params.title,
                headerBackTitle: 'Channel',
                headerBackAccessibilityLabel: 'back to channel',
              })}
            />
            <Stack.Screen
              name="AddMessage"
              component={AddMessage}
              options={() => ({
                animationEnabled: false,
                animation: 'none',
                title: 'New Message',
                headerBackTitle: 'Channel',
                headerBackAccessibilityLabel: 'back to channel',
              })}
            />
            <Stack.Screen
              name="AddChannel"
              component={AddChannel}
              options={() => ({
                animationEnabled: false,
                animation: 'none',
                title: 'New Channel',
                headerBackTitle: 'Channels',
                headerBackAccessibilityLabel: 'back to channels',
              })}
            />
            <Stack.Screen
              name="AddWorkspace"
              component={AddWorkspace}
              options={() => ({
                animationEnabled: false,
                animation: 'none',
                title: 'New Workspace',
                headerBackTitle: 'Workspaces',
                headerBackAccessibilityLabel: 'back to workspaces',
              })}
            />
            <Stack.Screen
              name="AddMembers"
              component={AddMembers}
              options={({navigation}) => ({
                animationEnabled: false,
                animation: 'none',
                title: 'Members',
                headerBackTitle: 'Workspace',
                headerBackAccessibilityLabel: 'back to workspace',
                headerRight: () => renderHeaderRightMembers({navigation}),
              })}
            />
            <Stack.Screen
              name="SelectMembers"
              component={SelectMembers}
              options={() => ({
                animationEnabled: false,
                animation: 'none',
                title: 'Add Member',
                headerBackTitle: 'Members',
                headerBackAccessibilityLabel: 'back to members',
              })}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={() => ({
              animationEnabled: false,
              animation: 'none',
            })}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
