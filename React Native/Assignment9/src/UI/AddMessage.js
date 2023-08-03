/*
 * Resources:
 * Dynamically appending items to flat list, method used in add workspaces/channels as well
 * https://stackoverflow.com/questions/61054425/add-items-to-flatlist-dynamically-in-react-native
 */

import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import Styles from '../Styles';
import {postMessage} from '../Repo/MessageRepo';
import {WorkspacesContext} from '../Model/ViewModel';
import {getMemberById} from '../Repo/MemberRepo';

const AddMessage = ({navigation}) => {
  const {loginResponse, channel, setMessages, messages} =
    React.useContext(WorkspacesContext);
  const [content, setContent] = useState('');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleOK = async () => {
    try {
      const response = await postMessage(
        loginResponse?.accessToken,
        channel?.id,
        content,
      );
      const newName = await getMemberById(
        loginResponse?.accessToken,
        response.member,
      );
      const messageWithNewName = {
        ...response,
        name: newName.name,
      };
      const newMessages = [...messages, messageWithNewName];
      setMessages(newMessages);
    } catch (error) {}
    navigation.goBack();
  };

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.textInput}
        value={content}
        onChangeText={setContent}
        placeholder="Message"
        accessibilityLabel="content"
      />
      <View style={Styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={handleCancel}
          accessibilityLabel="cancel"
        />
        <Button
          title="Add"
          onPress={handleOK}
          disabled={content.length < 4 || content.length > 280}
          accessibilityLabel="add"
        />
      </View>
    </View>
  );
};

export default AddMessage;
