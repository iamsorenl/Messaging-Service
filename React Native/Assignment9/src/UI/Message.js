import React from 'react';
import Styles from '../Styles';
import {View, Text} from 'react-native';

const Message = ({route}) => {
  const {content, postedTime} = route.params;

  return (
    <View>
      <Text style={Styles.messageText}>{content}</Text>
      <Text style={Styles.messageText}>{postedTime}</Text>
    </View>
  );
};

export default Message;
