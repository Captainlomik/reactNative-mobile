import { atom } from 'jotai';
import axios, { AxiosError } from 'axios';
import { StudentCourses } from './course.model';
import { authAtom } from '../auth/model/auth.state';
import { API } from './api';

export const courseAtom = atom<CourseState>({
	courses: <StudentCourses>{},
	isLoading: false,
	error: null,
});

export const loadCourseAtom = atom(
	async (get) => {
		return get(courseAtom);
	},
	async (get, set) => {
		try {
			const { access_token } = await get(authAtom);
			set(courseAtom, {
				isLoading: true,
				courses: <StudentCourses>{},
				error: null,
			});
			const { data } = await axios.get<StudentCourses>(API.my, {
				// params: {
				// 	studentCourse: 'dontMy',
				// },
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			set(courseAtom, {
				isLoading: false,
				courses: data,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(courseAtom, {
					isLoading: false,
					courses: <StudentCourses>{},
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface CourseState {
	courses: StudentCourses;
	isLoading: boolean;
	error: string | null;
}
