import { atom } from "jotai";
import { User } from "./user.model";
import { authAtom } from "../../auth/model/auth.state";
import axios, { AxiosError } from "axios";
import { API } from "../api";


export const profileAtom = atom<UserState>({
	profile: null,
	isLoading: false,
	error: null,
});

export const updateProfileAtom = atom(
	async (get) => {
		return get(profileAtom);
	},
	async (get, set, { photo }: { photo: string }) => {
		try {
			const { access_token } = await get(authAtom);
			const { data } = await axios.patch<Profile>(
				API.profile,
				{ photo, },
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				},
			);
			const user = {
				id: data.id,
				name: data.name,
				surname: data.surname,
				photo: data.photo,
			}
			set(profileAtom, {
				isLoading: false,
				profile: user,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export const loadProfileAtom = atom(
	async (get) => {
		return get(profileAtom);
	},
	async (get, set) => {
		const { access_token } = await get(authAtom);
		set(profileAtom, {
			isLoading: true,
			profile: null,
			error: null,
		});
		try {
			const { data } = await axios.get<ExternalUser>(API.profile, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			const user = {
				id: data.profile.id,
				name: data.profile.name,
				surname: data.profile.surname,
				photo: data.profile.photo,
			}
			set(profileAtom, {
				isLoading: false,
				profile: user,
				error: null,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface UserState {
	profile: User | null;
	isLoading: boolean;
	error: string | null;
}

interface ExternalUser {
	profile: Profile
}

interface Profile {
	id: number
	name: string
	photo: string | undefined
	surname: string | undefined
}