import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Alert, Dimensions, ToastAndroid } from 'react-native';
import { Input } from './shared/input';
import { Button } from './shared/button';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Gaps } from './shared/tokens';
import { ErrorNotification } from './shared/ErrorNotification/errorNotification';
import { useState } from 'react';

export default function App() {
  const [erorr, setError] = useState<string | undefined>()

  const alert = () => {
    // if (Platform.OS === 'android') {
    //   ToastAndroid.showWithGravity(
    //     'Heверный логин или пароль',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.CENTER
    //   )
    // }
    setError('Неверный логин и пароль')
    setTimeout(() => {
      setError(undefined)
    }, 4000)
  }

  return (
    <View style={styles.container}>
      <ErrorNotification error={erorr} />
      <View style={styles.content}>
        <Text>School </Text>
        <Image style={styles.logo}
          source={require('./assets/logo.png')}
          resizeMode='contain' />
        <View style={styles.form}>
          <Input placeholder='Email' />
          <Input isPassword placeholder='Пароль' />
          <Button text='Войти' onPress={alert} />
        </View>
        <Text> Восстановить пароль </Text>
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
