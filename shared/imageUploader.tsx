import {
	useMediaLibraryPermissions,
	PermissionStatus,
	launchImageLibraryAsync,
	MediaTypeOptions,
} from 'expo-image-picker';
import { Alert, Pressable, Text, View, StyleSheet } from 'react-native';
import UploadIcon from '../assets/upload';
import { Colors, Fonts, Gaps, Radius } from './tokens';
import FormData from 'form-data';
import axios, { AxiosError } from 'axios';
import { FILE_API } from './api';

interface imageUploaderProps {
	onUpload: (uri: string) => void;
	onError: (error: string) => void;
}

export interface UploadResponse {
	urls: {
		original: string;
		webP: string;
	};
}

export function ImageUploader({ onUpload, onError }: imageUploaderProps) {
	const [libraryPermissions, requestLibraryPermission] = useMediaLibraryPermissions();

	const upload = async () => {
		const isPermissionGranted = await varifyMediaPermissions();
		if (!isPermissionGranted) {
			onError('Недостаточно прав');
			return;
		}
		const asset = await pickImage();
		if (!asset) {
			onError('Невыбрано изображение');
			return;
		}

		const uploadedURL = await uploadToServer(asset.uri, asset.fileName ?? '');
		if (!uploadedURL) {
			onError('Изображение не загружено');
			return;
		}
		onUpload(uploadedURL);
	};

	//Проверка доступов
	const varifyMediaPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermission();
			return res.granted;
		}
		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к галереи');
			return false;
		}
		return true;
	};

	//Выбор изображения
	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return null;
		}
		return result.assets[0];
	};

	//Загрузка на сервер
	const uploadToServer = async (uri: string, name: string) => {
		const formData = new FormData();
		formData.append('files', {
			uri,
			name,
			type: 'image/jpeg',
		});
		try {
			const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return data.urls.original;
		} catch (e) {
			if (e instanceof AxiosError) {
				console.error(e);
			}
			return null;
		}
	};

	return (
		<Pressable onPress={upload}>
			<View style={styles.container}>
				<UploadIcon />
				<Text style={styles.text}>Загрузить изображение</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: Gaps.g8,
		backgroundColor: Colors.violetDark,
		borderRadius: Radius.r10,
		paddingHorizontal: 20,
		paddingVertical: 17,
		alignItems: 'center',
	},
	text: {
		fontSize: Fonts.f14,
		fontFamily: Fonts.regular,
		color: Colors.white,
	},
});
