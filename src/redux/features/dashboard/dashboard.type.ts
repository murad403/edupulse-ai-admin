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
