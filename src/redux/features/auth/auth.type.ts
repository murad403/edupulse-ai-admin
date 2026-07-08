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

