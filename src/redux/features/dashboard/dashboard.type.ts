export interface DashboardStats {
  total_teachers: number;
  active_schools: number;
  today_ai_requests: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardStats;
  timestamp: string;
}

export interface PlatformUsage {
  day: string;
  date: string;
  requests: number;
}

export interface PlatformUsageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PlatformUsage[];
  timestamp: string;
}

export interface TopSchool {
  school_id: number;
  school_name: string;
  region_district_office: string;
  registration_status: string;
  total_teachers: number;
  total_students: number;
  total_ai_requests: number;
}

export interface TopSchoolsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TopSchool[];
  timestamp: string;
}

export interface TeacherActivity {
  teacher_id: number;
  teacher_name: string;
  school_name: string | null;
  last_active: string;
  status: string;
}

export interface TeacherActivityData {
  count: number;
  next: string | null;
  previous: string | null;
  results: TeacherActivity[];
}

export interface TeacherActivityResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TeacherActivityData;
  timestamp: string;
}

export interface AddSchoolInput {
  school_name: string;
  region_district_office: string;
  registration_status: "Active";
}

export interface AddSchoolData {
  school_id: number;
  school_name: string;
  region_district_office: string;
  registration_status: string;
  created_at: string;
}

export interface AddSchoolResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AddSchoolData;
  timestamp: string;
}

export interface SchoolItem {
  school_id: number;
  school_name: string;
  region_district_office: string;
  registration_status: string;
  total_teachers: number;
  total_students: number;
  total_ai_requests: number;
}

export interface GetSchoolsData {
  count: number;
  next: string | null;
  previous: string | null;
  results: SchoolItem[];
}

export interface GetSchoolsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GetSchoolsData;
  timestamp: string;
}

export interface AddTeacherInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  school_id: number;
  grade: string;
  approval_status: "approved" | "pending";
}

export interface AddTeacherData {
  teacher_id: number;
  first_name: string;
  last_name: string;
  email: string;
  school_name: string;
  grade: string;
  room: string | null;
  approval_status: string;
  is_active: boolean;
  created_at: string;
}

export interface AddTeacherResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AddTeacherData;
  timestamp: string;
}

export interface GenerateReportInput {
  analyticalFocus: string;
  targetSchoolRange: number;
  temporalBounds: number;
}

export interface GenerateReportData {
  report_id?: number;
  [key: string]: any;
}

export interface GenerateReportResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: GenerateReportData;
  timestamp: string;
}

export interface SchoolDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: SchoolItem;
  timestamp: string;
}



