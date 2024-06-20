import { Pressable, View, StyleSheet } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import CloseIos from '../../../assets/icons/closeIos';

export function CloseDrawer(navigation: DrawerNavigationHelpers) {
	return (
		<Pressable onPress={() => navigation.closeDrawer()}>
			<View style={{ ...styles.button }}>
				<CloseIos />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 20,
		top: 20,
	},
});
