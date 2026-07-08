import baseApi from "@/redux/api/api";
import { DashboardStatsResponse, PlatformUsageResponse, TeacherActivityResponse, TopSchoolsResponse, AddSchoolInput, AddSchoolResponse, GetSchoolsResponse, AddTeacherInput, AddTeacherResponse, GenerateReportInput, GenerateReportResponse, SchoolDetailsResponse } from "./dashboard.type";


const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // overview***************************************************
    getDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => {
        return {
          url: "/admin/dashboard-stats",
          method: "GET",
        };
      },
      providesTags: ["Stats"],
    }),
    getPlatformUsage: builder.query<PlatformUsageResponse, void>({
      query: () => {
        return {
          url: "/admin/platform-usage",
          method: "GET",
        };
      },
    }),
    getTopSchools: builder.query<TopSchoolsResponse, void>({
      query: () => {
        return {
          url: "/admin/schools?top=true",
          method: "GET",
        };
      },
      providesTags: ["Schools"],
    }),
    getTeachersActivity: builder.query<TeacherActivityResponse, void>({
      query: () => {
        return {
          url: "/admin/teachers/activity",
          method: "GET",
        };
      },
      providesTags: ["Teachers"],
    }),

    // school************************************************************************
    addSchool: builder.mutation<AddSchoolResponse, AddSchoolInput>({
      query: (data) => {
        return {
          url: "/admin/schools",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["Stats", "Schools"],
    }),
    getSchools: builder.query<GetSchoolsResponse, void>({
      query: () => {
        return {
          url: "/admin/schools",
          method: "GET"
        };
      },
      providesTags: ["Schools"],
    }),
    getSchoolAndClassDetails: builder.query<SchoolDetailsResponse, number>({
      query: (school_id) => {
        return {
          url: `/admin/schools/${school_id}/`,
          method: "GET"
        };
      },
      providesTags: ["Schools"],
    }),

    // teacher************************************************************************
    addTeacher: builder.mutation<AddTeacherResponse, AddTeacherInput>({
      query: (data) => {
        return {
          url: "/admin/teachers",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["Stats", "Schools", "Teachers"],
    }),
    generateReport: builder.mutation<GenerateReportResponse, GenerateReportInput>({
      query: (data) => {
        return {
          url: "/admin/analysis-report",
          method: "POST",
          body: data
        };
      }
    }),
    updateAiConfig: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/ai-config",
          method: "POST",
          body: data
        };
      }
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetPlatformUsageQuery,
  useGetTopSchoolsQuery,
  useGetTeachersActivityQuery,
  useAddSchoolMutation,
  useGetSchoolsQuery,
  useAddTeacherMutation,
  useGenerateReportMutation,
  useGetSchoolAndClassDetailsQuery,
} = dashboardApi;