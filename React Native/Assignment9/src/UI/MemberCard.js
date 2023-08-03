import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import {deleteMember, getMembersByWorkspace} from '../Repo/MemberRepo';

const MemberCard = ({memberItem}) => {
  const {members, setMembers, loginResponse, workspace} =
    React.useContext(WorkspacesContext);

  const handleDelete = async () => {
    setTimeout(() => {
      setMembers(members?.filter(m => m.id !== memberItem.id));
    }, 20);
    try {
      await deleteMember(
        loginResponse?.accessToken,
        workspace?.id,
        memberItem.id,
      );
      const m = await getMembersByWorkspace(
        loginResponse?.accessToken,
        workspace?.id,
      );
      setMembers(m);
    } catch (error) {}
  };

  const renderRightActions = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDelete}>
        <View style={Styles.deleteButtonContainer}>
          <Icon
            name="delete"
            size={24}
            color="white"
            accessibilityLabel={`delete ${memberItem.name}`}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={Styles.card}>
        <View style={Styles.subCard}>
          <Text style={Styles.leftText}>{memberItem.name}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default MemberCard;
