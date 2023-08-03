import React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import SelectMemberCard from '../UI/SelectMemberCard';

const AddMembers = ({navigation}) => {
  const {nonMembers} = React.useContext(WorkspacesContext);
  return (
    <View style={Styles.list}>
      <FlatList
        accessibilityLabel="uninvited members"
        initialNumToRender={20}
        data={nonMembers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SelectMemberCard memberItem={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default AddMembers;
