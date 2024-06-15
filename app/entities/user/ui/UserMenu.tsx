import { View, Image, StyleSheet, Text } from "react-native";
import { User } from "../model/user.model";
import { Fonts, Gaps, Colors } from "../../../../shared/tokens";

export function UserMenu({ user }: { user: User | null }) {
    if (!user) { return; };
    

    return (<View style={styles.container}>
        {user.profile.photo ? (
            <Image
                style={styles.image}
                source={{
                    uri: user.profile.photo
                }}
            />) :
            (<Image source={require('../../../../assets/images/avatar.png')}
             />)
        }
        <Text style={styles.name}>{user.profile.name} -{user.profile.surname}</Text>
    </View>)
}

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    name: {
        fontSize: Fonts.f16,
        fontFamily: Fonts.regular,
        color: Colors.white
    },
    container: {
        alignItems: 'center',
        gap: Gaps.g8,
        marginTop: 30,
        marginBottom: 40
    }
})