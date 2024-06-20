// /restore
import { View, Text } from 'react-native';
import { Colors } from '../shared/tokens';
import { CustomLink } from '../shared/CustomLink';

export default function Restore() {
	return (
		<View>
			<Text style={{ color: Colors.white }}>Восставновление пароля пока не доступно</Text>
			<CustomLink href={'/'} text={'Обратно'}></CustomLink>
		</View>
	);
}
