import React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import MemberCard from '../UI/MemberCard';

const AddMembers = () => {
  const {members} = React.useContext(WorkspacesContext);

  return (
    <View style={Styles.list}>
      <FlatList
        accessibilityLabel="members"
        initialNumToRender={20}
        data={members}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MemberCard memberItem={item} />}
      />
    </View>
  );
};

export default AddMembers;
