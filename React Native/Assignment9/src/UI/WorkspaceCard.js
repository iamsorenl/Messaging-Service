import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteWorkspace} from '../Repo/WorkspaceRepo';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';

const WorkspaceCard = ({workspaceItem, navigation}) => {
  const {
    setWorkspace,
    loginResponse,
    setOwnership,
    workspaces,
    setWorkspaces,
    workspace,
    setChannels,
  } = React.useContext(WorkspacesContext);

  const handlePress = () => {
    if (workspaceItem.owner === loginResponse?.id) {
      setOwnership(true);
    } else {
      setOwnership(false);
    }
    // if new workspace clear channels before navigating
    if (workspace && workspace.id && workspace.id !== workspaceItem.id) {
      setChannels([]);
    }
    setWorkspace(workspaceItem);
    navigation.navigate('Channels', {title: workspaceItem.name});
  };

  const handleDelete = () => {
    setTimeout(() => {
      setWorkspaces(workspaces?.filter(w => w.id !== workspaceItem.id));
    }, 20);
    deleteWorkspace(loginResponse?.accessToken, workspaceItem.id);
  };

  const renderRightActions = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDelete}>
        <View style={Styles.deleteButtonContainer}>
          <Icon
            name="delete"
            size={24}
            color="white"
            accessibilityLabel={`delete ${workspaceItem.name}`}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  if (
    workspaceItem &&
    loginResponse &&
    workspaceItem.owner === loginResponse.id
  ) {
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={Styles.card}>
            <View style={Styles.subCard}>
              <Icon name="account-star-outline" size={24} color="black" />
              <Text style={Styles.leftText}>{workspaceItem.name}</Text>
              <Text
                style={Styles.rightText}
                accessibilityLabel={`count for ${workspaceItem.name}`}>
                {workspaceItem.channels === 0 ? '' : workspaceItem.channels}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={Styles.card}>
          <View style={Styles.subCard}>
            <Icon name="account-outline" size={24} color="black" />
            <Text style={Styles.leftText}>{workspaceItem.name}</Text>
            <Text
              style={Styles.rightText}
              accessibilityLabel={`count for ${workspaceItem.name}`}>
              {workspaceItem.channels === 0 ? '' : workspaceItem.channels}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

export default WorkspaceCard;
