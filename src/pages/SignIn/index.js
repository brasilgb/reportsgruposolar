import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator, StatusBar, Alert } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText } from './styles';

export default function SignIn() {

  const [code, setCode] = useState(null);
  const [password, setPassword] = useState(null);
  const {
    signIn,
    validateUser,
    loadingAuth
  } = useContext(AuthContext);

  const validar = () => {
    let error = false;
    if (code == null || password == null) {
      Alert.alert('Dados Necessários', 'Por favor preencha os dados de login!');
      error = true;
    }
    return !error;
  }

  async function handleLogin() {
    if (validar()) {
      const resp = await validateUser({ alternative: code });
      signIn({ code: resp.userCode, password: password, name: resp.userName });
    }
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#009DE0" />
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Logo source={require('../../../assets/images/logo-grupo.png')} />

        <AreaInput>
          <Icon name="ios-keypad-sharp" size={20} color="#666" />
          <Input
            placeholder="Login"
            autoCorrect={false}
            autoCapitalize="none"
            value={code}
            onChangeText={(text) => setCode(text)}
          />
        </AreaInput>

        <AreaInput>
          <Icon name="ios-key-sharp" size={18} color="#666" />
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin}>
          {
            loadingAuth ? (
              <ActivityIndicator size={22} color="#FFF" />
            ) : (
              <SubmitText>Acessar</SubmitText>
            )
          }
        </SubmitButton>

      </Container>
    </Background>
  );
}