import { View, StyleSheet, Image, Text, Linking } from "react-native";
import { StudentCourseDescription } from "../course.model";
import { Chip } from "../../../../shared/chip";
import { Button } from "../../../../shared/button";
import { Colors, Fonts, Gaps, Radius } from "../../../../shared/tokens";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "../progressBar";

export function CourseCard({ image, shortTitle, courseOnDirection, alias, tariffs }: StudentCourseDescription) {
    return <View style={styles.card}>
        <Image source={{
            uri: image,
        }}
            style={styles.image}
            height={200} />
        <View style={styles.header}>
            <ProgressBar totalLessons={120} passedLessons={40} />
            <Text style={styles.title}>{shortTitle}</Text>
            <View style={styles.chips}>
                {courseOnDirection.length > 0 && courseOnDirection.map(c =>
                    <Chip text={c.direction.name} />
                )}
            </View>
            <MaskedView maskElement={
                <Text style={styles.tarif}> Тариф &laquo;{tariffs[0].name}&raquo; </Text>
            }>
                <LinearGradient colors={["#D77BE5", "#6C38CC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                    <Text style={{ ...styles.tarif, ...styles.tarifWithOpacity }}> Тариф &laquo;{tariffs[0].name}&raquo; </Text>
                </LinearGradient>
            </MaskedView>
        </View>
        <View style={styles.footer}>
            <Button text="Купить" onPress={() => {
                Linking.openURL(`https://purplrschool.ru/course/${alias}`)
            }} />
        </View>
    </View >
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        borderRadius: Radius.r10,
        backgroundColor: Colors.blacklight,
    },
    tarif: {
        marginTop: 10,
        fontSize: Fonts.f16,
        fontFamily: Fonts.regular
    },
    tarifWithOpacity: {
        opacity: 0,

    },
    image: {
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    title: {
        fontSize: Fonts.f20,
        color: Colors.white,
        fontFamily: Fonts.semiBold,
        marginBottom: 12,
    },
    chips: {
        flexDirection: 'row',
        gap: Gaps.g10,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    footer: {
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
})