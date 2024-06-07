import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Input } from './shared/input';
import { Button } from './shared/button';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Gaps } from './shared/tokens';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>School </Text>
        <Image style={styles.logo}
        source={require('./assets/logo.png')}
        resizeMode='contain' />
        <View style={styles.form}>
          <Input placeholder='Email'/>
          <Input isPassword placeholder='Пароль'/>
          <Button text='Войти'/>
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
  logo:{

  }
});
