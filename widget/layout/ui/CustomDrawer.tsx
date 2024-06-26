import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../shared/tokens";
import { CustomLink } from "../../../shared/CustomLink";
import { CloseDrawer } from "../../../features/layout/ui/closeDrawer";
import { useAtom, useSetAtom } from "jotai";
import { logoutAtom } from "../../../app/entities/auth/model/auth.state";
import { loadProfileAtom } from "../../../app/entities/user/model/user.state";
import { useEffect } from "react";
import { UserMenu } from "../../../app/entities/user/ui/UserMenu";
import CoursesIcon from "../../../assets/menu/courses";
import ProfileIcon from "../../../assets/menu/profile";
import { MenuItem } from "../../../app/entities/layout/ui/MenuItem";

const MENU = [
    { text: 'Курсы', icon: <CoursesIcon />, path: 'index' },
    { text: 'Профиль', icon: <ProfileIcon />, path: 'profile' }
]

export function CustomDrawer(props: DrawerContentComponentProps) {
    const logout = useSetAtom(logoutAtom);
    const [profile, loadProfile] = useAtom(loadProfileAtom);

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
            <View style={styles.content}>
                <CloseDrawer {...props.navigation} />
                <UserMenu user={profile.profile} />
                {MENU.map(menu => (
                    <MenuItem key={menu.path} {...menu} drawer={props}></MenuItem>
                ))}
            </View>
            <View style={styles.footer}>
                <CustomLink text='Выход' onPress={() => logout()} href={'/login'} />
            </View>
        </DrawerContentScrollView>)
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