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
