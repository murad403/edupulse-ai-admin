import baseApi from "@/redux/api/api";
import {
  DashboardStatsResponse,
  PlatformUsageResponse,
  TeacherActivityResponse,
  TopSchoolsResponse,
} from "./dashboard.type";

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
    }),
    getTeachersActivity: builder.query<TeacherActivityResponse, void>({
      query: () => {
        return {
          url: "/admin/teachers/activity",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetPlatformUsageQuery,
  useGetTopSchoolsQuery,
  useGetTeachersActivityQuery,
} = dashboardApi;