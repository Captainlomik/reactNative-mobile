import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Colors, Fonts } from "./tokens";
import { LinkProps } from "expo-router/build/link/Link";

export function CustomLink({ text, ...props }: LinkProps & { text: string }) {
    return (
        <Link {...props} style={styles.link}>
            <Text>{text}</Text>
        </Link>
    )
}

const styles = StyleSheet.create({
    link: {
        fontSize: Fonts.f18,
        color: Colors.link, 
        fontFamily: Fonts.regular
    }
})