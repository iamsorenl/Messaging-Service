import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import Styles from '../Styles';
import {postChannel} from '../Repo/ChannelRepo';
import {WorkspacesContext} from '../Model/ViewModel';

const AddChannel = ({navigation}) => {
  const {loginResponse, workspace, channels, setChannels} =
    React.useContext(WorkspacesContext);
  const [name, setName] = useState('');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleOK = async () => {
    try {
      let response = await postChannel(
        loginResponse?.accessToken,
        workspace?.id,
        name,
      );
      const newChannels = [...channels, response];
      setChannels(newChannels);
    } catch (error) {}
    navigation.goBack();
  };

  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        accessibilityLabel="name"
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
          disabled={name.length < 4 || name.length > 32}
          accessibilityLabel="add"
        />
      </View>
    </View>
  );
};

export default AddChannel;
