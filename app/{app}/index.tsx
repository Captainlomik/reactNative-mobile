import { View, Text } from "react-native";
import { profileAtom } from "../entities/user/model/user.state";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../entities/auth/model/api";
import { IAuthResponse } from "../entities/auth/model/auth.interfaces";

//Main page Courses

export default function MyCourses() {
    const [profile] = useAtom(profileAtom)

    const login = async () => {
        const { data } = await axios.post<IAuthResponse>(API.login, {
            email: 'vasia@pupkin.ru',
            password: '12345678'
        })
    }

    useEffect(() => {
        login()
    }, [])

    return (
        <View>
            <Text>{profile.profile?.name}</Text>
        </View>
    )
}