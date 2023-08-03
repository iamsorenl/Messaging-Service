import React from 'react';
import {FlatList, View} from 'react-native';
import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';
import MessageCard from '../UI/MessageCard';

const MessageList = ({navigation}) => {
  const {messages} = React.useContext(WorkspacesContext);

  return (
    <View style={Styles.list}>
      <FlatList
        accessibilityLabel="messages"
        initialNumToRender={14}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MessageCard message={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default MessageList;
