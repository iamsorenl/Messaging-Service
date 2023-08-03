import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import {postMember, getMembersByWorkspace} from '../Repo/MemberRepo';

const SelectMemberCard = ({memberItem, navigation}) => {
  const {setMembers, loginResponse, workspace} =
    React.useContext(WorkspacesContext);

  const handleAdd = async () => {
    try {
      await postMember(
        loginResponse?.accessToken,
        workspace?.id,
        memberItem?.id,
      );
      const m = await getMembersByWorkspace(
        loginResponse?.accessToken,
        workspace?.id,
      );
      setMembers(m);
    } catch (error) {}
    navigation.goBack();
  };

  const renderRightActions = () => {
    return (
      <TouchableWithoutFeedback onPress={handleAdd}>
        <View style={Styles.addUserButtonContainer}>
          <Icon
            name="account-plus-outline"
            size={24}
            color="white"
            accessibilityLabel={`add ${memberItem.name}`}
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

export default SelectMemberCard;
