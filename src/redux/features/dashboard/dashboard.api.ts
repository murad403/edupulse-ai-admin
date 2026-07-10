import baseApi from "@/redux/api/api";
import { DashboardStatsResponse, PlatformUsageResponse, TeacherActivityResponse, TopSchoolsResponse, AddSchoolInput, AddSchoolResponse, GetSchoolsResponse, AddTeacherInput, AddTeacherResponse, GenerateReportInput, GenerateReportResponse, SchoolDetailsResponse, UpdateAiConfigInput, UpdateAiConfigResponse, GetTeachersResponse, TeacherDetailsResponse, TeacherItem, GetAiConfigResponse, GetAnalysisReportsResponse, GetAnalysisReportDetailsResponse } from "./dashboard.type";


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
    updateAiConfig: builder.mutation<UpdateAiConfigResponse, UpdateAiConfigInput>({
      query: (data) => {
        return {
          url: "/admin/ai-config",
          method: "POST",
          body: data
        };
      }
    }),
    getAiConfig: builder.query<GetAiConfigResponse, void>({
      query: () => {
        return {
          url: "/admin/ai-config",
          method: "GET"
        };
      }
    }),


    // user management********************************************************************
    getUsers: builder.query<GetTeachersResponse, void>({
      query: () => {
        return {
          url: "/admin/teachers",
          method: "GET",
        };
      },
      providesTags: ["Teachers"],
    }),
    getUserDetails: builder.query<TeacherItem, number>({
      query: (teacher_id) => {
        return {
          url: `/admin/teachers/${teacher_id}/`,
          method: "GET",
        };
      },
      providesTags: ["Teachers"],
    }),
    updateUserDetails: builder.mutation<any, { teacher_id: number; data: FormData }>({
      query: ({teacher_id, data}) => {
        return {
          url: `/admin/teachers/${teacher_id}/`,
          method: "PATCH",
          body: data
        };
      },
      invalidatesTags: ["Teachers", "Stats"],
    }),
    deleteUser: builder.mutation<{ success: boolean; message: string }, number>({
      query: (teacher_id) => {
        return {
          url: `/admin/teachers/${teacher_id}/`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["Teachers", "Stats"],
    }),
    approvedUser: builder.mutation({
      query: (teacher_id) => {
        return {
          url: `/admin/teachers/${teacher_id}/approve`,
          method: "POST"
        };
      },
      invalidatesTags: ["Teachers", "Stats"],
    }),


    // reports api******************************
    getAnalysisReports: builder.query<GetAnalysisReportsResponse, void>({
      query: () => {
        return {
          url: "/admin/analysis-report",
          method: "GET"
        };
      }
    }),
    getAnalysisReportDetails: builder.query<GetAnalysisReportDetailsResponse, number>({
      query: (report_id) => {
        return {
          url: `/admin/analysis-report/${report_id}/`,
          method: "GET"
        };
      }
    })
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
  useUpdateAiConfigMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useDeleteUserMutation,
  useApprovedUserMutation,
  useGetAiConfigQuery,
  useGetAnalysisReportsQuery,
  useGetAnalysisReportDetailsQuery
} = dashboardApi;