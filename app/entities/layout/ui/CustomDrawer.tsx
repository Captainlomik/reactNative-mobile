import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../../shared/tokens";
import { CustomLink } from "../../../../shared/CustomLink";
import { CloseDrawer } from "./closeDrawer";
import { useSetAtom } from "jotai";
import { logoutAtom } from "../../auth/model/auth.state";


export function CustomDrawer(props: DrawerContentComponentProps) {
    const logout = useSetAtom(logoutAtom)

    return <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
            <CloseDrawer {...props.navigation} />
            <Text></Text>
        </View>
        <View style={styles.footer}>
            <Image
                style={styles.logo}
                source={require('../../../../assets/logo.png')}
                resizeMode='contain' />
            <CustomLink text='Выход' onPress={() => logout()} href={'/login'} />
        </View>
    </DrawerContentScrollView>
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    content: {
        flex: 1
    },
    footer: {
        gap: 50,
        marginBottom: 40,
        alignItems: 'center',
    },
    logo: {
        width: 160,
    }
})