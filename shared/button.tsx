import { Pressable, PressableProps, Text, StyleSheet, Animated, GestureResponderEvent } from "react-native";
import { Colors, Fonts, Radius } from "./tokens";

export function Button({ text, ...props }: PressableProps & { text: string }) {
    const animatedValue = new Animated.Value(100)
    // const color = animatedValue.interpolate({
    // 	inputRange: [0, 100],
    // 	outputRange: ["#45281", "#6C38CC"],
    // });


    const fadeIn = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start()
        props.onPressIn && props.onPressIn(e)
    }

    const fadeOut = (e: GestureResponderEvent) => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 100,
            useNativeDriver: false
        }).start()
        props.onPressOut && props.onPressOut(e)
    }

    return (
        <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
            <Animated.View style={{
                ...styles.button,
            }}>
                <Text style={styles.text}>{text}</Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.r10,
        height: 58,
        backgroundColor: Colors.primary,
    },
    text: {
        color: Colors.white,
        fontSize: Fonts.f18,
        fontFamily: 'FiraSans'
    }
})