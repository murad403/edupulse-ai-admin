import baseApi from "@/redux/api/api";
import { SignInResponse, ProfileResponse, ForgotPasswordInputPayload, ForgotPasswordResponse, VerifyOtpInputPayload, VerifyOtpResponse, ResetPasswordPayload, ResetPasswordResponse } from "./auth.type";
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
        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordInputPayload>({
            query: (data) => {
                return {
                    url: "/auth/forgot-password",
                    method: "POST",
                    body: data
                }
            }
        }),
        verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpInputPayload>({
            query: (data) => {
                return {
                    url: "/auth/forgot-password/verify",
                    method: "POST",
                    body: data
                }
            }
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
            query: (data) => {
                return {
                    url: "/auth/reset-password",
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
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;