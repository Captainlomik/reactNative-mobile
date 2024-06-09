// /restore 

import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { Colors } from "../shared/tokens";


export default function Restore() {
    return <View>
        <Link href={'/'}></Link>
        <Text style={{ color: Colors.white }}>Restore</Text>
    </View>
}