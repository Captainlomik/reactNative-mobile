import { Redirect, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { authAtom } from "../entities/auth/model/auth.state";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Colors, Fonts } from "../../shared/tokens";
import { Text } from "react-native-svg";
import { MenuButton } from "../../features/layout/ui/MenuButton";

export default function AppLayout() {
    const { access_token } = useAtomValue(authAtom);
    if (!access_token) {
        return <Redirect href='/login' />
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: Colors.blacklight,
                    shadowColor: Colors.blacklight,
                    shadowOpacity: 0,
                },
                sceneContainerStyle: {
                    backgroundColor: Colors.black
                },
                headerLeft: () => {
                    return <MenuButton navigation={navigation} />
                },
                headerTitleStyle: {
                    color: Colors.white,
                    fontFamily: Fonts.regular,
                    fontSize: Fonts.f20,
                },
                headerTitleAlign: 'center'
            })}>
                <Drawer.Screen name="index" options={{
                    title: "Мои курсы",
                }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}