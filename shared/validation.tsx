export function validationEmail(email: string) {
	return !/\S+@\S+\.\S+/.test(email);
}
