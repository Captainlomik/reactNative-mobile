import { Pressable, View, StyleSheet } from "react-native";
import CloseIcon from "../../../assets/icons/close";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

export function CloseDrawer(navigation: DrawerNavigationHelpers) {

    return (
        <Pressable onPress={() => navigation.closeDrawer()}>
            <View style={{ ...styles.button }}>
                <CloseIcon />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        right: 20,
        top: 20,
    },
})