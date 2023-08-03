import React, {useState, useContext} from 'react';
import {View, Image, TextInput, Button} from 'react-native';
import Styles from '../Styles';
import SlugLogo from '../../assets/UCSCSlugLogo.png';
import {LoginCredentials} from '../Data/LoginCredentials';
import {WorkspacesContext} from '../Model/ViewModel';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setLoginCredentials} = useContext(WorkspacesContext);

  const performLogin = async () => {
    setLoginCredentials(new LoginCredentials(email, password));
  };

  return (
    <View style={Styles.container}>
      <Image source={SlugLogo} style={Styles.logo} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={Styles.input}
        accessibilityLabel="email"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={Styles.input}
        accessibilityLabel="password"
      />
      <Button
        title="Login"
        onPress={performLogin}
        color="blue"
        accessibilityLabel="login"
      />
    </View>
  );
};

export default Login;
