import React from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteChannel} from '../Repo/ChannelRepo';

import Styles from '../Styles';
import {WorkspacesContext} from '../Model/ViewModel';

const ChannelCard = ({channelItem, navigation}) => {
  const {
    setChannel,
    ownership,
    channels,
    channel,
    setChannels,
    loginResponse,
    setMessages,
  } = React.useContext(WorkspacesContext);

  const handlePress = () => {
    // if new channel clear messages before navigating
    if (channel?.id !== channelItem.id) {
      setMessages([]);
    }
    setChannel(channelItem);
    navigation.navigate('Messages', {title: channelItem.name});
  };

  const handleDelete = () => {
    setTimeout(() => {
      setChannels(channels?.filter(ch => ch.id !== channelItem.id));
    }, 20);
    deleteChannel(loginResponse?.accessToken, channelItem.id);
  };

  const renderRightActions = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDelete}>
        <View style={Styles.deleteButtonContainer}>
          <Icon
            name="delete"
            size={24}
            color="white"
            accessibilityLabel={`delete ${channelItem.name}`}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Swipeable renderRightActions={ownership ? renderRightActions : null}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={Styles.card}>
          <View style={Styles.subCard}>
            <Text style={Styles.leftText}>{channelItem.name}</Text>
            <Text
              style={Styles.rightText}
              accessibilityLabel={`count for ${channelItem.name}`}>
              {channelItem.messages === 0 ? '' : channelItem.messages}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

export default ChannelCard;
