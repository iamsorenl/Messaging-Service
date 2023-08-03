/*
 * Resources:
 * Use of timeout for deletion as suggested on discord by several students
 * in order to provide some delay when deleting before updating the list state
 * method used in all list deletions:
 * https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
 * use of filter to remove items with specific id from list
 * also used in deletion logic for other cards:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter/
 */
import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import {deleteMessage} from '../Repo/MessageRepo';
import {WorkspacesContext} from '../Model/ViewModel';

const MessageCard = ({message, navigation}) => {
  const {loginResponse, ownership, messages, setMessages} =
    React.useContext(WorkspacesContext);

  const formatTime = timeString => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedTime = new Date(timeString).toLocaleString(
      undefined,
      options,
    );
    const commaIndex = formattedTime.indexOf(
      ',',
      formattedTime.indexOf(',') + 1,
    );
    const modifiedFormattedTime =
      formattedTime.slice(0, commaIndex) +
      ' at' +
      formattedTime.slice(commaIndex + 1);
    return modifiedFormattedTime;
  };

  const handlePress = () => {
    navigation.navigate('Message', {
      title: message.name,
      content: message.content,
      postedTime: formatTime(message.posted),
    });
  };

  const handleDelete = () => {
    setTimeout(() => {
      setMessages(messages?.filter(msg => msg.id !== message?.id));
    }, 20);
    deleteMessage(loginResponse?.accessToken, message?.id);
  };

  const renderRightActions = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDelete}>
        <View style={Styles.deleteButtonContainer}>
          <Icon
            name="delete"
            size={24}
            color="white"
            accessibilityLabel="delete message"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const shouldSwipeToDelete = ownership || loginResponse?.id === message.member;
  return (
    <Swipeable
      renderRightActions={shouldSwipeToDelete ? renderRightActions : null}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={Styles.card}>
          <View style={Styles.subCardMessage}>
            <Text>{message.name}</Text>
            <Text>{message.content}</Text>
            <Text>{formatTime(message.posted)}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

export default MessageCard;
