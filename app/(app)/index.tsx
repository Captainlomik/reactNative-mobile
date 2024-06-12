import { View, Text } from "react-native";
import { Button } from "../../shared/button";
import { useSetAtom } from "jotai";
import { logoutAtom } from "../entities/auth/model/auth.state";



//Main page Courses

export default function MyCourses() {

    const logout = useSetAtom(logoutAtom)
    return (
        <View>
            <Text>Index</Text>
            <Button text="Выход" onPress={logout} isloading={false} ></Button>
        </View>
    )
}