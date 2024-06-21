/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, Dimensions,KeyboardAvoidingView,Platform} from 'react-native';
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
import { useScreenOrientation } from '../shared/hooks';
import { Orientation } from 'expo-screen-orientation';
import { validationEmail } from '../shared/validation';


export default function Login() {
	const [localErorr, setLocalError] = useState<string | undefined>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [{ access_token, isLoading}, login] = useAtom(loginAtom);
	const orientation = useScreenOrientation();

	const submit = () => {
		if (!email) {
			setLocalError('Не введен email');
			return;
		}
		if (validationEmail(email)) {
			setLocalError('Email не соответсвует формату email@mail.ru');
			return;
		}
		if (!password) {
			setLocalError('Не введен пароль');
			return;
		}
		if (password.length < 6) {
			setLocalError('Пароль не может быть менее 6 символов');
			return;
		}
		login({ email, password });
	};


	useEffect(() => {
		if (localErorr) {
			setLocalError(localErorr);
		}
	}, [localErorr]);

	useEffect(() => {
		if (access_token) {
			router.replace('/(app)');
		}
	}, [access_token]);

	return (
		<View style={styles.container}>
			<ErrorNotification error={localErorr} />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.content}
			>
				<Text>School </Text>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />
				<View style={styles.form}>
					<View
						style={{
							...styles.inputs,
							flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
						}}
					>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48,
							}}
							placeholder="Email"
							onChangeText={setEmail}
						/>
						<Input
							style={{
								width:
									orientation === Orientation.PORTRAIT_UP
										? 'auto'
										: Dimensions.get('window').width / 2 - 16 - 48,
							}}
							isPassword
							placeholder="Пароль"
							onChangeText={setPassword}
						/>
					</View>
					<Button text="Войти" onPress={submit} isloading={isLoading} />
				</View>
				<CustomLink href={'/restorej'} text={'Восстановить пароль'} />
			</KeyboardAvoidingView>
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
	inputs: {
		gap: Gaps.g16,
	},
	logo: {
		width: Platform.select({ ios: 220, android: 300 }),
	},
});
