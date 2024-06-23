export function validationEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function passwordValidation(password: string): boolean {
  if (password.length < 6) {
    return false
  }

  return true
}
