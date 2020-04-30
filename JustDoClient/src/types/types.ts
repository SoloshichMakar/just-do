export interface IActionRegistration {
    type: string;
    email?: string;
    password?: string;
    message?: string;
    confirmPassword?: string;
    errorMessage?: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
}