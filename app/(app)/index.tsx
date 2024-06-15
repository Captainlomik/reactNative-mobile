import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAtomValue, useSetAtom } from "jotai";
import { courseAtom, loadCourseAtom } from "../entities/course/course.state";
import { useEffect } from "react";
import { CourseCard } from "../entities/course/ui/courseCard";
import { Colors, Gaps } from "../../shared/tokens";
import { FlatList, RefreshControl, ScrollView } from "react-native-gesture-handler";
import { StudentCourseDescription } from "../entities/course/course.model";



//Main page Courses

export default function MyCourses() {

    const { isLoading, error, courses } = useAtomValue(courseAtom)
    const loadCourse = useSetAtom(loadCourseAtom)

    useEffect(() => {
        loadCourse()
    }, [])

    const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
        return (
            <View>
                <CourseCard {...item} />
            </View>
        )
    }

    return (
        <>
            {isLoading && <ActivityIndicator style={styles.activity} size={'large'} color={Colors.primary} />}
            {courses.length > 0 &&
                <FlatList
                    data={courses}
                    renderItem={renderCourse}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={<RefreshControl 
                    refreshing={isLoading} 
                    onRefresh={loadCourse}
                    tintColor={Colors.primary}
                    titleColor={Colors.primary} />} />}
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
    },
    activity:{
        marginTop: 30,
    }
})