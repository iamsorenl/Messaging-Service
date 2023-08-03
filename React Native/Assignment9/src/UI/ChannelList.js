import React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import ChannelCard from '../UI/ChannelCard';

const ChannelList = ({navigation}) => {
  const {channels} = React.useContext(WorkspacesContext);

  return (
    <View style={Styles.list}>
      <FlatList
        accessibilityLabel="channels"
        initialNumToRender={14}
        data={channels}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChannelCard channelItem={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default ChannelList;
