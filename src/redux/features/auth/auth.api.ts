import baseApi from "@/redux/api/api";
import { SignInResponse, ProfileResponse } from "./auth.type";
import { SignInInput } from "@/validation/auth.validation";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInResponse, SignInInput>({
            query: (data) => {
                return {
                    url: "/admin/login",
                    method: "POST",
                    body: data
                }
            }
        }),
        getProfile: builder.query<ProfileResponse, void>({
            query: () => {
                return {
                    url: "/auth/me",
                    method: "GET"
                }
            },
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation<ProfileResponse, FormData>({
            query: (formData) => {
                return {
                    url: "/auth/me",
                    method: "PATCH",
                    body: formData,
                }
            },
            invalidatesTags: ["Profile"],
        }),
    })
})

export const {
    useSignInMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
} = authApi;