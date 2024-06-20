import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from '../entities/course/course.state';
import { useEffect } from 'react';
import { CourseCard } from '../entities/course/ui/courseCard';
import { Colors } from '../../shared/tokens';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { StudentCourseDescription } from '../entities/course/course.model';
import { Button } from '../../shared/button';
import * as Notifications from 'expo-notifications';

//Main page Courses
export default function MyCourses() {
	const { isLoading, courses } = useAtomValue(courseAtom);
	const loadCourse = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourse();
	}, []);

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		return (
			<View style={styles.item}>
				<CourseCard key={item.id} {...item} />
			</View>
		);
	};

	const allowsNotification = async () => {
		const settings = await Notifications.getPermissionsAsync();
		return (
			settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
		);
	};
	const requestPermissions = async () => {
		return Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
			},
		});
	};

	const sheduleNotification = async () => {
		const granted = await allowsNotification();
		if (!granted) {
			await requestPermissions();
		}
		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Новый курс Typescript',
				body: 'Начни учиться уже сейчас',
				data: { alias: 'typescript' },
			},
			trigger: {
				seconds: 5,
			},
		});
	};

	return (
		<>
			{isLoading && (
				<ActivityIndicator style={styles.activity} size={'large'} color={Colors.primary} />
			)}
			<Button text="Напомнить" onPress={sheduleNotification} />
			{courses.other && courses.other.length > 0 && (
				<FlatList
					data={courses.other}
					renderItem={renderCourse}
					keyExtractor={(item) => item.id.toString()}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={loadCourse}
							tintColor={Colors.primary}
							titleColor={Colors.primary}
						/>
					}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 20,
	},
	activity: {
		marginTop: 30,
	},
});
