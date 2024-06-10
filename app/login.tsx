import { StyleSheet, Text, View, Image, Alert, Dimensions, ToastAndroid } from 'react-native';
import { Input } from '../shared/input';
import { Button } from '../shared/button';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Gaps } from '../shared/tokens';
import { ErrorNotification } from '../shared/ErrorNotification/errorNotification';
import { useEffect, useState } from 'react';
import { CustomLink } from '../shared/CustomLink';
import { loginAtom } from './entities/auth/model/auth.state';
import { useAtom } from 'jotai';
import { router } from 'expo-router';


export default function Login() {
  const [localErorr, setLocalError] = useState<string | undefined>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [{ access_token, isLoading, error }, login] = useAtom(loginAtom)


  const submit = () => {
    if (!email) {
      setLocalError('Не введен email')
      return;
    }
    if (!password) {
      setLocalError('Не введен пароль');
      return;
    }
    login({ email, password })
  }


  useEffect(() => {
    if (localErorr) {
      setLocalError(localErorr)
    }
  }, [localErorr])

  useEffect(() => {
    if (access_token) {
      router.replace('/(app)')
    }
  }, [access_token])

  return (
    <View style={styles.container}>
      <ErrorNotification error={localErorr} />
      <View style={styles.content}>
        <Text>School </Text>
        <Image style={styles.logo}
          source={require('../assets/logo.png')}
          resizeMode='contain' />
        <View style={styles.form}>
          <Input placeholder='Email' onChangeText={setEmail} />
          <Input isPassword placeholder='Пароль' onChangeText={setPassword} />
          <Button text='Войти' onPress={submit} isloading={isLoading} />
        </View>
        <CustomLink href={'/restore'} text={'Восстановить пароль'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 55,
    backgroundColor: Colors.black,
  },
  content: {
    alignItems: 'center',
    gap: Gaps.g50,
  },
  form: {
    alignSelf: 'stretch',
    gap: Gaps.g16,
  },
  logo: {

  }
});
