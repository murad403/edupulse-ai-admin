export interface User {
  email: string;
  first_name: string;
  last_name: string;
}

export interface SignInData {
  access: string;
  refresh: string;
  user: User;
}

export interface SignInResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SignInData;
  timestamp: string;
}

export interface ProfileData {
  teacher_id: number;
  first_name: string;
  last_name: string;
  school: any;
  grade: string;
  room: any;
  email: string;
  profile_picture: string | null;
  is_verified: boolean;
  approval_status: string;
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ProfileData;
  timestamp: string;
}
export interface ForgotPasswordInputPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: string;
}

export interface VerifyOtpInputPayload {
  email: string;
  otp_code: string;
}

export interface VerifyOtpData {
  reset_token: number;
}

export interface VerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: VerifyOtpData;
  timestamp: string;
}

export interface ResetPasswordPayload {
  reset_token: number;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  timestamp: string;
}
