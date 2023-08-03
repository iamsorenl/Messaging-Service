import React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import WorkspaceCard from '../UI/WorkspaceCard';

const WorkspaceList = ({navigation}) => {
  const {workspaces} = React.useContext(WorkspacesContext);
  return (
    <View style={Styles.list}>
      <FlatList
        accessibilityLabel="workspaces"
        initialNumToRender={14}
        data={workspaces}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <WorkspaceCard workspaceItem={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default WorkspaceList;
