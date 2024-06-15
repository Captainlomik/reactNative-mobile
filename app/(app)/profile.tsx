import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { ImageUploader } from "../../shared/imageUploader";
import { Gaps } from "../../shared/tokens";
import { updateProfileAtom } from "../entities/user/model/user.state";
import { useAtom } from "jotai";
import { Button } from "../../shared/button";
import * as Sharing from 'expo-sharing'

export default function Profile() {

    const [image, setImage] = useState<string | null>(null)
    const [profile, updateProfile] = useAtom(updateProfileAtom);

    const shareProfile = async () => {
        const isSharingAvailable = await Sharing.isAvailableAsync()
        if (!isSharingAvailable) {
            return
        }
        await Sharing.shareAsync('https://purpleschool.ru', {
            dialogTitle: 'Поделиться профилем'
        })
    }

    const submitProfile = () => {
        if (!image) {
            return
        }
        updateProfile({ photo: image })
    }

    useEffect(() => {
        if (profile && profile.profile?.profile.photo) {
            setImage(profile.profile?.profile.photo)
        }
    }, [])

    return (
        <View>
            <View style={styles.container}>
                {image ? (<Image
                    style={styles.image}
                    source={{ uri: image, }}
                />) : (
                    <Image source={require('../../assets/images/avatar.png')} />
                )}
                <ImageUploader onUpload={setImage} onError={(e) => console.log(e)} />
            </View>
            <Button text='Сохранить' onPress={submitProfile} ></Button>
            <Button text='Поделиться' onPress={shareProfile} ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    container: {
        flexDirection: 'row',
        gap: Gaps.g20,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
    }

})