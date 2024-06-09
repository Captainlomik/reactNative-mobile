// /course/....

import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function CoursePage(){
    const {alias} = useLocalSearchParams()

    return (
        <View>
            <Text>Страница курса {alias}</Text>
        </View>
    )
}

const stylers = StyleSheet.create({

})