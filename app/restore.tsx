// /restore 

import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import { Colors } from "../shared/tokens";
import { Button } from "../shared/button";
import { CustomLink } from "../shared/CustomLink";


export default function Restore() {
    return <View>

        <Text style={{ color: Colors.white }}>Восставновление пароля пока не доступно</Text>
        <CustomLink href={'/'} text={"Обратно"}></CustomLink>
    </View>
}