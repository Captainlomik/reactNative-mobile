import { Redirect } from 'expo-router';
import { useAtomValue } from 'jotai';
import { authAtom } from '../entities/auth/model/auth.state';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Colors, Fonts } from '../../shared/tokens';
import { MenuButton } from '../../features/layout/ui/MenuButton';
import { CustomDrawer } from '../../widget/layout/ui/CustomDrawer';

export default function AppLayout() {
	const { access_token } = useAtomValue(authAtom);
	if (!access_token) {
		return <Redirect href="/login" />;
	}

	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				drawerContent={(props) => <CustomDrawer {...props} />}
				screenOptions={({ navigation }) => ({
					headerStyle: {
						backgroundColor: Colors.blacklight,
						shadowColor: Colors.blacklight,
						shadowOpacity: 0,
					},
					sceneContainerStyle: {
						backgroundColor: Colors.black,
					},
					headerLeft: () => {
						return <MenuButton navigation={navigation} />;
					},
					headerTitleStyle: {
						color: Colors.white,
						fontFamily: Fonts.regular,
						fontSize: Fonts.f20,
					},
					headerTitleAlign: 'center',
				})}
			>
				<Drawer.Screen
					name="index"
					options={{
						title: 'Мои курсы',
					}}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						title: 'Профиль',
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
